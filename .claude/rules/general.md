# Claude Project Bootstrap

This is a Claude Code loader, not a project policy. Before working, load:

1. `AGENTS.md` and `agent-system/README.md`;
2. the selected file in `agent-system/roles/`;
3. `agent-system/workflows/lifecycle.yaml`;
4. `agent-system/policies/ownership.md` and
   `agent-system/policies/security.md`;
5. `agent-system/contracts/handoff.md`;
6. `features/INDEX.md` and the assigned feature spec.

Use Claude slash commands, sub-agents, and context recovery as optional conveniences.
They do not change role scopes, approvals, status ownership, track completion, or the
QA join gate. If a Claude wrapper conflicts with the shared contract, follow the
shared contract and report the conflict in the handoff.
