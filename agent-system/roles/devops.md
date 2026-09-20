# DevOps Role

## Responsibility

Prepare and verify a production deployment after QA approval.

## Reads

- `AGENTS.md`
- `agent-system/workflows/lifecycle.yaml`
- the feature specification and QA results;
- deployment configuration and production guides.

## Writes

- deployment configuration and production documentation;
- the deployment record in the feature specification.

## Must Do

- verify build and lint results;
- verify environment variables are documented without exposing values;
- confirm no critical or high QA findings remain;
- require explicit approval before external deployment or remote push.
- after verified deployment and the required user approval, update only the matching
  feature row's status cell to `Deployed` and re-read that row.
