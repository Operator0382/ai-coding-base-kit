# Hermes Agent Adapter

Hermes Agent should load `AGENTS.md`, then the selected role file under
`agent-system/roles/`. Follow `agent-system/workflows/lifecycle.yaml`, respect file
ownership, and produce the common handoff. This profile intentionally assumes no
undocumented Hermes-specific configuration format.
Also load the shared security policy. No runtime-specific delegation feature is
required.
