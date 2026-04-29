# Agent instructions

## GitHub operations

When modifying GitHub issues, pull requests, comments, or Projects from this repository, use the `GITHUB_PAT` environment secret as the GitHub token.

Examples:

- `GH_TOKEN="$GITHUB_PAT" gh issue view 2 --repo TbLtzk/dapp`
- `GH_TOKEN="$GITHUB_PAT" gh api graphql ...`

Do not rely on the default `gh` authentication for GitHub writes. It may only have read or metadata access.

## Starting issues

When an agent is told to work on an issue:

- Read the issue body and all issue comments before selecting, planning, or starting work. Treat comments from maintainers/owners as part of the issue requirements and reflect them in planning, implementation, and testing.
- If the issue is not in `Ready`, explain that the issue is not marked as ready and ask whether to start anyway.
- If the issue is already assigned to someone else, explain who is working on it and ask whether to reassign it and start anyway.
- If the issue is in `Ready`, acknowledge it, assign it to the agent where possible, move it to `In progress`, and start working on the issue.

## Completing issues

When an agent considers its assigned issue complete:

- Mark the pull request as ready for review.
- Comment on the issue with a link to the pull request, or explain why the issue is complete without a pull request.
- Move the issue to `In review` on the project board.
