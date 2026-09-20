# Agent System

This directory is the vendor-neutral control plane for the repository. It describes
how different coding agents can collaborate without requiring the same model, CLI,
editor, or tool names.

## Design

The project has one shared contract and thin runtime adapters:

```text
AGENTS.md + agent-system/
        |
        +-- Codex (AGENTS.md)
        +-- Gemini CLI (GEMINI.md)
        +-- Cursor Agent (.cursor/rules/)
        +-- Claude Code (.claude/)
        +-- Hermes Agent / OpenClaw (adapter profile)
```

The shared layer defines intent, scope, state, ownership, inputs, outputs, and
verification. An adapter only explains how a particular runtime loads that contract.
It must not redefine product requirements or security rules.

## Contents

- `roles/` — responsibilities, allowed file scopes, and role-specific rules.
- `workflows/` — lifecycle states, dependencies, approvals, and parallelism.
- `contracts/` — common handoff, feature-spec, QA-result, and verification formats.
- `policies/` — ownership, conflict prevention, and sensitive-file rules.
- `adapters/` — runtime-specific bootstrap notes for supported agents.

## Minimal Manual Flow

An agent without slash commands, sub-agents, worktrees, or automatic instruction
loading can use the same process manually:

1. Load `AGENTS.md`, this README, the selected role, ownership policy, lifecycle,
   handoff contract, `features/INDEX.md`, and the assigned feature specification.
2. Select one role and confirm that the current feature state permits its work.
3. Confirm required implementation tracks and file ownership before editing.
4. Work only in the selected role's scope and run proportionate verification.
5. Produce the standard handoff and record a completed handoff for each required
   implementation track in the feature specification.
6. Request the user approval required by the lifecycle transition.
7. After approval, the role completing the transition updates only the matching
   feature row's status cell in `features/INDEX.md` and re-reads it.

Runtime conveniences are optional. They do not change these steps or the gates.

## Agent Selection

The user or orchestration layer selects the runtime and role. Agents must not switch
to another runtime or start a second agent autonomously unless explicitly instructed.
When a runtime cannot load an adapter automatically, manually load `AGENTS.md` and the
relevant role file before starting work.

## Compatibility Promise

An agent is compatible when it can:

1. read the repository contract;
2. follow the selected role and file scope;
3. make changes without violating ownership rules;
4. run or report the relevant verification checks; and
5. produce the standard handoff.

Run `npm run check:contracts` after changing the shared contract. Run
`npm run test:contracts` for the small fixture-based negative-path check.

No specific model or vendor API is required by this contract.
