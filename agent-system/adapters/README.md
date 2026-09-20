# Runtime Adapters

Adapters explain how a specific agent runtime should enter the shared contract. They
are deliberately thin: the canonical rules remain in `AGENTS.md` and `agent-system/`.

## Supported Entry Points

| Agent | Repository entry point |
|---|---|
| Codex | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |
| Cursor Agent | `.cursor/rules/agent-system.mdc` |
| Claude Code | `CLAUDE.md` and `.claude/` |
| Hermes Agent | load `AGENTS.md`, then the selected role file |
| OpenClaw | load `AGENTS.md`, then the selected role file |

Hermes Agent and OpenClaw may use different local conventions. This repository does
not assume undocumented runtime APIs; their adapter is therefore a bootstrap contract
rather than a fabricated configuration format.

## Adapter Requirements

Every adapter must instruct the agent to:

1. load `AGENTS.md` first;
2. load the selected role from `agent-system/roles/`;
3. respect `agent-system/policies/ownership.md`;
4. respect `agent-system/policies/security.md`;
5. follow `agent-system/workflows/lifecycle.yaml`;
6. use `agent-system/contracts/handoff.md` when work ends.

Slash commands, sub-agents, worktrees, and automatic file loading are optional
runtime conveniences. Adapters must not make them prerequisites for the workflow.
