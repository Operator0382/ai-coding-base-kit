---
name: help
description: Read-only Claude guide to current canonical workflow state.
argument-hint: "optional question"
user-invocable: true
---

# Workflow Help Wrapper

Read `AGENTS.md`, `agent-system/README.md`, lifecycle, roles, policies, handoff,
`features/INDEX.md`, PRD, and relevant feature specs. Report the current state, track
completion, blockers, and the single next permitted role or transition.

This skill is read-only. Do not update status, start another skill, or assume optional
Claude features are available. When implementation is active, recommend QA only if the
canonical join gate is satisfied.
