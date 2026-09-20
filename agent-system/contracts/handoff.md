# Agent Handoff Contract

Every role ends with a handoff using the following headings. The content may be
written in Markdown, but the headings and meaning must remain stable across runtimes.

## Role

State the role that performed the work and the feature ID, if applicable.

## Result

Describe what was completed in factual terms. Separate implemented behavior from
recommendations or assumptions.

## Changed Files

List every changed file and why it changed. Do not claim changes that were not made.

## Implementation Track

For frontend or backend work, state the track, whether it is `Complete` or `Blocked`,
the completed scope, and whether it owns integration. For other roles, state `Not
applicable`. A `Complete` implementation handoff must be recorded in the feature
specification's Implementation Tracks table before QA can start.

## Verification

List commands or manual checks that were actually run, with their result. Say
`not run` when a check was intentionally skipped.

## Decisions and Risks

Record decisions that affect later roles, unresolved questions, and known risks.

## Blockers

State `None` or describe the exact missing input, approval, or external dependency.

## Next Role

Name the recommended next role and the condition that makes the handoff ready.

## Handoff Rules

- A handoff is a report, not permission to start the next phase.
- A handoff is `Complete` only when its required scope and relevant verification are
  complete. Partial work, blockers, or deferred required work must be `Blocked`.
- QA verifies the join gate: every required implementation track is `Complete`, every
  handoff is recorded in the feature spec, and the integration-owner track is complete.
- The next role re-reads the relevant files and verifies the current Git state.
- If the implementation differs from the specification, record the difference here
  and update the specification through the owning role.
- Never include secrets, access tokens, or private credentials in a handoff.
