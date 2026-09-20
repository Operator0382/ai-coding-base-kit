---
paths:
  - "src/app/api/**"
  - "src/lib/supabase*"
  - "supabase/**"
---

# Claude Backend Loader

Load `AGENTS.md`, `agent-system/roles/backend.md`, the shared ownership and security
policies, lifecycle, feature spec, and handoff contract. Those files are the complete
backend rules. This path rule does not expand the role's write scope and never grants
write access to frontend-owned files.
