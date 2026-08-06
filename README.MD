# Instructions and Notes

## In this session...

Let's create the following folder structure:

```sh
PLAYWRIGHT-E2E-TESTS/| I
-.github/ # CI Config folder
— .vscode/ # Editor-specific settings
--mcp.json # MCP server config for VS Code
-config/ # Environment-specific config files
data/ # Static data and constants
--constants.json # Common constants used in tests
debug/ # Optional: Debug-related outputs/logs
- logs/ # Application/test logs
node_modules/ # Auto-generated dependencies
playwright-report/ # Playwright HTML test report output
-resources/ # Misc test resources (e.g. images, files)
tests/ # All organized test files
--api/ # API test specs
--demo/ # Demo-related test specs
--devices/ # Device related scenarios
--e2e/ # End-to-end test specs
--functional/ # Functional test cases
--helpers/ # Utility functions for tests
--page-objects/ # Page Object Model files
-tests-examples/ # Auto-generated sample test scenarios
.env.example # Template for environment files
- .gitignore # Git ignored files and folders
package-lock.json # Dependency lock file
package.json # Project and scripts
playwright.config.ts # Playwright configuration file
README.md # Project overview and instructions

//git url
https://github.com/baranikumar4464-eng/playwright-e2e-tests.git

# Instructions and Notes

## In this session ...

** Setup Git Repo **
1. Git commands
git init
git status
git add .
git commit -m "<commit-message>"

2. git ignore the following files
- /debug
- logs/
- .env
- allure-results
- tests-examples/
- example .*
*. log

definitions of leading and trailing slash
node_modules/	any node_modules dir, anywhere
/test-results/	only a test-results dir at repo root
.env	any file/folder named .env, anywhere
/debug	only debug at repo root (file or folder)
*.log	any file ending in .log, anywhere

//commit
** Push Changes to Remote **
1. Git commands
`git branch -M main'
`git remote add origin <remote-url>'
`git remote -v
git push -u origin main"'
2. Issues
`git config -- list
git push -f origin main'-> force push

3. Remember this -'ACP'- 'Add commit push'
```
