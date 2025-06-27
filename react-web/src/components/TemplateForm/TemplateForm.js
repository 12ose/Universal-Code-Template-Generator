import React, { useState } from "react";
import styles from "./TemplateForm.module.css";
import { generateTemplate } from "../../api/templateApi";

const defaultParam = { name: "", type: "" };
const languages = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "JavaScript", value: "javascript" },
];

const dslTypes = [
  { label: "int (32-bit integer)", value: "int" },
  { label: "long (64-bit integer)", value: "long" },
  { label: "float (32-bit float)", value: "float" },
  { label: "double (64-bit float)", value: "double" },
  { label: "bool (Boolean)", value: "bool" },
  { label: "string (UTF-8 string)", value: "string" },
  { label: "int[] (Array of int)", value: "int[]" },
  { label: "string[] (Array of string)", value: "string[]" },
  { label: "List<int> (List of int)", value: "List<int>" },
  { label: "List<string> (List of string)", value: "List<string>" },
  { label: "List<int[]> (List of int[])", value: "List<int[]>" },
  { label: "List<string[]> (List of string[])", value: "List<string[]>" },
  { label: "Tree<int> (Binary tree node)", value: "Tree<int>" },
  { label: "Tree (Binary tree node)", value: "Tree" },
  { label: "Graph (Adjacency list map)", value: "Graph" },
];

export default function TemplateForm({ onResult }) {
  const [form, setForm] = useState({
    question_id: "",
    title: "",
    description: "",
    signature: {
      function_name: "",
      parameters: [{ ...defaultParam }],
      returns: [{ name: "", type: "" }],
    },
    language: "python",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("param-")) {
      const [_, idx, field] = name.split("-");
      const params = [...form.signature.parameters];
      params[+idx][field] = value;
      setForm({
        ...form,
        signature: { ...form.signature, parameters: params },
      });
    } else if (name.startsWith("return-")) {
      const [_, idx, field] = name.split("-");
      const returns = [...form.signature.returns];
      returns[+idx][field] = value;
      setForm({
        ...form,
        signature: { ...form.signature, returns },
      });
    } else if (name === "function_name") {
      setForm({
        ...form,
        signature: { ...form.signature, function_name: value },
      });
    } else if (name === "language") {
      setForm({ ...form, language: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addParam = () => {
    setForm({
      ...form,
      signature: {
        ...form.signature,
        parameters: [...form.signature.parameters, { ...defaultParam }],
      },
    });
  };

  const removeParam = (idx) => {
    const params = form.signature.parameters.filter((_, i) => i !== idx);
    setForm({ ...form, signature: { ...form.signature, parameters: params } });
  };

  const addReturn = () => {
    setForm({
      ...form,
      signature: {
        ...form.signature,
        returns: [...form.signature.returns, { name: "", type: "" }],
      },
    });
  };

  const removeReturn = (idx) => {
    const returns = form.signature.returns.filter((_, i) => i !== idx);
    setForm({ ...form, signature: { ...form.signature, returns } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const returns =
        form.signature.returns.length === 1
          ? { type: form.signature.returns[0].type }
          : form.signature.returns.map((r) => ({ name: r.name, type: r.type }));
      const payload = {
        ...form,
        signature: {
          ...form.signature,
          returns,
        },
      };
      const result = await generateTemplate(payload);
      onResult(result);
    } catch (err) {
      setError(err.response?.data?.error || "Error generating template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Universal Code Template Generator</h2>
        <div className={styles.section}>
          <h3>Question Details</h3>
          <label htmlFor="question_id">Question ID</label>
          <input
            id="question_id"
            name="question_id"
            value={form.question_id}
            onChange={handleChange}
            required
            placeholder="e.g. two-sum"
            aria-label="Question ID"
          />
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Two Sum"
            aria-label="Title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Describe the problem statement..."
            rows={3}
            aria-label="Description"
          />
        </div>
        <div className={styles.section}>
          <h3>Function Signature</h3>
          <label htmlFor="function_name">Function Name</label>
          <input
            id="function_name"
            name="function_name"
            value={form.signature.function_name}
            onChange={handleChange}
            required
            placeholder="e.g. twoSum"
            aria-label="Function Name"
          />
          <label>Parameters</label>
          {form.signature.parameters.map((param, idx) => (
            <div key={idx} className={styles.paramRow}>
              <input
                name={`param-${idx}-name`}
                placeholder="name"
                value={param.name}
                onChange={handleChange}
                required
                aria-label={`Parameter ${idx + 1} Name`}
              />
              <select
                name={`param-${idx}-type`}
                value={param.type}
                onChange={handleChange}
                required
                aria-label={`Parameter ${idx + 1} Type`}
              >
                <option value="" disabled>
                  Select type
                </option>
                {dslTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {form.signature.parameters.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeParam(idx)}
                  aria-label="Remove Parameter"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addBtn}
            onClick={addParam}
            aria-label="Add Parameter"
          >
            + Add Parameter
          </button>
          <label>Return Value(s)</label>
          {form.signature.returns.map((ret, idx) => (
            <div key={idx} className={styles.paramRow}>
              <input
                name={`return-${idx}-name`}
                placeholder="name (for multiple returns)"
                value={ret.name}
                onChange={handleChange}
                required={form.signature.returns.length > 1}
                disabled={form.signature.returns.length === 1}
                aria-label={`Return ${idx + 1} Name`}
              />
              <select
                name={`return-${idx}-type`}
                value={ret.type}
                onChange={handleChange}
                required
                aria-label={`Return ${idx + 1} Type`}
              >
                <option value="" disabled>
                  Select type
                </option>
                {dslTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {form.signature.returns.length > 1 && (
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeReturn(idx)}
                  aria-label="Remove Return Value"
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addBtn}
            onClick={addReturn}
            aria-label="Add Return Value"
          >
            + Add Return Value
          </button>
        </div>
        <div className={styles.section}>
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={form.language}
            onChange={handleChange}
            aria-label="Language"
          >
            {languages.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
          aria-label="Generate Template"
        >
          Generate Template
        </button>
        {loading && <p>Generating...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
