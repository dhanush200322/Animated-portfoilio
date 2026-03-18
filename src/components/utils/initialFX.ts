import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { smoother } from "../Navbar";

// ✅ IMPORTANT: register plugin
gsap.registerPlugin(SplitText);

export function initialFX() {
  const ctx = gsap.context(() => {
    document.body.style.overflowY = "auto";

    if (smoother) smoother.paused(false);

    const main = document.querySelector("main");
    if (main) main.classList.add("main-active");

    // Background animation
    gsap.to("body", {
      backgroundColor: "#0b080c",
      duration: 0.5,
      delay: 1,
    });

    // Common animation config
    const charAnimFrom = { opacity: 0, y: 80, filter: "blur(5px)" };
    const charAnimTo = {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.025,
    };

    const splitConfig = { type: "chars,lines", linesClass: "split-line" };

    // Main text animation
    const landingText = new SplitText(
      [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
      splitConfig
    );

    gsap.fromTo(landingText.chars, charAnimFrom, {
      ...charAnimTo,
      delay: 0.3,
    });

    // Secondary text
    const splitH2 = { type: "chars,lines", linesClass: "split-h2" };

    const landingText2 = new SplitText(".landing-h2-info", splitH2);

    gsap.fromTo(landingText2.chars, charAnimFrom, {
      ...charAnimTo,
      delay: 0.3,
    });

    // Fade elements
    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power1.inOut",
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

    // Loop text setup
    const landingText3 = new SplitText(".landing-h2-info-1", splitH2);
    const landingText4 = new SplitText(".landing-h2-1", splitH2);
    const landingText5 = new SplitText(".landing-h2-2", splitH2);

    loopText(landingText2, landingText3);
    loopText(landingText4, landingText5);
  });

  return () => ctx.revert(); // ✅ cleanup
}

// 🔁 Loop Animation
function loopText(text1: SplitText, text2: SplitText) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  tl
    .fromTo(
      text2.chars,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power3.inOut",
      }
    )
    .to({}, { duration: 2 })

    .to(text2.chars, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "power3.inOut",
    })

    .fromTo(
      text1.chars,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power3.inOut",
      }
    )
    .to({}, { duration: 2 })

    .to(text1.chars, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "power3.inOut",
    });
}