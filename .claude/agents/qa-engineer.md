---
name: QA Engineer
description: Claude wrapper for the canonical QA role
model: opus
maxTurns: 30
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

Load and follow `AGENTS.md`, `agent-system/README.md`, `agent-system/roles/qa.md`,
`agent-system/policies/ownership.md`, `agent-system/policies/security.md`, the
lifecycle, the assigned feature specification, and the handoff contract. Enforce the
canonical QA join gate before testing.

This file configures Claude runtime capabilities only and adds no QA rules.
