---
name: write-spec
description: Claude wrapper for the canonical specification role.
argument-hint: "feature name or PROJ-X ID"
user-invocable: true
---

# Feature Specification Wrapper

Load the canonical contract, `agent-system/roles/spec-writer.md`, lifecycle, policies,
handoff contract, PRD, index, relevant code, and
`agent-system/contracts/feature-spec-template.md`.

Use Claude's interactive interview convenience: ask one question at a time, include a
recommended answer, and inspect the repository before asking. Populate the full
template, including frontend/backend requirements and exactly one required integration
owner. A missing roadmap row is handed to the product role; this skill does not add or
restructure index rows.

After the spec is complete and the user approves the `roadmap -> planned` transition,
change only the matching index row's status cell to `Planned`, re-read it, and produce
the standard handoff. Do not start architecture automatically.
