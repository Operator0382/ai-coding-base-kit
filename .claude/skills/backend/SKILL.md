---
name: backend
description: Claude wrapper for the canonical backend implementation track.
argument-hint: "feature-spec-path"
user-invocable: true
---

# Backend Track Wrapper

Load the canonical contract, `agent-system/roles/backend.md`, lifecycle, policies,
handoff, index, feature spec, and relevant server code. Confirm that backend is
`required`, the feature is `Architected` or `In Progress`, and no overlapping owner is
editing the same files.

Claude may use a sub-agent or isolated worktree when explicitly selected, but neither
is required. If the feature is `Architected`, first obtain approval for
`architected -> in_progress`, update only the matching status cell, and re-read it.
If it is already `In Progress`, do not update the index. Implement and verify only the
canonical backend scope. Publish the API and data contract for the integration owner.
Never edit frontend pages, components, hooks, or tests; client wiring is a frontend
handoff.

When work is truly complete, add a dated backend `Complete` handoff reference to the
spec's Implementation Tracks table. Finish with the standard handoff; recommend QA
only when every required track is complete.
