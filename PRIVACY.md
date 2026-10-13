# Revu preview data handling

The Windows application reads the local Git repository you select and saves review state as plaintext in your operating-system user-config directory, normally `%APPDATA%\revu`. The bundled demo uses an illustrative repository. The process listens on `127.0.0.1`, not a public network interface. Do not expose this local server through a public tunnel.

The browser app downloads its compiled engine and static assets from GitHub Pages. Imported files, diffs, and review state stay in tab memory. Refreshing or closing the tab clears them. Exported backups contain the imported code and notes; store them privately. Browser imports are not uploaded, and there is no cloud storage or automatic persistence.

GitHub PR imports make explicit, read-only API requests directly from the browser to api.github.com to retrieve PR metadata, diff content, source blobs, and optional related context. Public PRs need no token. An optional private-repository token is held only during the import and sent in GitHub Authorization headers; it is never saved to browser storage, sent to a Revu server, or included in a review backup. GitHub processes these requests under its own policies. The PR title, link, and commit IDs are included in the local review backup.

There is no Revu telemetry, account, or model API call in the browser or Windows preview. Copying or downloading a handoff creates material you can choose to share. When you explicitly load a GitHub PR preview, the installed GitHub CLI uses your existing authentication to contact GitHub. It does not upload the local repository. Your use of GitHub and any external coding agent is subject to those providers' policies.

The public website, releases, and feedback repository are hosted on GitHub. GitHub may process ordinary request and account data under its own policies. The website includes no analytics scripts, advertising, tracking pixels, or form collection. Its video and images are hosted with the website.

GitHub issues are public. Do not include private source, session URLs, credentials, personal data, or customer data. Use a small synthetic reproduction. For a suspected vulnerability, use the private reporting option when available; do not publish exploit details in an ordinary issue.

Close Revu before deleting local review-state files. Deleting those files removes your saved local review decisions and notes; downloaded exports must be managed separately.
