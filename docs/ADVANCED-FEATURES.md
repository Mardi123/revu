# Advanced features — Revu 0.5 alpha

Open **Advanced features** beside Review summary. This release adds six working tools to the existing review workflow. Generated context, policies, and checklists download locally. Tool state survives source inspection and tab changes within the page; refresh/restart does not persist these unsaved forms.

## Context optimizer

1. Choose up to 20 current changed files.
2. Include up to 12 discovered project primitives after inspecting their scope.
3. Choose diff hunks or full files, enter a reviewer task, and set an estimated-token budget.
4. Build the preview, inspect it, and copy or download the Markdown handoff for your agent.

Current unresolved reviewer notes are batched by file. Outdated and resolved notes are omitted. Explicitly selected primitives appear first, sorted by path, to keep the prefix stable between task changes. Diff fingerprints identify the source state. Context is reread on each build, with additional checks for changes during generation; this is not an atomic filesystem snapshot.

Token counts are **UTF-8 bytes divided by four, rounded up**, not tokenizer measurements or provider billing. Both modes include the same instructions and notes. Compact context can be larger than full files for a small change; the comparison shows that honestly. A user-entered input price can estimate input cost, excluding output tokens, retries, and cache discounts. No model pricing is supplied by Revu.

At 80% of the estimate limit, Revu warns; at 100%, the UI disables copy/download until you rebuild within a larger budget or smaller scope. This controls this export UI, not external agent spending. Input changes and workspace refreshes that reveal changed code or notes invalidate export. Changes made outside Revu require a fresh build. Selected primitives are limited to 32 KiB each; total previews to 256 KiB compact and 2 MiB full. Large requests fail visibly instead of silently truncating.

Credential-like assignments are heuristically redacted from code, tasks, and notes. Primitives matching that heuristic cannot be included. This is not comprehensive secret detection. Inspect the preview before sharing. Context never gets sent to an agent automatically.

## AI primitives

The inventory recognizes AGENTS.md, CLAUDE.md, `.github/copilot-instructions.md`, GitHub instruction/prompt/agent/chatmode Markdown, skills under `.claude/skills`, `.agents/skills`, or `.codex/skills`, `.revu/rules/*.md`, `.mcp.json`, and `.vscode/mcp.json`.

Nested AGENTS/CLAUDE files show directory scope. An `applyTo` frontmatter value is displayed for inspection, not evaluated. Inclusion is explicit; conflicting instructions and glob matching are not resolved automatically. Markdown review checklists are context material; executable pattern policies remain `.revu/rules.json`.

Discovery uses tracked and unignored paths, limited to 5,000 candidates and 64 results, with visible warnings. Oversized, unreadable, and credential-like primitives are ineligible. MCP configuration is inventory-only: it cannot be included in context, and no MCP process or server is started. Source inspection returns to the original tool state.

## GitHub PR preview

Install GitHub CLI (`gh`) on PATH and authenticate outside Revu with `gh auth login`. Enter a URL in the form `https://github.com/OWNER/REPO/pull/NUMBER` and choose **Load PR preview**. Your configured CLI credentials are used by `gh`; Revu never asks you to paste a token into a form.

Revu invokes fixed `gh pr view` and `gh pr diff` argument lists. Metadata is checked before and after the diff; a changed head/base requires retry. Requests have a 40-second total timeout, 128 KiB metadata limit, and 2 MiB diff limit. CLI diagnostics are not exposed in the browser. Only github.com PR URLs without credentials/query strings are accepted.

This tool reads remote PR metadata/diffs and lets you download the diff. It does not change the local review workspace, fetch a checkout, create a merge-base worktree, run the local scanner against the remote diff, or submit comments/reviews. The existing local review controls still refer to your local repository.

## Policy studio

Edit the example JSON and sample added code, then **Validate & test policy**. Results include line, evidence, impact, and verification steps. The same validation and Go regex matching engine powers repository rules. Path prefixes, extensions, comment filtering, and existing scanner limits apply.

After a successful validation, download `rules.json` and place it at `.revu/rules.json` in your repository, then rerun the local scan. Edits invalidate the validated download. Preview never overwrites existing project files. Limits: 25 rules, 500 characters per regex, 32 KiB preview JSON, 16 KiB sample code, 200 matches.

## Symbol outline

Choose a tracked or unignored repository file and select **Find symbols**. JavaScript/TypeScript, Python, and Go declarations link to full source lines. The regex fallback handles common single-line declarations; it is not an AST, LSP, symbol index, or semantic reference resolver. Multiline declarations and comments may cause omissions or false positives. Results stop at 200 symbols or 20,000 lines, with a visible limit notice.

## Deployment checks

Analyze current changes for path-based indicators: migrations, infrastructure, deployment configuration, application configuration, dependency manifests/locks, and API routes. Each matched file gets a concrete verification prompt. Download a Markdown checklist with evidence placeholders and rollback-plan fields.

This tool does not parse manifests, establish production impact, query cloud accounts, run scanners/tests, or execute deployment/rollback commands. No matching paths means no matches, not a safe-release verdict. Complete the checklist with real evidence.

## PRD coverage in this batch

| PRD feature | Implemented boundary |
| --- | --- |
| F6 / F8 GitHub PRs and auth | Partial: bounded read-only preview using existing gh auth; no worktree or submission |
| F9 symbol outline | Regex fallback for JS/TS, Python, Go; no LSP |
| F23 token accounting | Estimate and user-priced input-cost preview; no dispatch/thread/day usage ledger |
| F24 context pruning | Diff hunks and current notes; referenced symbol bodies are not automatically resolved |
| F25 cache-friendly prompts | Stable sorted primitive prefix with fingerprint; no provider cache metrics |
| F26 note batching | Current unresolved notes grouped by selected file in manual handoff |
| F27 model routing | Not implemented |
| F28 budgets | Estimate-based handoff export gate; no live agent daily/thread spending enforcement |
| F29–F30 caching and analytics | Not implemented |
| F31–F33 primitives and checklists | Inventory, displayed scope, explicit selection, Markdown checklist inclusion; no automatic scope/conflict resolution |
| F34 primitive linting | Partial: credential heuristic and size guard; no conflict analysis |
| F35–F38 packs/MCP/plugins | MCP inventory only; no installation, MCP server/client, or plugin runtime |
| F39–F45 security integrations | Existing lexical scanner and policy studio; external scanners, CVE/registry checks, and SARIF remain unimplemented |
| F46–F52 ratings | Not implemented; no fabricated quality score |
| F53–F55 / F58 deployment | Partial: path-based impact prompts and downloadable checklist/rollback template |
| F56–F57 / F59 deployment automation | Not implemented |

Agent dispatch/streams, GitHub review submission, editing/staging, native release distribution, external security scanners, and calibrated quality ratings remain substantial follow-on work. The PRD's speed and 40% token-reduction targets have not been established by a real-world benchmark.

## Try the included example

The release's `demo-workspace` includes deliberately flawed changes plus safe illustrative primitives and a large catalog file. In Context optimizer, select only `src/catalog.ts` to see how hunks reduce its context estimate. Inspect AGENTS.md, test the example policy, navigate catalog symbols, and analyze `config/runtime.json`. GitHub requires your own accessible PR URL and configured CLI session.
