import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, "..")
const lifecyclePath = path.join(projectRoot, "agent-system/workflows/lifecycle.yaml")

const expectedRoles = [
  "product",
  "spec-writer",
  "architect",
  "frontend",
  "backend",
  "qa",
  "devops",
]

const expectedTransitions = [
  "roadmap->planned",
  "planned->architected",
  "architected->in_progress",
  "in_progress->in_review",
  "in_review->approved",
  "approved->deployed",
]

const requiredAdapterFiles = [
  "CLAUDE.md",
  "GEMINI.md",
  ".cursor/rules/agent-system.mdc",
  "agent-system/adapters/codex.md",
  "agent-system/adapters/cursor-agent.md",
  "agent-system/adapters/gemini-cli.md",
  "agent-system/adapters/hermes-agent.md",
  "agent-system/adapters/openclaw.md",
]

const requiredCodexSkills = {
  init: ["agent-system/roles/product.md"],
  "write-spec": [
    "agent-system/roles/spec-writer.md",
    "agent-system/contracts/feature-spec-template.md",
  ],
  architecture: ["agent-system/roles/architect.md"],
  frontend: [
    "agent-system/roles/frontend.md",
    "agent-system/policies/ownership.md",
    "agent-system/policies/security.md",
  ],
  backend: [
    "agent-system/roles/backend.md",
    "agent-system/policies/ownership.md",
    "agent-system/policies/security.md",
  ],
  qa: [
    "agent-system/roles/qa.md",
    "agent-system/contracts/qa-results-template.md",
  ],
  deploy: [
    "agent-system/roles/devops.md",
    "agent-system/policies/security.md",
  ],
  help: ["features/INDEX.md"],
  refine: [
    "agent-system/roles/spec-writer.md",
    "agent-system/roles/architect.md",
    "agent-system/contracts/feature-spec-template.md",
  ],
}

const sharedCodexSkillReferences = [
  "AGENTS.md",
  "agent-system/README.md",
  "agent-system/workflows/lifecycle.yaml",
  "agent-system/contracts/handoff.md",
]

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8")
}

function parseScalar(value) {
  if (/^-?\d+$/.test(value)) return Number(value)
  if (value === "true") return true
  if (value === "false") return false
  if (value === "null") return null
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  return value
}

function splitMapping(content, lineNumber) {
  const separator = content.indexOf(":")
  if (separator < 1) throw new Error(`Expected mapping on line ${lineNumber}`)
  return [content.slice(0, separator).trim(), content.slice(separator + 1).trim()]
}

function parseYamlSubset(source) {
  const lines = source
    .split(/\r?\n/)
    .map((raw, index) => ({ raw, number: index + 1 }))
    .filter(({ raw }) => raw.trim() && !raw.trimStart().startsWith("#"))
    .map(({ raw, number }) => {
      if (/\t/.test(raw.match(/^\s*/)?.[0] ?? "")) throw new Error(`Tabs are not allowed on line ${number}`)
      return { indent: raw.length - raw.trimStart().length, content: raw.trim(), number }
    })

  function parseBlock(start, indent) {
    if (!lines[start] || lines[start].indent !== indent) throw new Error(`Unexpected indentation near line ${lines[start]?.number ?? "EOF"}`)
    return lines[start].content.startsWith("- ") ? parseSequence(start, indent) : parseMapping(start, indent)
  }

  function parseMapping(start, indent, seed = {}) {
    const result = seed
    let index = start
    while (index < lines.length && lines[index].indent === indent && !lines[index].content.startsWith("- ")) {
      const line = lines[index]
      const [key, value] = splitMapping(line.content, line.number)
      if (Object.hasOwn(result, key)) throw new Error(`Duplicate key "${key}" on line ${line.number}`)
      if (value) {
        result[key] = parseScalar(value)
        index += 1
      } else {
        index += 1
        if (!lines[index] || lines[index].indent <= indent) throw new Error(`Missing nested value for "${key}" on line ${line.number}`)
        const parsed = parseBlock(index, lines[index].indent)
        result[key] = parsed.value
        index = parsed.index
      }
    }
    return { value: result, index }
  }

  function parseSequence(start, indent) {
    const result = []
    let index = start
    while (index < lines.length && lines[index].indent === indent && lines[index].content.startsWith("- ")) {
      const line = lines[index]
      const rest = line.content.slice(2).trim()
      if (!rest) {
        index += 1
        if (!lines[index] || lines[index].indent <= indent) throw new Error(`Missing sequence value on line ${line.number}`)
        const parsed = parseBlock(index, lines[index].indent)
        result.push(parsed.value)
        index = parsed.index
      } else if (rest.includes(":")) {
        const [key, value] = splitMapping(rest, line.number)
        const item = { [key]: value ? parseScalar(value) : undefined }
        index += 1
        if (!value && lines[index]?.indent > indent) {
          const parsed = parseBlock(index, lines[index].indent)
          item[key] = parsed.value
          index = parsed.index
        }
        if (lines[index]?.indent === indent + 2 && !lines[index].content.startsWith("- ")) {
          const parsed = parseMapping(index, indent + 2, item)
          index = parsed.index
        }
        result.push(item)
      } else {
        result.push(parseScalar(rest))
        index += 1
      }
    }
    return { value: result, index }
  }

  if (lines.length === 0) throw new Error("Document is empty")
  const parsed = parseBlock(0, lines[0].indent)
  if (parsed.index !== lines.length) throw new Error(`Unexpected content on line ${lines[parsed.index].number}`)
  return parsed.value
}

