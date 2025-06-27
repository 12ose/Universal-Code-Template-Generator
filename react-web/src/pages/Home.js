import React, { useState } from "react";
import TemplateForm from "../components/TemplateForm/TemplateForm";
import TemplateResult from "../components/TemplateResult/TemplateResult";

export default function Home() {
  const [result, setResult] = useState(null);
  return (
    <div>
      <TemplateForm onResult={setResult} />
      <TemplateResult result={result} />
    </div>
  );
}
