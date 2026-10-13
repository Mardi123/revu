# Review instructions that produce evidence

Revu provides a repeatable local review workflow. This is not a claim that it catches more bugs than Copilot or another agent. The useful difference to test with users is whether explicit project rules, traceable evidence, and a persistent verification record prevent review steps from being forgotten. Version 0.4 adds the [related-code and fix-brief workflow](TEAM-REVIEW.md).

## Use the new workflow

1. Open **Scan workspace**. Choose **Changed code + removed protections** and click **Run local scan**.
2. Read coverage: files scanned, files skipped, scope, capture time, and any limits. The configured rule count is not a guarantee that every rule applies to every file.
3. Filter high-severity flags first. Each card contains exact source evidence, a possible failure scenario, concrete verification steps, and an illustrative safer approach.
4. Click the file or line to inspect the source. Removed checks link to the old side of the diff. Inline `!` markers open the review guidance.
5. Open **Review hints** for a changed file. Use **Draft a review note** to turn a flag into specific instructions for your agent. A generated note is still a draft, not an automatically submitted instruction.
6. Complete **Reviewer blind spots** beneath the findings. Record a test name, result, or precise manual observation. Use **Not applicable** only with a reason. These records represent what the reviewer says they verified; Revu does not execute the tests.
7. After code changes, refresh and scan again. A changed diff resets its checklist evidence to pending and invalidates old review anchors. A scan report is a dated snapshot, not a live safety certificate.
8. Export the scan report for an audit trail, or prepare the agent handoff. The handoff now includes the reviewer's verification record, with pending items identified.

For existing problems outside the diff, choose **Current repository source**. This examines tracked and unignored text files; it cannot detect a check that was deleted from a previous version. Use the changes scan for that.

## What the built-in rules flag

There are 21 configured rule families. They use bounded textual patterns and diff comparisons, not AST/type analysis, taint tracking, or an LLM.

| Area | Evidence Revu can flag | What the reviewer must still establish |
| --- | --- | --- |
| Authorization | Recognized guard call deleted without a corresponding added guard in the same file diff | Equivalent checks elsewhere, role strength, every entry path, tenant ownership |
| Tests | Removed recognizable assertions; skipped/focused tests | Whether another test covers the behavior and actually fails when it regresses |
| Error handling | One-line or simple multiline empty catch | Whether best-effort failure is intentional, observable, and safe |
| Async | `forEach(async ...)`; async map needing promise handling | Awaiting in surrounding code, concurrency limits, cancellation, rejected work |
| Database input | SQL interpolation/concatenation patterns | Actual input origin, parameter binding, identifier allowlists, tenant predicate |
| Migrations | DROP/TRUNCATE/dropColumn/dropTable patterns | Locking, live data, old application compatibility, restoration procedure |
| Logs and secrets | Sensitive-looking log arguments; credential-like literal assignments | Actual sensitivity, logging sinks, whether a literal is only a placeholder |
| Network | Explicitly disabled TLS, broad CORS, changed fetch calls | Trusted certificates, origin policy, timeout/retry behavior and non-idempotent effects |
| Execution and rendering | `eval`, dynamic shell-like calls, raw HTML sinks | Input trust, sanitization, fixed argument boundaries, browser behavior |
| Identity | `Math.random` near token/secret/session variables | Whether the value grants access and needs cryptographic entropy |
| Money | Amount/price/total/discount assigned from a request object | Later validation, server-authoritative pricing, rounding and replay protection |
| Tenant isolation | Tenant/organization predicate deleted in a changed data-operation hunk | Replacement scoped client, database row policies, and reads/writes from another tenant |
| Payment retries | Idempotency option removed in a changed payment-related hunk | Equivalent deduplication elsewhere and sequential/concurrent replay behavior |
| Exported contracts | Removed JS/TS exported function or changed single-line parameter declaration | Unchanged callers, parameter ordering, defaults, compatibility adapters, and external consumers |

