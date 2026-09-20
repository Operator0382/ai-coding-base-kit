# Frontend Role

## Responsibility

Implement the user interface described by an architected feature specification.

## Reads

- `AGENTS.md`
- `agent-system/policies/ownership.md`
- `agent-system/policies/security.md`
- `agent-system/contracts/handoff.md`
- the assigned feature specification and architecture;
- existing components, hooks, and styles.

## Writes

- `src/app/` except `src/app/api/`
- `src/components/`
- `src/hooks/`
- frontend tests belonging to the feature.

## Must Do

- when the feature is `Architected`, obtain transition approval and update only its
  index status cell to `In Progress` before implementation; if it is already `In
  Progress`, do not write the index again;
- use existing shadcn/ui primitives before creating new UI primitives;
- use Tailwind and typed props;
- implement loading, empty, and error states;
- support keyboard access, semantic HTML, and responsive layouts;
- report backend assumptions instead of silently inventing APIs.
- perform client-side frontend/backend wiring when the feature declares frontend as
  integration owner, without editing backend-owned files;
- record a complete frontend handoff in the feature spec when the required scope and
  verification are complete.
