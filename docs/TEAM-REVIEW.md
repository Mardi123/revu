# Team review — 0.4 alpha

The working buyer assumption is a small team reviewing AI-generated changes before merge. This release adds a stronger investigation and handoff loop. It does not establish willingness to pay or outperform another reviewer on a real-world benchmark.

## New capabilities

**Three regression rule families.** A changes scan now checks for a deleted tenant/organization predicate near a changed data operation, a deleted idempotency option in payment-related code, and a removed or changed single-line exported JavaScript/TypeScript function declaration. The total is 21 built-in families. Every new flag has an old-side anchor, a possible failure, and verification steps. Equivalent protections elsewhere can make a flag inapplicable.

Tenant and idempotency checks compare lines within the same diff hunk. A matching replacement in that hunk suppresses the flag. A similar key in an unrelated hunk does not. Test files and comment-prefix lines are excluded. These are lexical checks: scoped database clients, row-level policies, middleware, formatting, aliases, and multiline declarations are not semantically resolved.

**Related caller and test references.** In the scan queue, choose **Find related callers & tests**. Revu extracts recognizable exported JS/TS names visible in the changed file's diff and searches current repository text for those names. Results link to full source, distinguish test-file references, and provide a return route to the original flag. This can expose an unchanged caller after a signature edit; it is not a resolved call graph or proof that a test exercises the changed code.

Search is bounded to 12 names, 2,000 candidate paths, roughly 16 MiB, 20,000 lines per file, an eight-second budget checked between files, and 40 references. File reads retain the existing two-MiB and repository-boundary protections. Limits and skipped counts are displayed. A changed source snapshot rejects an old lookup. Other files can change after the lookup; inspect current source and repeat the search when needed.

**Review summary and fix brief.** The summary recomputes current changed-file status. It shows reviewer-marked fixes, unreviewed flags, high-impact counts, dismissed flags, pending checklist items, reviewed-file counts, unresolved notes, and coverage gaps. These are local review records, not a GitHub review, test result, or merge approval.

The downloadable/copyable Markdown brief includes only current reviewer-marked needs-fix findings as requested fixes, with reasons, source fingerprints, line anchors, and verification steps. Current unresolved notes and outstanding review work are included separately. Dismissed findings and stale decisions/notes are not promoted to current fixes. A 64-KiB content budget is disclosed if reached. Preview the exact brief before sharing. Revu does not invoke an agent or transmit the brief.

## Demonstration

The `.demo/team-review` fixture contains two changed files and three intended flags:

1. `getOrder(id, actor)` becomes `getOrder(actor, id)` while its route and test callers remain unchanged.
2. Its SQL still uses a bound ID parameter, but the tenant predicate disappears. Query parameterization alone does not preserve tenant isolation.
3. A payment call loses its idempotency option while retaining server-calculated pricing.

Open **Scan workspace → Run local scan**, inspect the exported-contract flag, find references, open the unchanged route, and return. Record a **Needs fix** reason. Open **Review summary** and preview/download the brief. The sample tests are illustrative source; they are not a runnable suite or claimed executed evidence.

## Basis for the verification guidance

- [OWASP Multi-Tenant Application Security](https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html) distinguishes query parameterization from cross-tenant authorization and discusses tenant isolation boundaries.
- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests) documents keys used to recognize repeated requests. The Revu rule remains a generic pattern: inspect the actual provider and deduplication design.

## What to validate with buyers

Have pilot users bring real changes and compare their normal review with Revu. Record useful versus dismissed flags, time to identify an affected caller, whether the fix brief is used, and whether users return for another review. Do not advertise a time-saving percentage or detection advantage before measuring it. GitHub import/submission, semantic cross-file analysis, executed verification, signing, licensing, support, and commercial packaging remain separate work.
