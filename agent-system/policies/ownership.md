# File Ownership and Parallel Work

Ownership prevents two agents from silently overwriting each other. It describes the
default scope; a feature-specific assignment may narrow it but must not broaden it
without user or orchestration approval.

| Role | Default write scope | Exclusive files |
|---|---|---|
| product | `docs/PRD.md`, structural content in `features/INDEX.md` | `docs/PRD.md`, `features/INDEX.md` except the status exception below |
| spec-writer | `features/PROJ-X-*.md` | assigned feature spec |
| architect | architecture section of assigned feature spec | assigned feature spec section |
| frontend | `src/app/` except `src/app/api/`, `src/components/`, `src/hooks/`, frontend tests | files assigned to the feature |
| backend | `src/app/api/`, server-only `src/lib/` files, server code, database docs and migrations | files assigned to the feature |
| qa | QA section of assigned feature spec, test files when authorized | QA results for assigned feature |
| devops | deployment configuration and production docs | deployment configuration |

## Rules

- Read `git status --short` before editing.
- Never edit another role's exclusive file concurrently.
- If scopes overlap, use a separate branch or worktree and merge deliberately.
- `features/INDEX.md` is a coordination bottleneck. Its only cross-role write
  exception is status ownership: after all transition evidence exists and the user
  approves, the role completing that transition may change only the status cell in
  the matching feature row. It must not change the feature name, spec link, priority,
  dependencies, other rows, table structure, or next ID, and it must re-read the row.
- Only the product role may make structural index changes. A spec-writer discovering
  a missing roadmap item requests a product-role update before creating its spec.
- Each feature spec names one required implementation track as integration owner.
  Integration work stays inside that track's write scope. Cross-scope work is split
  into a handoff to the owning track; integration ownership never expands file scope.
- The backend role never writes frontend pages, components, hooks, or frontend tests.
- Do not resolve a conflict by discarding another agent's work. Stop, preserve both
  sides, and report the conflict.
- Generated files and lockfiles belong to the role that caused their generation.

## Sensitive Scope

Follow `agent-system/policies/security.md`. Real environment files, credentials,
private keys, certificates, secret directories, and production data are blocked.
Environment files whose basename explicitly ends in `.example`, such as
`.env.example` or `.env.local.example`, are documentation: they may be read or edited,
but must contain placeholders only.
