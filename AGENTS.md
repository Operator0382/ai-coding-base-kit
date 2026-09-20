# Agent-Neutral Project Contract

This file is the shared entry point for every coding agent working in this repository.
It is intentionally independent of a model, vendor, CLI, editor, or tool protocol.

## Before Starting

1. Read this file completely.
2. Read `agent-system/README.md` and the role file that matches the task.
3. Read `features/INDEX.md` and the relevant feature specification.
4. Inspect the current Git status and existing implementation before editing.
5. Never read or modify real secrets, credentials, certificates, or runtime `.env`
   files. Explicit example files such as `.env.example` and `.env.local.example` are
   safe documentation and may be read or edited with placeholder values only.

## Source of Truth

- `AGENTS.md` contains repository-wide agent rules.
- `agent-system/roles/` contains role responsibilities and file scopes.
- `agent-system/workflows/` contains the lifecycle and allowed state transitions.
- `agent-system/contracts/` contains handoff and verification formats.
- `agent-system/policies/` contains ownership and parallel-work rules.
- `features/INDEX.md` and feature specs contain product state.
- Runtime entry points (`CLAUDE.md`, `GEMINI.md`, `.cursor/`, `.claude/`, and
  `agent-system/adapters/`) are compatibility adapters, not canonical sources.

If an adapter-specific instruction conflicts with this contract, follow this file and
report the conflict in the handoff.

## Working Rules

- Keep changes limited to the assigned role and feature scope.
- Read every file before modifying it.
- Preserve unrelated user changes; never reset, clean, or overwrite them.
- Do not invent APIs, requirements, test results, or files that were not verified.
- Use existing components and project conventions before adding new abstractions.
- Keep secrets out of source control and document new variables in
  `.env.local.example` using placeholders only.
- Ask for approval before destructive operations, production data changes, auth/RLS
  changes, external communication, or pushing to a remote.
- Do not silently advance a workflow state. Record the evidence and request the
  required approval when the workflow says approval is needed.
- `features/INDEX.md` is the single source of truth for lifecycle status. After the
  required user approval, the role that completes a transition may update only the
  status cell in the matching feature row, then must re-read that row. All other
  index changes remain owned by the product role.

## Product Workflow

Use the lifecycle in `agent-system/workflows/lifecycle.yaml`:

```text
init -> spec -> architecture -> implementation -> qa -> deploy
```

Every feature specification declares its required implementation tracks and exactly
one integration owner. Frontend and backend may work in parallel when their file
scopes do not overlap. QA may start only when every required track has a completed
handoff recorded in the specification, including the integration-owner track. QA
finds and documents defects; it does not fix them.

## Verification

Every completed task must use the handoff format in
`agent-system/contracts/handoff.md`, including changed files, checks actually run,
remaining risks, and the recommended next role.

## Project Commands

```bash
npm run dev
npm run build
npm run lint
npm test
npm run test:e2e
npm run test:all
npm run check:contracts
npm run test:contracts
```

Run only the checks relevant to the change and state clearly when a check was not run.

## Git

- Feature commits: `feat(PROJ-X): description`
- Bug fixes: `fix(PROJ-X): description`
- Documentation and infrastructure changes may use `docs:` or `chore:`.
- Agents may prepare commits only when the user or orchestration layer authorizes it.
- Never force-push.
