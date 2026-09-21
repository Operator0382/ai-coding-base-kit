# Codex Adapter

Codex loads `AGENTS.md` as the repository contract. For a role-specific task, also
load `agent-system/README.md` and the matching file in `agent-system/roles/`. Use the
shared lifecycle, ownership and security policies, and handoff contract; do not
substitute a model name for a role or require optional runtime features.

Project skills under `.agents/skills/` provide discoverable entry points for `init`,
`write-spec`, `architecture`, `frontend`, `backend`, `qa`, `deploy`, `help`, and
`refine`. They only route Codex to the canonical files above. A fresh Codex session is
required before newly added project skills can be observed through automatic
discovery; the manual `AGENTS.md` entry point remains complete without them.
