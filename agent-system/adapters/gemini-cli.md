# Gemini CLI Adapter

Gemini CLI loads `GEMINI.md` as the runtime bootstrap. `GEMINI.md` must delegate to
`AGENTS.md`, which remains the canonical project contract. Load the selected role file
under `agent-system/roles/` and follow the shared lifecycle and handoff format.
Gemini-specific commands are optional and do not change lifecycle gates.
