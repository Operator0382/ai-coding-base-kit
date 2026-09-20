# Feature Specifications

Dieser Ordner enthält detaillierte Feature Specs der Spezifikationsrolle.
Die kanonische Vorlage liegt in
`agent-system/contracts/feature-spec-template.md`.

## Naming Convention
`PROJ-X-feature-name.md`

Beispiele:
- `PROJ-1-user-authentication.md`
- `PROJ-2-kanban-board.md`
- `PROJ-3-file-attachments.md`

## Was gehört in eine Feature Spec?

### 1. User Stories
Beschreibe, was der User tun möchte:
```markdown
Als [User-Typ] möchte ich [Aktion] um [Ziel zu erreichen]
```

### 2. Acceptance Criteria
Konkrete, testbare Kriterien:
```markdown
- [ ] User kann Email + Passwort eingeben
- [ ] Passwort muss mindestens 8 Zeichen lang sein
- [ ] Nach Registration wird User automatisch eingeloggt
```

### 3. Implementation Tracks

Jede Spec muss Frontend und Backend explizit als `required` oder `not-required`
deklarieren. Genau ein benötigter Track besitzt die Frontend-/Backend-Integration.
Ein benötigter Track wird erst `complete`, wenn sein Handoff nach
`agent-system/contracts/handoff.md` in der Spec referenziert ist.

```markdown
## Implementation Tracks

**Integration owner:** frontend

| Track | Requirement | Status | Handoff |
|---|---|---|---|
| frontend | required | pending | — |
| backend | required | pending | — |
```

QA darf erst beginnen, wenn alle `required` Tracks `complete` sind, jeder Handoff
eingetragen ist und der Integration-Owner ebenfalls `complete` ist.

### 4. Edge Cases
Was passiert bei unerwarteten Situationen:
```markdown
- Was passiert bei doppelter Email?
- Was passiert bei Netzwerkfehler?
- Was passiert bei gleichzeitigen Edits?
```

### 5. Tech Design (vom Solution Architect)
```markdown
## Database Schema
- Task: ID, title, status, owner, timestamps
- Relationship: each task belongs to one project

## Component Architecture
ProjectDashboard
├── ProjectList
│   └── ProjectCard
```

### 6. QA Test Results (vom QA Engineer)
Am Ende des Feature-Dokuments fügt QA die Test-Ergebnisse hinzu:
```markdown
---

## QA Test Results

**Tested:** 2026-01-12
**App URL:** http://localhost:3000

### Acceptance Criteria Status
- [x] AC-1: User kann Email + Passwort eingeben
- [x] AC-2: Passwort mindestens 8 Zeichen
- [ ] ❌ BUG: Doppelte Email wird nicht abgelehnt

### Bugs Found
**BUG-1: Doppelte Email-Registrierung**
- **Severity:** High
- **Steps to Reproduce:** 1. Register with email, 2. Try again with same email
- **Expected:** Error message
- **Actual:** Silent failure
```

### 7. Deployment Status (vom DevOps Engineer)
```markdown
---

## Deployment

**Status:** ✅ Deployed
**Deployed:** 2026-01-13
**Production URL:** https://your-app.vercel.app
**Git Tag:** v1.0.0-PROJ-1
```

## Workflow

1. **Spezifikationsrolle** erstellt die Feature Spec
2. **User** reviewed Spec und gibt Feedback
3. **Solution Architect** fügt Tech-Design hinzu
4. **User** approved finales Design
5. **Frontend/Backend Devs** implementieren die als benötigt markierten Tracks und
   tragen abgeschlossene Handoffs ein; der deklarierte Track verantwortet Integration
6. **QA Engineer** prüft zuerst das Join-Gate und testet danach
7. **DevOps** deployed und fügt Deployment-Status zum Feature-Dokument hinzu

## Status-Tracking

Der Lifecycle-Status wird ausschließlich in `features/INDEX.md` getrackt. Nach einer
freigegebenen Transition darf die abschließende Rolle nur die Statuszelle der
betroffenen Feature-Zeile ändern und muss die Zeile anschließend erneut lesen.
Andere Änderungen am Index gehören der Product-Rolle.

**Git als Single Source of Truth:**
- Alle Implementierungs-Details sind in Git Commits
- `git log --grep="PROJ-1"` zeigt alle Änderungen für dieses Feature
- Keine separate FEATURE_CHANGELOG.md nötig!
