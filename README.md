Please add me as a Agent Developer [Published] on Discord, my username is `khalik.faradzhli#6775`
# Forta Agent for Compound Governance

## Description

This agent detects transactions that interact with Compound Protocol Governance

## Supported Chains

- Ethereum

## Alerts

- COMPOUND-PROPOSAL-AGENT
  - Fired when a transaction interacts with Compound Protocol Governance
  - Severity is always set to "medium"
  - Type is always set to "info"
  - Metadata
    - for VoteCast includes fields - `proposalId`, `voter`, `support`, `voter`, `reason`
    - for ProposalCreated includes fields - `proposalId`, `description`
    - for other events includes fields - `proposalId`

## Test Data
The agent behaviour can be verified with the following transactions:

- `0xe1f082f2c4c9c36015ec4eb202572a02b4c6f54ca3ba1b55df72aa8154ae2c88`
```
{
  "name": "Compound governance",
  "description": "Proposal created - Proposal #60",
  "alertId": "COMPOUND-PROPOSAL-AGENT",
  "protocol": "ethereum",
  "severity": "Medium",
  "type": "Info",
  "metadata": {
    "proposalId": "60",
    "description": "# Address Whitelist for Submitting Proposals \nRight now, to make a proposal, a contributor must have (or have delegated to them) 65k COMP. This threshold is a good spam deflection mechanism, but creates a burdensome hurdle for some contributors.\n\nIn additional to keeping the 65k COMP threshold, we propose including a whitelist of contributor addresses, managed by the community multisig, who will always have the right to submit proposals, regardless of the # of COMP delegated to them, relieving a pain point in the current contributor experience.\n\nArr00 wrote the updated code, wrote tests/simulations, and did a bug bounty program. The overall code change is relatively small.\n\nChanges: https://github.com/compound-finance/compound-protocol/pull/149/files\n\nForum discussion: https://www.comp.xyz/t/whitelist-of-addresses-that-can-create-proposals/1996"
  }
}
```
- `0xbeea670d6b98bd244901b41a2bb9eb0fe471c7dd2b42d1604f7f7c96da85bbd8`
```
{
  "name": "Compound governance",
  "description": "Vote cast - Proposal #60",
  "alertId": "COMPOUND-PROPOSAL-AGENT",
  "protocol": "ethereum",
  "severity": "Medium",
  "type": "Info",
  "metadata": {
    "proposalId": "60",
    "voter": "0x54A37d93E57c5DA659F508069Cf65A381b61E189",
    "support": "1",
    "votes": "100074198518527135492170",
    "reason": ""
  }
}
```
## Agent ID
`0x3c7a6fe0171f51478d26f8af03c13c79e800239180b7a630964e876842b4f50e`
