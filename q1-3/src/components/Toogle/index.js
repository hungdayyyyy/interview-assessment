import { useState, useCallback } from "react";
import { Button, Card, Tag } from "antd";

export default function Toogle() {
  const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => setValue((prev) => !prev), []);
    const reset = useCallback(() => setValue(initialValue), [initialValue]);
    return { value, toggle, reset };
  };

  const {
    value: isDarkMode,
    toggle: toggleDarkMode,
    reset: resetDarkMode,
  } = useToggle(true);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Card>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3>Dark Mode Toggle</h3>
          <Tag color={isDarkMode ? "blue" : "orange"}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Tag>
        </div>

        <p>
          <strong>Purpose:</strong> Switch between dark and light themes
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Button type="primary" onClick={toggleDarkMode}>
            Switch to {isDarkMode ? "Light" : "Dark"} Mode
          </Button>
          <Button onClick={resetDarkMode}>Reset (Dark Mode)</Button>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 8,
            transition: "all 0.3s",
            backgroundColor: isDarkMode ? "#1f1f1f" : "#f5f5f5",
            color: isDarkMode ? "#fff" : "#000",
            border: `1px solid ${isDarkMode ? "#434343" : "#d9d9d9"}`,
          }}
        >
          <p style={{ fontWeight: "bold" }}>
            Current theme: {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </p>
          <p style={{ opacity: 0.75 }}>
            State value: <code>isDarkMode = {String(isDarkMode)}</code>
          </p>
        </div>
      </Card>
    </div>
  );
}
