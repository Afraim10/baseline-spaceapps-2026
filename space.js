(() => {
  "use strict";

  const root = document.documentElement;
  const canvas = document.getElementById("starfield");
  const context = canvas.getContext("2d");
  const toggle = document.getElementById("toggle-effects");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const startedAt = Date.now();
  const animations = new Set();
  let effectsEnabled = true;
  let frame = 0;
  let scrollFrame = 0;
  let lastPaint = 0;
  let width = 0;
  let height = 0;
  let stars = [];
  const pointer = { x: 0, y: 0 };

  function active() {
    return effectsEnabled && !reduced.matches && !document.hidden;
  }

  function paint(time = 0) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    const moving = active();
    const seconds = moving ? time / 1000 : 0;
    for (const star of stars) {
      const x = (star.x * width + (moving ? pointer.x * star.depth * 12 : 0) + width) % width;
      const offset = moving ? seconds * star.depth * 1.1 - window.scrollY * star.depth * 0.025 + pointer.y * star.depth * 8 : 0;
      const y = ((star.y * height + offset) % height + height) % height;
      context.globalAlpha = moving ? star.opacity * (0.72 + Math.sin(seconds * 0.7 + star.phase) * 0.28) : star.opacity;
      context.fillStyle = star.color;
      context.fillRect(x, y, star.size, star.size);
      if (star.size > 1.3) {
        context.globalAlpha *= 0.35;
        context.fillRect(x - 2, y, star.size + 4, 0.5);
        context.fillRect(x, y - 2, 0.5, star.size + 4);
      }
    }
    context.globalAlpha = 0.08;
    context.strokeStyle = "#8DE5F0";
    context.lineWidth = 0.6;
    context.beginPath();
    for (let index = 0; index < 7 && index < stars.length; index += 1) {
      const star = stars[index];
      const x = star.x * width;
      const y = star.y * height;
      if (index) context.lineTo(x, y);
      else context.moveTo(x, y);
    }
    context.stroke();
    if (moving) {
      const streak = seconds % 24;
      if (streak < 0.9) {
        const progress = streak / 0.9;
        const x = width * (0.15 + progress * 0.4);
        const y = height * (0.08 + progress * 0.2);
        const gradient = context.createLinearGradient(x - 65, y - 28, x, y);
        gradient.addColorStop(0, "rgba(141,229,240,0)");
        gradient.addColorStop(1, "rgba(220,242,255,0.8)");
        context.globalAlpha = Math.sin(progress * Math.PI) * 0.65;
        context.strokeStyle = gradient;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x - 65, y - 28);
        context.lineTo(x, y);
        context.stroke();
      }
    }
    context.globalAlpha = 1;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, width < 700 ? 1 : 1.5);
    canvas.width = Math.ceil(width * ratio);
    canvas.height = Math.ceil(height * ratio);
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: width < 700 ? 160 : 380 }, (_, index) => ({
      x: Math.random(), y: Math.random(), depth: 0.2 + Math.random() * 0.8,
      size: 0.5 + Math.random(), opacity: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      color: index % 17 === 0 ? "#BFA7F5" : index % 13 === 0 ? "#8DE5F0" : "#DBE8F8"
    }));
    paint(performance.now());
  }

  function loop(time) {
    frame = 0;
    if (!active()) return;
    if (time - lastPaint > (width < 700 ? 45 : 33)) {
      paint(time);
      lastPaint = time;
    }
    frame = window.requestAnimationFrame(loop);
  }

  function scroll() {
    scrollFrame = 0;
    const total = Math.max(1, root.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / total));
    document.getElementById("page-progress-fill").style.transform = `scaleX(${progress})`;
    root.style.setProperty("--space-shift", active() ? `${-window.scrollY * 0.035}px` : "0px");
    root.style.setProperty("--hero-shift", active() ? `${Math.min(window.scrollY, 800) * 0.09}px` : "0px");
  }

  function updateEffects() {
    const enabled = active();
    root.classList.toggle("motion-ready", enabled);
    root.classList.toggle("effects-paused", !enabled);
    toggle.disabled = reduced.matches;
    toggle.setAttribute("aria-pressed", String(effectsEnabled && !reduced.matches));
    toggle.textContent = reduced.matches ? "Reduced motion" : effectsEnabled ? "Pause effects" : "Enable effects";
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    for (const animation of animations) animation.cancel();
    animations.clear();
    scroll();
    paint(performance.now());
    if (enabled) frame = window.requestAnimationFrame(loop);
  }

  function animate(node, keyframes, options) {
    if (!node || !active()) return;
    const animation = node.animate(keyframes, options);
    animation.id = "baseline-packet";
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
  }

  window.addEventListener("baseline:packet", (event) => {
    for (const animation of animations) animation.cancel();
    animations.clear();
    event.detail.ids.forEach((id, index) => {
      const card = document.getElementById(`card-${id}`);
      const chip = document.getElementById(`channel-${id}`);
      const beacon = document.querySelector(`.orbit-beacon[data-indicator="${id}"]`);
      const color = getComputedStyle(card).getPropertyValue("--channel-color").trim() || "#8DE5F0";
      const timing = { duration: 650, delay: index * 55, easing: "cubic-bezier(0.2,0.8,0.2,1)" };
      // Animate arrival, never interpolate values that were not measured or replayed.
      animate(card.querySelector(".measurement-value"), [
        { opacity: 0.4, transform: "translateY(7px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], timing);
      for (const node of [card, chip, beacon]) {
        const resting = getComputedStyle(node).boxShadow;
        const shadow = resting === "none" ? "" : `${resting}, `;
        animate(node, [
          { boxShadow: `${shadow}0 0 0 1px ${color}, 0 0 30px ${color}33` },
          { boxShadow: resting }
        ], { ...timing, duration: 1100 });
      }
      for (const line of card.querySelectorAll(".sample-figure .trend-line")) {
        const length = line.getTotalLength();
        if (length) animate(line, [
          { strokeDasharray: `${length} ${length}`, strokeDashoffset: length },
          { strokeDasharray: `${length} ${length}`, strokeDashoffset: 0 }
        ], { ...timing, duration: 800 });
      }
    });
  });

  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-revealed");
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.06, rootMargin: "0px 0px 30px 0px" });
  document.querySelectorAll("[data-reveal]").forEach((node, index) => {
    node.style.setProperty("--reveal-delay", `${index % 3 * 70}ms`);
    reveal.observe(node);
  });

  document.addEventListener("focusin", (event) => {
    let node = event.target.closest("[data-reveal]");
    while (node) {
      node.classList.add("is-revealed");
      node = node.parentElement?.closest("[data-reveal]");
    }
  });

  const navigation = [...document.querySelectorAll(".site-navigation a")];
  const sections = navigation.map((link) => document.querySelector(link.getAttribute("href")));
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navigation) {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-current", current);
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-12% 0px -55% 0px", threshold: 0 });
  for (const section of sections) sectionObserver.observe(section);

  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(scroll);
  }, { passive: true });
  window.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || !active()) return;
    pointer.x = event.clientX / Math.max(1, width) - 0.5;
    pointer.y = event.clientY / Math.max(1, height) - 0.5;
    root.style.setProperty("--orbit-tilt", `${pointer.x * 5}deg`);
  }, { passive: true });
  window.addEventListener("resize", () => { resize(); scroll(); });
  document.addEventListener("visibilitychange", updateEffects);
  reduced.addEventListener("change", updateEffects);
  toggle.addEventListener("click", () => { effectsEnabled = !effectsEnabled; updateEffects(); });

  window.setInterval(() => {
    if (!active()) return;
    const seconds = Math.floor((Date.now() - startedAt) / 1000);
    document.getElementById("session-clock").textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }, 1000);
  resize();
  updateEffects();
})();
