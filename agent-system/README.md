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
- `contracts/` — common handoff and verification formats.
- `policies/` — ownership, conflict prevention, and sensitive-file rules.
- `adapters/` — runtime-specific bootstrap notes for supported agents.

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

No specific model or vendor API is required by this contract.