function loadLifecycle() {
  try {
    return parseYamlSubset(fs.readFileSync(lifecyclePath, "utf8"))
  } catch (error) {
    throw new Error(`Lifecycle YAML is not loadable: ${error.message}`)
  }
}

function addError(errors, condition, message) {
  if (!condition) errors.push(message)
}

function validateCodexSkills(errors) {
  for (const [name, specificReferences] of Object.entries(requiredCodexSkills)) {
    const relativePath = `.agents/skills/${name}/SKILL.md`
    const absolutePath = path.join(projectRoot, relativePath)
    addError(errors, fs.existsSync(absolutePath), `Missing Codex project skill: ${relativePath}`)
    if (!fs.existsSync(absolutePath)) continue

    const content = read(relativePath)
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? ""
    const declaredName = frontmatter.match(/^name:\s*(.+)$/m)?.[1]?.trim()
    const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim()

    addError(errors, declaredName === name, `${relativePath}: frontmatter name must match its directory`)
    addError(errors, Boolean(description) && description.length >= 40, `${relativePath}: missing or too-short discovery description`)
    addError(errors, !content.includes(".claude/"), `${relativePath}: Codex skill must not depend on Claude adapters`)

    for (const reference of [...sharedCodexSkillReferences, ...specificReferences]) {
      addError(errors, fs.existsSync(path.join(projectRoot, reference)), `${relativePath}: referenced canonical file does not exist: ${reference}`)
      addError(errors, content.includes(reference), `${relativePath}: missing canonical reference: ${reference}`)
    }
  }
}

function validateFeatureSpecs(errors, lifecycle) {
  const allowedTracks = new Set(lifecycle.implementation_tracks?.allowed ?? [])
  const featureDirectory = path.join(projectRoot, "features")
  const indexContent = read("features/INDEX.md")
  const indexStatuses = new Map()
  for (const line of indexContent.split(/\r?\n/)) {
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())
    if (/^PROJ-\d+$/.test(cells[0] ?? "")) indexStatuses.set(cells[0], cells[2])
  }
  const specs = fs
    .readdirSync(featureDirectory)
    .filter((name) => /^PROJ-\d+-.+\.md$/.test(name))

  for (const name of specs) {
    const featureId = name.match(/^(PROJ-\d+)-/)?.[1]
    const content = fs.readFileSync(path.join(featureDirectory, name), "utf8")
    addError(errors, content.includes("## Implementation Tracks"), `${name}: missing Implementation Tracks section`)

    const owner = content.match(/\*\*Integration owner:\*\*\s*(frontend|backend)/)?.[1]
    addError(errors, Boolean(owner), `${name}: missing or unknown integration owner`)

    const rows = new Map()
    for (const match of content.matchAll(/^\|\s*(frontend|backend)\s*\|\s*(required|not-required)\s*\|\s*(pending|complete|blocked)\s*\|\s*([^|]+)\|$/gm)) {
      rows.set(match[1], { requirement: match[2], status: match[3], handoff: match[4].trim() })
    }

    for (const track of allowedTracks) {
      addError(errors, rows.has(track), `${name}: missing ${track} track row`)
    }

    if (owner && rows.has(owner)) {
      addError(errors, rows.get(owner).requirement === "required", `${name}: integration owner must be a required track`)
    }

    for (const [track, row] of rows) {
      if (row.requirement === "required" && row.status === "complete") {
        addError(errors, !/^(—|-|pending)$/i.test(row.handoff), `${name}: complete ${track} track has no handoff reference`)
      }
    }

    const indexStatus = indexStatuses.get(featureId)
    addError(errors, Boolean(indexStatus), `${name}: feature is missing from features/INDEX.md`)
    if (["In Review", "Approved", "Deployed"].includes(indexStatus)) {
      for (const [track, row] of rows) {
        if (row.requirement === "required") {
          addError(errors, row.status === "complete", `${name}: ${indexStatus} feature has incomplete ${track} track`)
          addError(errors, !/^(—|-|pending)$/i.test(row.handoff), `${name}: ${indexStatus} feature lacks ${track} handoff`)
        }
      }
      addError(errors, rows.get(owner)?.status === "complete", `${name}: ${indexStatus} feature has incomplete integration owner`)
    }
  }

  return specs.length
}

