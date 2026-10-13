# Review workflow — 0.3 alpha

The previous scan interface put controls, counters, and warnings above a long stack of evidence cards. The first finding could sit below the viewport. Every note required navigating through a second review screen, and the product could not remember whether a flag was useful.

The new flow is **scan → prioritize → inspect → decide → hand off → verify the changed code**.

1. Select **Scan workspace** and run a changes scan. Use repository scope when investigating existing code. The two scopes maintain separate decisions.
2. Start with the prioritized queue. High-impact flags come first; removed protections lead within a severity. These priorities are heuristics, not measured probabilities or confirmed defects.
3. Select a flag. Read the exact evidence and verification steps. **Open code** navigates to the correct old or new line. **Back to review queue** restores the chosen flag and search filter. Unfinished decision text is kept in memory during this navigation.
4. Record **Needs fix** or **Dismiss** with concrete evidence or a reason. Both require at least 12 bytes of explanation. This is a reviewer claim, not a test run. The default queue advances after saving. The state tabs let you revisit or reopen decisions.
5. **Draft a review note** creates an editable, anchored draft directly from a changed-code flag. Save it, then return to triage. Repository-only flags have no diff anchor, so this action is disabled with an explanation.
6. Export the scan report for the complete finding and decision record. Use **Prepare handoff** in the code view for saved review notes and code context. Neither action sends anything to another system.
7. Complete the contextual reviewer checklist for each changed source file. A flag decision, a file marked reviewed, and checklist evidence are independent. None means the code is proven safe.

## Decision integrity

IDs include scope, file path, code fingerprint, and the complete finding definition. The server rechecks the current code and rule when saving. Stale or fabricated findings are rejected. Changed code or a changed rule produces a fresh open flag; old decisions remain in the local store but do not suppress the new flag. Reverting to the identical snapshot and definition can restore its original decision.

Saved decisions survive a server restart. Unfinished decision text is held only in the browser page and triggers an unload warning; it is not a saved decision. A new scan discards unfinished entries that no longer match its findings. The store limits historical decisions to 10,000 and returns an explicit error when a new entry would exceed that cap.

## Design changes

- Compact workspace heading and review counters; larger navigation and evidence text.
- Scan mode hides the notes column and removes irrelevant split/unified controls.
- A compact finding list sits beside one evidence panel on desktop and above it on narrow screens.
- Potential impact and signal type are separate. Removed protection, pattern match, team policy, and context check each describe what the scanner actually observed.
- Incomplete scans, skipped files, and invalid team policies retain visible coverage warnings.
- Direct note drafting and an explicit return action preserve the review context.

## Remaining product work

This describes the 0.3 workflow. Version 0.4 extends it to 21 lexical families, related-name references, and a summary/fix brief; see [the current capabilities and exact limits](TEAM-REVIEW.md). AST/data-flow analysis and accuracy measurement on labeled real changes remain future work.

Commercial differentiation and willingness to pay remain unvalidated. GitHub ingestion, semantic cross-file reasoning, verified test execution, and signed distribution remain future work.
