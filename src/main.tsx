import { createRoot } from "react-dom/client";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const appElement = document.getElementById("app");
if (appElement) {
  const root = createRoot(appElement);
  root.render(<h1>Hello, world</h1>);
}
