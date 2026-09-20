# Security and Sensitive Files

This policy is the canonical security baseline for every runtime adapter.

## Sensitive Files

- Never read or modify real `.env` files, credentials, private keys, certificates,
  secret directories, production data, `.npmrc`, `.pypirc`, `.aws/`, or `.ssh/`.
- Environment files whose basename explicitly ends in `.example`, such as
  `.env.example` and `.env.local.example`, are non-secret documentation. They may be
  read and edited only with obvious placeholder values.
- Never commit tokens, credentials, private endpoints, or production values.

## Application Security

- Validate untrusted server input with Zod and use parameterized data access.
- Verify authentication and authorization before protected operations.
- Enable and document RLS for Supabase tables; changes to auth or RLS require explicit
  user approval.
- Use `NEXT_PUBLIC_` only for values that are safe to expose to browsers.
- Apply rate limiting where abuse is plausible and do not expose sensitive error data.
- Use the security-header guidance in `docs/production/security-headers.md` for
  production deployments.
