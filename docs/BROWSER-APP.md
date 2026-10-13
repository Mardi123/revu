# Revu Web

Open https://mardi123.github.io/revu/app/ in a modern browser. Paste a GitHub pull request link and choose **Open GitHub review**. Public PRs need no token. Choose **Try the sample review** for an immediate example. The Go review engine runs in a WebAssembly worker on your device.

## Open a GitHub pull request

Revu fetches PR details, every changed-file page, the text diff, and current source pinned by Git blob SHA. It optionally finds up to 12 related tests and project instruction files at the PR head. The title, original PR link, and reviewed head commit remain visible; backups retain that provenance. Exports identify the PR and commit. Opening the PR again fetches a fresh review; changes are not watched automatically.

For private repositories or higher API limits, expand **Private repository or higher API limits?** and supply a fine-grained token with **Contents: Read-only** and **Pull requests: Read-only** for the selected repository. Organization approval and access to a fork may be required. This preview uses a token input, not OAuth sign-in. The token is sent only in the Authorization header to `https://api.github.com`, for this import. It is cleared from the input when fetching starts, never persisted, and excluded from exports/backups. API requests are GET-only and redirects are rejected.

The importer verifies the PR head, base, file count, and update time again after downloading. A moving PR or incomplete/truncated diff is rejected without replacing an existing review. Public GitHub API quotas can be exhausted; the UI explains quota and permission failures. Optional context is bounded and selected by filename: search covers only fetched files, not the full repository or a semantic dependency graph.

GitHub imports support up to 300 changed text files, 4 MiB of diff, and 16 MiB of source (2 MiB per file). Binary, missing/truncated patches, non-UTF-8 source, pure renames, mode-only changes, and empty-file-only changes are rejected explicitly; they are not silently marked reviewed. Renames with textual changes are reviewed under the current filename.

GitHub documents [browser CORS](https://docs.github.com/en/rest/using-the-rest-api/using-cors-and-jsonp-to-make-cross-origin-requests), [PR metadata and files](https://docs.github.com/en/rest/pulls/pulls), and [source blobs](https://docs.github.com/en/rest/git/blobs).

## Import local material instead

Expand **Import local files or a diff instead**.

1. Export a text diff: `git diff --no-ext-diff --no-renames HEAD > changes.diff`. This compares the working tree to HEAD and excludes untracked files.
2. Select the `.diff` or `.patch` file, or paste its contents.
3. Optionally select the matching current source folder. Paths are relative to that folder; include unchanged callers, tests, and project instructions for richer investigation. Individual file selection uses filenames without folder structure.
4. Open the workspace, scan changes, investigate each signal, record decisions and evidence, and export a fix brief.
5. Use **Export review backup** before refreshing, closing the tab, or opening another review. Restore that JSON from the start screen to continue later. Backups contain code and notes: keep them private.

The review queue, notes, checklists, decisions, fix briefs, context optimizer, primitives, policy studio, symbol outlines, and deployment checklist work against imported material. Token counts are estimates; flags are heuristic signals requiring verification. No model API or agent execution is connected.

Files without a diff are reviewed as current snapshots. Removed-protection checks require a diff. Patch-only reviews cannot show complete source or find references in files that were not imported. Source files supplied alongside a patch must match its current lines. Re-import changed code to update a browser review; there is no automatic watcher.

Limits: 2,000 text source files, 2 MiB per file, 16 MiB total, and a 4 MiB patch covering up to 300 files. File-only reviews accept up to 300 files. Binary, combined-merge, and rename patches are unsupported; export with `--no-renames`. Dependency/build directories and non-UTF-8 or oversized files are skipped with a visible count. The engine loads once per tab (approximately 9 MB download).

Imported code and notes remain in tab memory and are not uploaded. The site has no analytics, accounts, or cloud review storage. Static assets are served by GitHub Pages. Ordinary website requests remain subject to GitHub's policies. Closing or refreshing the tab clears the review unless you export a backup.

Local Git access and authenticated GitHub CLI PR previews require the Windows desktop edition. The browser app uses the GitHub REST API directly for PR imports; it does not run local processes or use a Revu repository server.

## Windows launcher fix in 0.6.0

The previous executable tried to review the current directory when double-clicked. The extracted release directory was not the bundled Git repository, so startup failed and its console disappeared. Version 0.6.0 automatically selects the adjacent `demo-workspace`, chooses a free port, and opens the browser. Startup failures remain visible until Enter is pressed. Extract the entire ZIP and install Git for desktop use; copying the EXE alone does not include the demo. Explicit repository arguments still take precedence.
