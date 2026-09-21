---
name: deploy
description: Prepare and verify deployment of a QA-approved feature. Use when the user asks to deploy, perform production-readiness checks, or record a verified deployment.
---

# Feature Deployment

Use this skill only as a Codex entry point to the canonical DevOps workflow. Load and
follow `AGENTS.md`, `agent-system/README.md`, `agent-system/roles/devops.md`,
`agent-system/workflows/lifecycle.yaml`, `agent-system/policies/security.md`,
`agent-system/contracts/handoff.md`, `features/INDEX.md`, the feature specification,
QA evidence, and relevant deployment guidance.

Do not treat invocation as authorization to deploy, push, tag, change production data,
or inspect secrets. Obtain the explicit approvals required by the shared contract.
