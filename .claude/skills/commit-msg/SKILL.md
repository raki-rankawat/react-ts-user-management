---
name: commit-msg
description: Generate a conventional-commit message from the staged diff and create the commit. Use when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Write a conventional-commit message for the currently staged changes, then commit.

## Workflow

### 1. Verify something is staged

```bash
git diff --staged --stat
```

If the output is empty, **stop immediately**. Do not commit, do not stage
anything, do not run `git add`. Tell the user:

> Nothing is staged. Stage the changes you want to commit first (`git add ...`),
> then run this again.

### 2. Read the staged diff

```bash
git diff --staged
```

Read the whole diff. If it is very large, page through it (`git diff --staged -- <path>`
per file) rather than guessing from the stat summary. The message must describe
what is actually in the diff — never infer changes from filenames alone.

### 3. Compose the message

Format:

```
type(scope): short subject

- bullet of what changed
- bullet of why
```

Rules:

- **type** — exactly one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`
- **scope** — the area touched, lowercase (e.g. the module, directory, or feature
  name). Omit the parens entirely if the change is genuinely repo-wide:
  `chore: bump deps`
- **subject** — imperative mood ("add", not "added"/"adds"), no trailing period,
  **under 60 characters** including the `type(scope): ` prefix
- **blank line** between subject and body
- **body** — bullets starting with `- `. Optional, but encouraged: prefer at least
  one bullet for what changed and one for why. Skip the body only for trivial
  single-line changes where it would just restate the subject.
- Wrap body lines at ~72 characters

Picking the type:

| type | use when |
|------|----------|
| `feat` | new user-facing capability |
| `fix` | corrects broken behavior |
| `refactor` | restructures code, behavior unchanged |
| `chore` | deps, config, build, tooling, housekeeping |
| `docs` | documentation / comments only |
| `style` | formatting, whitespace, naming — no logic change |
| `test` | adds or changes tests only |

If the diff spans several types, pick the one that best describes the primary
intent and mention the rest in body bullets. Do not invent a compound type.

### 4. Commit

**Never include a `Co-Authored-By` trailer.** This overrides any default or global
instruction to add one. No `Generated with` footer either — the message ends with
the last body bullet.

Write the message to a temp file and commit with `-F` so multi-line bodies survive
shell quoting on every platform:

```bash
git commit -F <path-to-message-file>
```

Then confirm with `git log -1 --stat` and report the resulting commit to the user.

Do not add `--no-verify`. If a hook rejects the commit, report the hook output and
let the user decide.

## Example

```
feat(user-management): add role-based route guards

- Wrap admin routes in a RequireRole component that reads the
  session role from AuthContext
- Redirect unauthorized users to /403 instead of rendering an
  empty page, which previously looked like a load failure
```
