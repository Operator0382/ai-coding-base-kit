---
name: init
description: Claude wrapper for product initialization and roadmap creation.
argument-hint: "description of what you want to build"
user-invocable: true
---

# Product Initialization Wrapper

Load the canonical contract and `agent-system/roles/product.md`. Follow the lifecycle,
ownership and security policies, and handoff contract; this wrapper adds no product
rules.

For Claude's interactive convenience, interview one question at a time, provide a
recommended answer, inspect existing project files before asking, and present the PRD
and feature map for approval before writing them. Resolve persistence/backend and
design-system needs during the interview. Product owns structural changes to
`features/INDEX.md`.

Finish with the standard handoff. Do not start the specification phase automatically.
