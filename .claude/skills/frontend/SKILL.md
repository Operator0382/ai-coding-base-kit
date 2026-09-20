---
name: frontend
description: Claude wrapper for the canonical frontend implementation track.
argument-hint: "feature-spec-path"
user-invocable: true
---

# Frontend Track Wrapper

Load the canonical contract, `agent-system/roles/frontend.md`, lifecycle, policies,
handoff, index, feature spec, and relevant code. Confirm that frontend is `required`,
the feature is `Architected` or `In Progress`, and no overlapping owner is editing the
same files.

Claude may use a sub-agent or isolated worktree when explicitly selected, but neither
is required. If the feature is `Architected`, first obtain approval for
`architected -> in_progress`, update only the matching status cell, and re-read it.
If it is already `In Progress`, do not update the index. Implement and verify only the
canonical frontend scope. If frontend owns integration, wire the UI to the recorded
backend contract without editing backend files.

When work is truly complete, add a dated frontend `Complete` handoff reference to the
spec's Implementation Tracks table. Finish with the standard handoff; recommend QA
only when every required track is complete.
