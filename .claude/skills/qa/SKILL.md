---
name: qa
description: Claude wrapper for canonical QA after the implementation join gate.
argument-hint: "feature-spec-path"
user-invocable: true
---

# QA Wrapper

Load the canonical contract, `agent-system/roles/qa.md`, lifecycle, policies, handoff,
index, full feature spec, implementation, and
`agent-system/contracts/qa-results-template.md`.

Before any QA work, verify that the spec declares both tracks, every `required` track
is `complete` with a recorded handoff, exactly one required integration owner is
declared, and that track is complete. Stop and return the feature to the incomplete
track if the join gate fails.

After the gate, obtain user approval for `in_progress -> in_review`, change only the
matching index status cell to `In Review`, and re-read it. Then systematically verify
acceptance criteria, edge cases, regressions, responsive behavior, and security.
Document defects but do not fix them. After a clean result and separate approval,
change only the status cell to `Approved` and re-read it. Finish with the standard
handoff.
