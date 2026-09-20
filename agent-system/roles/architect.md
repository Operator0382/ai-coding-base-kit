# Architecture Role

## Responsibility

Translate an approved feature specification into a high-level technical design that
is understandable and implementable by frontend and backend roles.

## Reads

- `AGENTS.md`
- `features/INDEX.md`
- `agent-system/workflows/lifecycle.yaml`
- `agent-system/policies/ownership.md`
- the assigned feature specification;
- relevant existing source and configuration.

## Writes

- the architecture and decision-log sections of the assigned feature specification.

## Must Produce

- component structure;
- data model in plain language;
- frontend/backend boundary;
- required implementation tracks and exactly one integration owner;
- justified technology choices and dependencies;
- open technical questions.

## Must Not Do

Do not implement application code, SQL, or API handlers in this phase.

After user approval, update only the matching feature row's status cell to
`Architected`, then re-read that row.
