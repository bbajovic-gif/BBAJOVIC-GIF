(() => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const panels = document.querySelectorAll("[data-bbaya-panel]");

  panels.forEach((panel) => {
    const reset = () => {
      panel.style.setProperty("--pointer-x", "50%");
      panel.style.setProperty("--pointer-y", "35%");
      panel.style.setProperty("--tilt-x", "0deg");
      panel.style.setProperty("--tilt-y", "0deg");
      panel.style.setProperty("--art-x", "0px");
      panel.style.setProperty("--art-y", "0px");
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

      /* Deliberately restrained: cinematic, not a wobbling card. */
      panel.style.setProperty("--tilt-x", `${(-dy * 3.2).toFixed(2)}deg`);
      panel.style.setProperty("--tilt-y", `${(dx * 3.8).toFixed(2)}deg`);

      panel.style.setProperty("--art-x", `${(dx * 8).toFixed(2)}px`);
      panel.style.setProperty("--art-y", `${(dy * 6).toFixed(2)}px`);
    });

    panel.addEventListener("pointerleave", reset);
    panel.addEventListener("blur", reset, true);
    reset();
  });
})();
