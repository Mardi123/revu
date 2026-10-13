# Revu Web

Open https://mardi123.github.io/revu/app/ in a modern browser. Choose **Try the sample review** for an immediate example, or import your own material. The Go review engine runs in a WebAssembly worker on your device.

1. Export a text diff: `git diff --no-ext-diff --no-renames HEAD > changes.diff`. This compares the working tree to HEAD and excludes untracked files.
2. Select the `.diff` or `.patch` file, or paste its contents.
3. Optionally select the matching current source folder. Paths are relative to that folder; include unchanged callers, tests, and project instructions for richer investigation. Individual file selection uses filenames without folder structure.
4. Open the workspace, scan changes, investigate each signal, record decisions and evidence, and export a fix brief.
5. Use **Export review backup** before refreshing, closing the tab, or opening another review. Restore that JSON from the start screen to continue later. Backups contain code and notes: keep them private.

The review queue, notes, checklists, decisions, fix briefs, context optimizer, primitives, policy studio, symbol outlines, and deployment checklist work against imported material. Token counts are estimates; flags are heuristic signals requiring verification. No model API or agent execution is connected.

Files without a diff are reviewed as current snapshots. Removed-protection checks require a diff. Patch-only reviews cannot show complete source or find references in files that were not imported. Source files supplied alongside a patch must match its current lines. Re-import changed code to update a browser review; there is no automatic watcher.

Limits: 2,000 text source files, 2 MiB per file, 16 MiB total, and a 4 MiB patch covering up to 300 files. File-only reviews accept up to 300 files. Binary, combined-merge, and rename patches are unsupported; export with `--no-renames`. Dependency/build directories and non-UTF-8 or oversized files are skipped with a visible count. The engine loads once per tab (approximately 9 MB download).

Imported code and notes remain in tab memory and are not uploaded. The site has no analytics, accounts, or cloud review storage. Static assets are served by GitHub Pages. Ordinary website requests remain subject to GitHub's policies. Closing or refreshing the tab clears the review unless you export a backup.

Local Git access and authenticated GitHub CLI PR previews require the Windows desktop edition. The browser app does not connect to GitHub credentials, local processes, or a hosted repository server.

## Windows launcher fix in 0.6.0

The previous executable tried to review the current directory when double-clicked. The extracted release directory was not the bundled Git repository, so startup failed and its console disappeared. Version 0.6.0 automatically selects the adjacent `demo-workspace`, chooses a free port, and opens the browser. Startup failures remain visible until Enter is pressed. Extract the entire ZIP and install Git for desktop use; copying the EXE alone does not include the demo. Explicit repository arguments still take precedence.
