# Revu — free developer preview

**A thoughtful review between your coding agent and your next merge.**

Revu is a local code-review workspace for AI-assisted development. Inspect changes, investigate potential regressions, record evidence, and prepare focused feedback for your coding agent.

- [Website and narrated demo](https://mardi123.github.io/revu/)
- [Download Windows x64 v0.6.0](https://github.com/Mardi123/revu/releases/tag/v0.6.0)
- [Report a bug or false positive](https://github.com/Mardi123/revu/issues/new/choose)

This public repository contains the website, documentation, and release downloads. **The application source stays private.** The downloadable preview is free under [preview terms](PREVIEW-TERMS.md).

## Start in your browser

Open [Revu Web](https://mardi123.github.io/revu/app/) and paste a GitHub pull request link. Revu automatically fetches its metadata, diff, and changed source. Public PRs need no token; private repositories accept a read-only token for the current import. Manual files/diffs and the included sample remain available. The same Go review engine runs in WebAssembly on your device. No account or installation is required, and imported code is not uploaded.

Use a diff plus matching current source files for full-source navigation, related callers, primitives, and context estimates. File-only imports are current snapshots and cannot detect removed protections. Re-import changed code to update the review. Export a review backup before refreshing or closing the tab; the backup contains your code and notes. See [browser guide](docs/BROWSER-APP.md).

## Windows desktop

1. Install [Git for Windows](https://git-scm.com/downloads/win).
2. Download `revu-0.6.0-windows-x64.zip` from the release and extract the entire archive.
3. Double-click `revu.exe` after extracting the entire ZIP. It opens the bundled demo in your default browser and chooses a free local port. Keep the printed session URL private. `Launch-demo.cmd` also works.
4. Try **Scan workspace → Run local scan** on the included deliberately flawed sample.
5. Keep the terminal open; Ctrl+C stops the app.

For your own repository, open PowerShell in the extracted directory:

```powershell
.\revu.exe --open --port 0 C:\path\to\your\repository
```

The repository needs an initial commit. Revu compares HEAD with staged, unstaged, and untracked working-tree changes. For committed branch changes, pass an explicit `--base` revision; this is a direct comparison, not automatic PR merge-base calculation.

## What you can try

- 21 bounded, heuristic review-rule families with evidence and verification guidance.
- Removed tenant guards, idempotency protection, and changed exported JS/TS signature checks.
- Name-reference lookup in unchanged callers and tests; not a semantic call graph.
- Persistent local review decisions, anchored notes, checklists, and fix briefs.
- Advanced features: context/token estimates, explicit AI primitive inclusion, policy studio, regex symbol outlines, deployment checklists, and read-only GitHub PR preview through `gh`.

## Know the preview limits

The desktop build is Windows x64 only and unsigned; the browser app requires a modern WebAssembly-capable browser. Windows may show an unknown-publisher warning. Verify the official download and published SHA-256 before deciding whether to run it; Revu does not ask you to disable system protections.

Flags are not confirmed defects or a complete security audit. Context token counts are estimates, not actual provider billing. No agent executes automatically. Revu does not submit GitHub reviews, edit source, stage, commit, push, or deploy. The browser app analyzes explicit imports; GitHub PR imports work directly in the browser through the REST API; local Git comparisons and GitHub CLI preview require the desktop app. Neither edition watches files automatically. See [feature details](docs/ADVANCED-FEATURES.md) and [data handling](PRIVACY.md).

## Demo

The approximately two-minute video records real interactions with the included illustrative repository. Narration is synthetic. Download the MP4 and subtitle files from the [v0.5.0 demo release](https://github.com/Mardi123/revu/releases/tag/v0.5.0) to attach to your own demo. Screens and findings are examples, not customer results or an accuracy benchmark.

## Useful feedback

Tell us your operating system, file/language type, what you expected, and what happened. For a false positive, include a minimal synthetic code example and the rule name. Do not share private code, access tokens, or customer data in public issues.
