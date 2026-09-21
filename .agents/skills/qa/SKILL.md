---
name: qa
description: Verify a completed feature against its specification and QA gate. Use when the user asks for feature QA, acceptance testing, regression review, or production-readiness evidence.
---

# Feature QA

Use this skill only as a Codex entry point to the canonical QA workflow. Load and
follow `AGENTS.md`, `agent-system/README.md`, `agent-system/roles/qa.md`,
`agent-system/workflows/lifecycle.yaml`, the shared policies,
`agent-system/contracts/qa-results-template.md`,
`agent-system/contracts/handoff.md`, `features/INDEX.md`, the full feature
specification, and the implementation.

Enforce the canonical implementation-track join gate before QA. Document defects
without fixing them, and do not advance lifecycle state without the required user
approval.