function validateLifecycle(lifecycle) {
  const errors = []
  addError(errors, lifecycle && typeof lifecycle === "object", "Lifecycle root must be an object")
  if (!lifecycle || typeof lifecycle !== "object") return errors

  addError(errors, lifecycle.version === 2, "Lifecycle version must be 2")

  const roles = lifecycle.roles ?? []
  addError(errors, Array.isArray(roles), "roles must be an array")
  addError(errors, JSON.stringify(roles) === JSON.stringify(expectedRoles), "Known roles do not match the canonical role set")
  const roleSet = new Set(roles)

  for (const role of expectedRoles) {
    addError(errors, fs.existsSync(path.join(projectRoot, `agent-system/roles/${role}.md`)), `Missing role file: ${role}.md`)
  }

  const states = lifecycle.states ?? []
  const stateIds = new Set(states.map((state) => state.id))
  for (const state of states) {
    addError(errors, roleSet.has(state.owner) || state.owner === "implementation", `State ${state.id} references unknown owner: ${state.owner}`)
  }
  const transitionKeys = []
  for (const transition of lifecycle.transitions ?? []) {
    const key = `${transition.from}->${transition.to}`
    transitionKeys.push(key)
    addError(errors, stateIds.has(transition.from) && stateIds.has(transition.to), `Transition references unknown state: ${key}`)
    const transitionRoles = transition.roles ?? [transition.role]
    for (const role of transitionRoles) {
      addError(errors, roleSet.has(role), `Transition ${key} references unknown role: ${role}`)
    }
    addError(errors, transition.approval === "user", `Transition ${key} must require user approval`)
  }
  addError(errors, JSON.stringify(transitionKeys) === JSON.stringify(expectedTransitions), "Known transitions do not match the canonical lifecycle")

  for (const relativePath of lifecycle.contract_files ?? []) {
    addError(errors, fs.existsSync(path.join(projectRoot, relativePath)), `Referenced contract file does not exist: ${relativePath}`)
  }
  addError(errors, fs.existsSync(path.join(projectRoot, lifecycle.required_handoff ?? "")), "required_handoff does not reference an existing file")
  for (const relativePath of requiredAdapterFiles) {
    addError(errors, fs.existsSync(path.join(projectRoot, relativePath)), `Missing runtime adapter: ${relativePath}`)
    if (fs.existsSync(path.join(projectRoot, relativePath))) {
      const adapter = read(relativePath)
      addError(errors, adapter.includes("AGENTS.md") && adapter.includes("agent-system/"), `Runtime adapter does not delegate to the canonical contract: ${relativePath}`)
    }
  }
  validateCodexSkills(errors)

  const status = lifecycle.status_updates ?? {}
  addError(errors, status.file === "features/INDEX.md", "Status ownership must target features/INDEX.md")
  addError(errors, status.owner === "product", "Product must own structural feature-index changes")
  addError(errors, status.exception_actor === "transition-completing-role", "Status exception must belong to the transition-completing role")
  addError(errors, status.exception_scope === "matching-feature-row-status-cell-only", "Status exception must be limited to one matching status cell")
  addError(errors, (status.requires ?? []).includes("user-approval-recorded"), "Status updates must require recorded user approval")
  addError(errors, status.verify === "reread-matching-feature-row", "Status updates must require row re-read verification")

  const implementation = lifecycle.implementation_tracks ?? {}
  addError(errors, JSON.stringify(implementation.allowed) === JSON.stringify(["frontend", "backend"]), "Implementation tracks must be frontend and backend")
  addError(errors, typeof implementation.integration_owner === "string", "Integration ownership rule is missing")

  const gate = lifecycle.qa_join_gate ?? {}
  addError(errors, gate.transition?.from === "in_progress" && gate.transition?.to === "in_review", "QA join gate must guard in_progress -> in_review")
  const gateRequirements = new Set(gate.requires ?? [])
  for (const requirement of [
    "feature-spec-declares-required-implementation-tracks",
    "every-required-track-status-is-complete",
    "every-required-track-handoff-is-recorded",
    "integration-owner-is-declared-and-complete",
  ]) {
    addError(errors, gateRequirements.has(requirement), `QA join gate is missing: ${requirement}`)
  }

  const qaTransition = (lifecycle.transitions ?? []).find(
    (transition) => transition.from === "in_progress" && transition.to === "in_review",
  )
  addError(errors, qaTransition?.condition === "required-implementation-tracks-complete", "QA transition condition does not enforce completed tracks")

  const ownership = read("agent-system/policies/ownership.md")
  addError(errors, ownership.includes("matching feature row") && ownership.includes("status cell"), "Ownership policy does not document the narrow status exception")
  addError(errors, ownership.includes("backend role never writes frontend"), "Ownership policy does not protect frontend scope from backend writes")

  const handoff = read("agent-system/contracts/handoff.md")
  addError(errors, handoff.includes("## Implementation Track"), "Handoff contract lacks implementation-track evidence")
  addError(errors, handoff.includes("QA verifies the join gate"), "Handoff contract lacks the QA join gate")

  const template = read("agent-system/contracts/feature-spec-template.md")
  addError(errors, template.includes("## Implementation Tracks"), "Feature template lacks Implementation Tracks")
  addError(errors, template.includes("**Integration owner:**"), "Feature template lacks an integration owner")

  const claudeSettings = JSON.parse(read(".claude/settings.json"))
  const denied = claudeSettings.permissions?.deny ?? []
  const allowed = claudeSettings.permissions?.allow ?? []
  addError(errors, denied.includes("Read(**/.env)") && denied.includes("Edit(**/.env.local)") && denied.includes("Write(**/.env.production)"), "Claude adapter does not block real environment files")
  addError(errors, !denied.includes("Read(**/.env*)") && !denied.includes("Edit(**/.env*)") && !denied.includes("Write(**/.env*)"), "Claude adapter's broad environment-file deny also blocks examples")
  addError(errors, allowed.includes("Read(**/.env*.example)") && allowed.includes("Edit(**/.env*.example)") && allowed.includes("Write(**/.env*.example)"), "Claude adapter does not allow explicit environment examples")
  addError(errors, !allowed.some((entry) => entry.startsWith("Bash(git push") || entry.startsWith("Bash(git commit") || entry.startsWith("Bash(git tag")), "Claude adapter bypasses canonical Git approval rules")

  validateFeatureSpecs(errors, lifecycle)
  return errors
}

