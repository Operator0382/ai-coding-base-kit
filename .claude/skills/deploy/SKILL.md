---
name: deploy
description: Claude wrapper for the canonical DevOps role and approved deployment.
argument-hint: "feature-spec-path or deployment target"
user-invocable: true
---

# Deployment Wrapper

Load the canonical contract, `agent-system/roles/devops.md`, lifecycle, policies,
handoff, index, feature spec, QA evidence, and relevant production guides. Stop unless
the feature is `Approved` and no Critical or High findings remain.

Claude may guide provider setup, but account creation, external deployment, remote
pushes, tags, production-data changes, and environment changes require the applicable
explicit user approval. Read or edit only explicit example env files with placeholders;
never inspect real environment files.

After deployment is verified and the user approves `approved -> deployed`, change
only the matching index status cell to `Deployed`, re-read it, and produce the standard
handoff.
