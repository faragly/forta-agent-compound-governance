import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType, getJsonRpcUrl } from 'forta-agent';
import { SIGNATURES, COMPOUND_GOVERNANCE_ADDRESS, COMPOUND_GOVERNOR_ABI, ALERT_ID, AGENT_DESCRIPTIONS, AGENT_NAME } from "./constants";

const web3 = new Web3(getJsonRpcUrl());
const compoundGovernanceContract = new web3.eth.Contract(COMPOUND_GOVERNOR_ABI as AbiItem[], COMPOUND_GOVERNANCE_ADDRESS);

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];

    if (txEvent.transaction.to !== COMPOUND_GOVERNANCE_ADDRESS) return findings;

    for (const [eventName, signature] of Object.entries(SIGNATURES)) {
        const events = txEvent.filterEvent(signature, COMPOUND_GOVERNANCE_ADDRESS);
        for (let event of events) {
            const [log] = await compoundGovernanceContract.getPastEvents(eventName, {
                fromBlock: event.blockNumber,
                toBlock: event.blockNumber
            });

            if (eventName === 'VoteCast') {
                const { voter, support, votes, proposalId, reason } = log.returnValues;
                findings.push(Finding.fromObject({
                    name: AGENT_NAME,
                    description: `${AGENT_DESCRIPTIONS[eventName]} - Proposal #${proposalId}`,
                    alertId: ALERT_ID,
                    severity: FindingSeverity.Medium,
                    type: FindingType.Info,
                    metadata: {
                        proposalId,
                        voter,
                        support,
                        votes,
                        reason
                    }
                }));
            } else {
                const { id, description } = log.returnValues;
                findings.push(Finding.fromObject({
                    name: AGENT_NAME,
                    description: `${AGENT_DESCRIPTIONS[eventName]} - Proposal #${id}`,
                    alertId: ALERT_ID,
                    severity: FindingSeverity.Medium,
                    type: FindingType.Info,
                    metadata: {
                        proposalId: id,
                        description
                    }
                }));
            }
        }
    }

    return findings;
};

export default { handleTransaction }