function setAtPath(target, segments, value) {
  let cursor = target
  for (const segment of segments.slice(0, -1)) cursor = cursor[segment]
  cursor[segments.at(-1)] = value
}

function deleteAtPath(target, segments) {
  let cursor = target
  for (const segment of segments.slice(0, -1)) cursor = cursor[segment]
  delete cursor[segments.at(-1)]
}

function runFixtures(lifecycle) {
  const fixtureDirectory = path.join(scriptDirectory, "fixtures/agent-contract")
  const fixtures = fs.readdirSync(fixtureDirectory).filter((name) => name.endsWith(".json")).sort()
  const failures = []

  for (const name of fixtures) {
    const fixture = JSON.parse(fs.readFileSync(path.join(fixtureDirectory, name), "utf8"))
    const candidate = structuredClone(lifecycle)
    for (const operation of fixture.operations) {
      if (operation.op === "set") setAtPath(candidate, operation.path, operation.value)
      else if (operation.op === "delete") deleteAtPath(candidate, operation.path)
      else failures.push(`${name}: unknown fixture operation ${operation.op}`)
    }
    const errors = validateLifecycle(candidate)
    if (!errors.some((error) => error.includes(fixture.expectedError))) {
      failures.push(`${name}: expected error containing "${fixture.expectedError}"`)
    }
  }

  return { count: fixtures.length, failures }
}

let lifecycle
try {
  lifecycle = loadLifecycle()
} catch (error) {
  console.error(`Contract check failed:\n- ${error.message}`)
  process.exit(1)
}

const errors = validateLifecycle(lifecycle)
if (errors.length > 0) {
  console.error(`Contract check failed:\n${errors.map((error) => `- ${error}`).join("\n")}`)
  process.exit(1)
}

if (process.argv.includes("--fixtures")) {
  const result = runFixtures(lifecycle)
  if (result.failures.length > 0) {
    console.error(`Contract fixture test failed:\n${result.failures.map((error) => `- ${error}`).join("\n")}`)
    process.exit(1)
  }
  console.log(`Contract fixture test passed (${result.count} negative fixtures).`)
} else {
  console.log("Agent contract check passed.")
}