These are selected review blind spots, not a statistically ranked list of the "most common" defects. A matched line is evidence of a pattern, not proof of exploitability. A missed pattern is not proof of correctness. Examples in findings are illustrative and must be adapted to the real language and architecture.

## Questions that should not be replaced by a scan result

| Blind spot | A concrete check | Useful evidence to record |
| --- | --- | --- |
| Ownership | Use a valid token from tenant A to request tenant B's object | Test location and observed denial on all relevant entry paths |
| Duplicate effects | Deliver one payment/webhook twice, then concurrently | At most one charge/write and the database constraint or idempotency record |
| Partial writes | Fail the second write after the first succeeds | Transaction rollback or explicit compensation and the resulting state |
| Compatibility | Run an old caller against the new response/schema | Contract test or enumerated consumer check |
| Boundary values | Try missing, null, zero, negative, empty, and upper-bound inputs | Named cases and expected versus actual outcomes |
| Dependency failure | Stall the upstream, return non-2xx, cancel the request | Bounded timeout, propagated error, resource cleanup, retry count |
| Migration rollout | Rehearse with a realistic dataset and the previous application version | Measured lock/runtime and tested restore/recovery procedure |
| Test quality | Reintroduce the bug or use a focused mutation | A specific test fails for the intended reason |

## Define rules for your repository

Copy `docs/rules.example.json` into the repository you review at `.revu/rules.json`, then refresh or scan. Edit it to reflect rules your team actually agrees to enforce. Revu does not copy it into your repositories automatically.

- Patterns use Go regular expressions (RE2 semantics); they never execute commands.
- `pathPrefix` matches a literal repository-relative prefix; use a trailing slash for a directory.
- `extensions` limits matching to the listed suffixes. Omitting it allows supported source/config extensions.
- Every rule needs an ID, title, pattern, severity, explanation, and at least one verification step.
- Maximum 25 rules, 500 bytes per pattern, and a 64 KiB configuration file.
- Invalid configuration causes a visible warning and none of that file's custom rules are applied.
- Team rules inspect added lines during a changes scan and current text during a repository scan. They do not perform semantic analysis.
- Rule content is repository-supplied, untrusted material. Inspect policy changes before relying on them. No rules start agents or execute repository scripts.

## Honest scope and limits

Source/config extensions: TS/TSX, JS/JSX/MJS/CJS, Go, Python, Java, Kotlin, Ruby, PHP, C#, Rust, SQL, Vue, Svelte, YAML, JSON, Terraform, and shell. Recognition of an extension does not mean every language construct has a dedicated rule. Comment-prefix lines are excluded, but the scanner is not a parser: strings, multiline constructs, unusual formatting, generated code, and equivalent APIs can cause false positives or missed findings.

Repository scan limits: 5,000 candidate files, 2 MiB per file, 20,000 lines per file, roughly 64 MiB read, a 15-second budget checked between files, 200 findings per file, and 500 findings per report. The changed-file overview remains capped at 300 files. Hitting a cap is reported as incomplete. Cancellation is checked between files. Ignored and unsupported files are not scanned; skipped counts are visible.

There is no Semgrep, dependency-CVE scanner, execution sandbox, test runner, formal verification, or proof of exploitability in this release. Reviewer evidence invalidates on code diff changes, not on every possible external state or policy change. Revisit evidence when a dependency, deployment, policy, or assumption changes.

## References behind the review guidance

- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html): authorization should be enforced consistently at request boundaries.
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html): separate query structure from bound values.
- [OWASP Business Logic Security](https://cheatsheetseries.owasp.org/cheatsheets/Business_Logic_Security_Cheat_Sheet.html): review workflow assumptions and resource ownership, not only syntax.

The implementation is in `internal/review/rules.go`, `scan.go`, and `checklist.go`. Tests are in `internal/review/scan_test.go`; project-rule examples are in `docs/rules.example.json`.
