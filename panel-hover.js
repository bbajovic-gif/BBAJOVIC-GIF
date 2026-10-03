(() => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const panels = document.querySelectorAll("[data-panel-hover]");

  panels.forEach((panel) => {
    const reset = () => {
      panel.style.setProperty("--pointer-x", "50%");
      panel.style.setProperty("--pointer-y", "35%");
      panel.style.setProperty("--rotate-x", "0deg");
      panel.style.setProperty("--rotate-y", "0deg");
    };

    panel.addEventListener("pointermove", (event) => {
      if (!finePointer.matches) return;

      const rect = panel.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

      const dx = x - 0.5;
      const dy = y - 0.5;

      panel.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
      panel.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
      panel.style.setProperty("--rotate-x", `${(-dy * 3).toFixed(2)}deg`);
      panel.style.setProperty("--rotate-y", `${(dx * 3.5).toFixed(2)}deg`);
    });

    panel.addEventListener("pointerleave", reset);
    reset();
  });
})();
