# Revu preview data handling

The Windows application reads the local Git repository you select and saves review state as plaintext in your operating-system user-config directory, normally `%APPDATA%\revu`. The bundled demo uses an illustrative repository. The process listens on `127.0.0.1`, not a public network interface. Do not expose this local server through a public tunnel.

There is no Revu telemetry, account, or model API call in version 0.5.0. Copying or downloading a handoff creates material you can choose to share. When you explicitly load a GitHub PR preview, the installed GitHub CLI uses your existing authentication to contact GitHub. It does not upload the local repository. Your use of GitHub and any external coding agent is subject to those providers' policies.

The public website, releases, and feedback repository are hosted on GitHub. GitHub may process ordinary request and account data under its own policies. The website includes no analytics scripts, advertising, tracking pixels, or form collection. Its video and images are hosted with the website.

GitHub issues are public. Do not include private source, session URLs, credentials, personal data, or customer data. Use a small synthetic reproduction. For a suspected vulnerability, use the private reporting option when available; do not publish exploit details in an ordinary issue.

Close Revu before deleting local review-state files. Deleting those files removes your saved local review decisions and notes; downloaded exports must be managed separately.
