---
name: architecture
description: Claude wrapper for the canonical architecture role.
argument-hint: "feature-spec-path"
user-invocable: true
---

# Architecture Wrapper

Load the canonical contract, `agent-system/roles/architect.md`, lifecycle, policies,
handoff, index, assigned feature spec, and relevant existing code. Stop if the feature
is not `Planned` or has no complete specification.

Use Claude's interactive convenience to clarify unresolved decisions and present the
design for review. Keep the design high-level and PM-readable. Confirm which
implementation tracks are required and assign exactly one required track as the
frontend/backend integration owner in the feature spec.

After the design is complete and the user approves `planned -> architected`, change
only the matching index row's status cell to `Architected`, re-read it, and produce the
standard handoff. Recommend the required tracks; do not start them automatically.
