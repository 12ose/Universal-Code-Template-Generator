import React from "react";
import styles from "./TemplateResult.module.css";

export default function TemplateResult({ result }) {
  if (!result) return null;
  return (
    <div className={styles.resultBox}>
      <h3>Generated Template ({result.language}):</h3>
      <pre className={styles.code}>{result.template}</pre>
    </div>
  );
}
