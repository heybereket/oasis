export const vscodify = (content: string) =>
  content.replace(
    '</body>',
    `
        <script>

        window.addEventListener("DOMContentLoaded", () => {

          document.body.style.backgroundColor = "var(--vscode-editor-background)";

          document.querySelector(".lh-topbar").style.display = "none";

          const stickyHeader = document.querySelector("body > main > div.lh-container.lh-screenshot-overlay--enabled > div.lh-sticky-header");

          stickyHeader.style.backgroundColor = "var(--vscode-sideBarSectionHeader-background)";
          stickyHeader.style.top = "0";

        });
        </script>
        </body>
      `
  );
