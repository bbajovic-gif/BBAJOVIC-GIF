(() => {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const cards = document.querySelectorAll("[data-bbaya-card]");

  cards.forEach((card) => {
    const reset = () => {
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "35%");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    card.addEventListener("pointermove", (event) => {
      if (!finePointer.matches) return;

      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

      const dx = x - 0.5;
      const dy = y - 0.5;

      card.style.setProperty("--mouse-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--mouse-y", `${(y * 100).toFixed(1)}%`);
      card.style.setProperty("--tilt-x", `${(-dy * 2.8).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(dx * 3.2).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", reset);
    card.addEventListener("blur", reset, true);
    reset();
  });
})();
