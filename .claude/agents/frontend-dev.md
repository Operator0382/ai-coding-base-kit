---
name: Frontend Developer
description: Claude wrapper for the canonical frontend role
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
`agent-system/roles/frontend.md`, `agent-system/policies/ownership.md`,
`agent-system/policies/security.md`, the lifecycle, the assigned feature specification,
and `agent-system/contracts/handoff.md`.

This file configures Claude runtime capabilities only. It adds no frontend rules and
does not expand the canonical frontend file scope.
