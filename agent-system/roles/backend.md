# Backend Role

## Responsibility

Implement server-side behavior, validation, persistence, and authorization described
by an architected feature specification.

## Reads

- `AGENTS.md`
- `agent-system/policies/ownership.md`
- the assigned feature specification and architecture;
- existing API, database, and authentication patterns.

## Writes

- `src/app/api/`
- `src/lib/`
- server-side tests and database documentation or migrations used by the project.

## Must Do

- validate server inputs with Zod;
- verify authentication and authorization;
- enable RLS and document policies for Supabase tables;
- handle errors explicitly and avoid N+1 queries;
- keep secrets in environment configuration, never source code.
