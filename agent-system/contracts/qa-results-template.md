# QA Results Template

Append this section to the assigned feature specification after the QA join gate has
been verified.

```markdown
---

## QA Test Results

**Tested:** YYYY-MM-DD
**App URL:** http://localhost:3000
**Tester:** QA role

### Implementation Join Gate
- [x] Every required implementation track is `complete`
- [x] Every required track has a recorded handoff
- [x] The declared integration-owner track is `complete`

### Acceptance Criteria Status

#### AC-1: [Criterion Name]
- [x] Sub-criterion passed
- [ ] BUG: Sub-criterion failed (describe what went wrong)

### Edge Cases Status

#### EC-1: [Edge Case Name]
- [x] Handled correctly

### Security Audit Results
- [x] Authentication and authorization verified where applicable
- [x] Input validation and data exposure checked
- [ ] BUG: [Security issue description]

### Bugs Found

#### BUG-1: [Bug Title]
- **Severity:** Critical | High | Medium | Low
- **Steps to Reproduce:**
  1. Go to [page]
  2. Do [action]
  3. Expected: [what should happen]
  4. Actual: [what actually happens]
- **Evidence:** [screenshot, log, or test output]
- **Priority:** Fix before deployment | Fix in next sprint | Nice to have

### Summary
- **Acceptance Criteria:** X/Y passed
- **Bugs Found:** N total (C critical, H high, M medium, L low)
- **Security:** Pass | Issues found
- **Production Ready:** YES | NO
- **Recommendation:** Deploy | Fix bugs first
```
