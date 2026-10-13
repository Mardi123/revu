# Revu developer-preview demo

Actual browser recording of the illustrative sample repository. Narration is synthetic.

## 00:00:00.332 — Review the code your agent changed.

Your coding agent finished the change. Before you merge, what deserves a closer look? Revu gives you a local workspace to inspect the diff, investigate review signals, and prepare clear feedback.

## 00:00:14.533 — Look for protections that disappeared.

Start with a local scan. In this deliberately flawed sample, Revu flags a removed tenant filter, lost payment idempotency, and a changed function contract. Every flag includes evidence and verification steps. These are signals to investigate, not proof of a defect.

## 00:00:33.730 — The risk can sit outside the diff.

The function's argument order changed. Find related callers and tests to inspect code outside the patch. This is a bounded name search, not a semantic call graph. Here, an unchanged caller still passes the arguments in the previous order.

## 00:00:50.646 — Record the reason. Make the next fix clear.

Record a needs fix decision with a concrete reason. Revu keeps that evidence with the current code snapshot. The review summary separates requested fixes from unreviewed signals and outstanding checks, then prepares a focused fix brief for your agent.

## 00:01:06.501 — Give the agent focused context.

Advanced features helps prepare the handoff. Choose the changed files and explicitly select project instructions. Diff hunks and current reviewer notes are batched by file, with stable instructions at the start. Inspect the complete prompt before copying or downloading it.

## 00:01:24.361 — See the estimate before you spend.

Compare compact and full-file estimates, then set a handoff budget. Revu warns near the limit and blocks export when the estimate reaches it. These are rough estimates, not provider billing or a daily spending control. Savings depend on the change.

## 00:01:41.308 — Turn recurring misses into team rules.

Use Policy studio to test a team rule against sample code. Review the match, its impact, and the verification steps. Download the validated configuration and add it to your repository. You can also inspect AI primitives, navigate symbols, and prepare release checklists.

## 00:01:59.924 — Try the free Windows developer preview.

Try Revu's free Windows developer preview. It runs locally and includes this sample repository. This is an unsigned alpha, with heuristic checks and manual agent handoff. Share useful findings and false positives on GitHub to help shape the next release.