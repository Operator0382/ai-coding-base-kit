---
name: refine
description: Claude wrapper for refining an existing product or architecture spec.
argument-hint: "PROJ-X"
user-invocable: true
---

# Feature Refinement Wrapper

Load the shared contract, feature spec, index, PRD, lifecycle, policies, and handoff.
Use the spec-writer role for product requirements and the architect role for technical
design; never mix or expand their scopes silently.

Ask what changed, then interview one question at a time with a recommended answer.
Update decisions, resolved/open questions, acceptance criteria, track requirements,
or architecture only within the selected canonical role. Product handles structural
index changes. A lifecycle rollback or transition requires the lifecycle's user
approval; if approved, only its status cell may be changed by the completing role.

Finish with the standard handoff and do not start another phase automatically.
