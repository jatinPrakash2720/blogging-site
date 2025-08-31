// --- UI Primitives ---
import React from "react";
import { Button } from "@/components/tiptap-ui-primitive/button";

// --- Icons ---
import { MoonStarIcon } from "@/components/tiptap-icons/moon-star-icon";
import { SunIcon } from "@/components/tiptap-icons/sun-icon";

export function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    const editorWrapper = document.querySelector(".editor-wrapper");
    if (editorWrapper) {
      editorWrapper.classList.toggle("editor-dark", isDarkMode);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <Button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      data-style="ghost"
      className="theme-toggle-button"
    >
      {isDarkMode ? (
        <MoonStarIcon className="tiptap-button-icon" />
      ) : (
        <SunIcon className="tiptap-button-icon" />
      )}
    </Button>
  );
}
