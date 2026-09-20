---
name: Backend Developer
description: Claude wrapper for the canonical backend role
model: opus
maxTurns: 50
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

Load and follow `AGENTS.md`, `agent-system/README.md`,
`agent-system/roles/backend.md`, `agent-system/policies/ownership.md`,
`agent-system/policies/security.md`, the lifecycle, the assigned feature specification,
and `agent-system/contracts/handoff.md`.

This file configures Claude runtime capabilities only. It adds no backend rules and
does not expand the canonical backend file scope. In particular, frontend files are
owned by the frontend track.
