import gsap from "gsap";

/**
 * Finds the <span> elements already created by React inside the targeted container.
 */
function getCharSpans(selector: string): HTMLElement[] {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  const spans: HTMLElement[] = [];
  elements.forEach((el) => {
    el.querySelectorAll("span").forEach((span) => {
      spans.push(span);
    });
  });
  return spans;
}

let isInitialFXRun = false;

export function initialFX() {
  if (isInitialFXRun) return;
  isInitialFXRun = true;

  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Animate landing heading characters
  const landingChars = getCharSpans(
    ".landing-info h3, .landing-intro h2, .landing-intro h1"
  );
  gsap.fromTo(
    landingChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // Split texts for caching and loop so we don't duplicate spans later
  const text1Chars = getCharSpans(".landing-h2-info");
  const text2Chars = getCharSpans(".landing-h2-info-1");
  const text3Chars = getCharSpans(".landing-h2-1");
  const text4Chars = getCharSpans(".landing-h2-2");

  // Hide the secondary texts immediately so they don't overlap on load
  gsap.set([text2Chars, text4Chars], { opacity: 0, y: 80 });

  // Animate h2 info chars (First word: Developer)
  gsap.fromTo(
    text1Chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Loop texts
  LoopText(text1Chars, text2Chars);
  LoopText(text3Chars, text4Chars);
}

function LoopText(text1: HTMLElement[], text2: HTMLElement[]) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    text2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      text1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      text2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
