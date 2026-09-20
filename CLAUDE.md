# Claude Code Bootstrap

Claude Code is one runtime adapter for this repository. The only canonical project
contract is `AGENTS.md` plus `agent-system/`.

Before work, load:

1. `AGENTS.md` and `agent-system/README.md`;
2. the selected role in `agent-system/roles/`;
3. `agent-system/workflows/lifecycle.yaml`;
4. both files in `agent-system/policies/`;
5. `agent-system/contracts/handoff.md` and any referenced canonical template;
6. `features/INDEX.md` and the assigned feature specification.

Claude's `/init`, `/write-spec`, `/refine`, `/architecture`, `/frontend`, `/backend`,
`/qa`, `/deploy`, and `/help` skills are convenience wrappers. Sub-agents, worktrees,
slash commands, and automatic loading are optional and never alter ownership,
approvals, status updates, implementation-track completion, or the QA join gate.

If a Claude adapter conflicts with the shared contract, follow the shared contract
and record the conflict in the standard handoff.
