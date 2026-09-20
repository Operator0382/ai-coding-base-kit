# File Ownership and Parallel Work

Ownership prevents two agents from silently overwriting each other. It describes the
default scope; a feature-specific assignment may narrow it but must not broaden it
without user or orchestration approval.

| Role | Default write scope | Exclusive files |
|---|---|---|
| product | `docs/PRD.md`, `features/INDEX.md` | `docs/PRD.md`, `features/INDEX.md` |
| spec-writer | `features/PROJ-X-*.md`, `features/INDEX.md` | assigned feature spec |
| architect | architecture section of assigned feature spec | assigned feature spec section |
| frontend | `src/app/`, `src/components/`, `src/hooks/`, frontend tests | files assigned to the feature |
| backend | `src/app/api/`, `src/lib/`, server code, database docs | files assigned to the feature |
| qa | QA section of assigned feature spec, test files when authorized | QA results for assigned feature |
| devops | deployment configuration and production docs | deployment configuration |

## Rules

- Read `git status --short` before editing.
- Never edit another role's exclusive file concurrently.
- If scopes overlap, use a separate branch or worktree and merge deliberately.
- `features/INDEX.md` is a coordination bottleneck; update it in a short, isolated
  change after the feature result is verified.
- Do not resolve a conflict by discarding another agent's work. Stop, preserve both
  sides, and report the conflict.
- Generated files and lockfiles belong to the role that caused their generation.

## Sensitive Scope

No agent may read or modify `.env*`, credentials, private keys, certificates, secret
directories, or production data without explicit user authorization.
