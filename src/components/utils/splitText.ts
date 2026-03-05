import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedElement extends HTMLElement {
  _charSpans?: HTMLSpanElement[];
  _anim?: gsap.core.Animation;
}

/**
 * Wraps each character/word of an element in a <span> for animation.
 * Returns the spans created.
 */
function wrapChars(el: AnimatedElement): HTMLSpanElement[] {
  // Revert previous split if any
  if (el._charSpans) {
    const original = el._charSpans.map((s) => s.textContent).join("");
    el.innerHTML = original;
    el._charSpans = undefined;
  }
  const text = el.innerText;
  el.innerHTML = "";
  const spans: HTMLSpanElement[] = [];
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = char === " " ? "\u00A0" : char;
    el.appendChild(span);
    spans.push(span);
  });
  el._charSpans = spans;
  return spans;
}

function wrapWords(el: AnimatedElement): HTMLSpanElement[] {
  if (el._charSpans) {
    const original = el._charSpans.map((s) => s.textContent + " ").join("").trim();
    el.innerHTML = original;
    el._charSpans = undefined;
  }
  const text = el.innerText;
  el.innerHTML = "";
  const spans: HTMLSpanElement[] = [];
  text.split(" ").forEach((word, i, arr) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
    el.innerHTML = "";
    el.appendChild(span);
    spans.push(span);
  });
  el._charSpans = spans;
  return spans;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  // Animate paragraphs word-by-word
  const paras = document.querySelectorAll<AnimatedElement>(".para");
  paras.forEach((para) => {
    para.classList.add("visible");
    if (para._anim) {
      para._anim.progress(1).kill();
    }
    const wordSpans = wrapWords(para);
    para._anim = gsap.fromTo(
      wordSpans,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  // Animate titles character-by-character
  const titles = document.querySelectorAll<AnimatedElement>(".title");
  titles.forEach((title) => {
    if (title._anim) {
      title._anim.progress(1).kill();
    }
    const charSpans = wrapChars(title);
    title._anim = gsap.fromTo(
      charSpans,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
