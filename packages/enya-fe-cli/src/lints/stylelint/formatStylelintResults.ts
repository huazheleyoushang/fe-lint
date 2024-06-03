import { LintResult } from "stylelint";
import type { ScanResult } from "../../type";


const getStylelintRuleDocUrl = (rule: string): string => {
  const match = rule.match(/^@scss\/(\S+)$/);
  if (match) {
    return `https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/${match[1]}`;
  }

  if (rule !== 'CssSyntaxError') return `https://stylelint.io/user-guide/rules/list/${rule}`;

  return '';
}

export function formatStylelintResults (results: LintResult[], quiet: boolean): ScanResult[] {
  return results.map(({ source, warnings }) => {
    let errorCount = 0;
    let warningCount = 0;

    const messages = warnings.filter((item) => !quiet || item.severity === 'error').map((item) => {
      const { line = 0, column = 0, rule, severity, text } = item;

      if (severity === 'error') {
        errorCount++;
      } else if (severity === 'warning') {
        warningCount++;
      }
      
      return {
        line,
        column,
        rule,
        url: getStylelintRuleDocUrl(rule),
        message: text.replace(/([^ ])\.$/u, '$1').replace(new RegExp(`\\(${rule}\\)`), ''),
        errored: severity === 'error',
      }
    });
    return {
      filePath: source,
      messages,
      errorCount,
      warningCount,
      fixableErrorCount: 0,
      fixableWarningCount: 0,
    }
  })
}