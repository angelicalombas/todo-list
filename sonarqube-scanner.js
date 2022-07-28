const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "3516bbbb66449a78814e2c062d15609270642504",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.tsx,**/index.tsx",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => process.exit()

);

