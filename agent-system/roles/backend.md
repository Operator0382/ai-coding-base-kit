# Backend Role

## Responsibility

Implement server-side behavior, validation, persistence, and authorization described
by an architected feature specification.

## Reads

- `AGENTS.md`
- `agent-system/policies/ownership.md`
- `agent-system/policies/security.md`
- `agent-system/contracts/handoff.md`
- the assigned feature specification and architecture;
- existing API, database, and authentication patterns.

## Writes

- `src/app/api/`
- server-only files in `src/lib/`
- server-side tests and database documentation or migrations used by the project.

## Must Do

- when the feature is `Architected`, obtain transition approval and update only its
  index status cell to `In Progress` before implementation; if it is already `In
  Progress`, do not write the index again;
- validate server inputs with Zod;
- verify authentication and authorization;
- enable RLS and document policies for Supabase tables;
- handle errors explicitly and avoid N+1 queries;
- keep secrets in environment configuration, never source code.
- publish the API/data contract needed by the declared integration-owner track;
- record a complete backend handoff in the feature spec when the required scope and
  verification are complete.

## Must Not Do

Do not edit frontend pages, components, hooks, or frontend tests. If client wiring is
needed, hand it off to the frontend track. Integration ownership does not expand this
role's file scope.
