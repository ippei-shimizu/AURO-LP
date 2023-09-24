$(document).ready(function () {
  function checkForSideMenuVisibility() {
    const sideMenuElem = document.getElementById("side-menu");

    for (let i = 3; i <= 15; i++) {
      if (document.body.className.includes(`fp-viewing-page${i}`)) {
        sideMenuElem.style.opacity = "1";
        sideMenuElem.style.visibility = "visible";
        return;
      }
    }

    sideMenuElem.style.opacity = "0";
    sideMenuElem.style.visibility = "hidden";
  }

  const observer = new MutationObserver(checkForSideMenuVisibility);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  checkForSideMenuVisibility();

  var slideIndexBis = 1;
  var sliding = false;

  function initFullPage() {
    if (window.innerWidth > 790 && !$.fn.fullpage.isInitialised) {
      $("#fullpage").fullpage({
        anchors: [
          "page1",
          "page2",
          "page3",
          "page4",
          "page5",
          "page6",
          "page7",
          "page8",
          "page9",
          "page10",
          "page11",
          "page12",
          "page13",
          "page14",
          "page15",
          "page16",
          "page17",
          "page18",
          "page19",
          "page20",
        ],
      });
    } else if (window.innerWidth <= 790 && $.fn.fullpage.isInitialised) {
      $.fn.fullpage.destroy("all");
    }
  }

  initFullPage();

  window.addEventListener("resize", initFullPage);
  window.addEventListener("orientationchange", initFullPage);
});

window.addEventListener("load", () => {
  document.getElementById("menu").addEventListener("click", function () {
    const menuOpenElem = document.querySelector(".menu-open");
    const menuCloseElem = document.querySelector(".menu-close");
    const navElem = document.querySelector(".nav");

    if (menuOpenElem.classList.contains("open")) {
      menuOpenElem.classList.remove("open");
      menuCloseElem.classList.remove("open");
      navElem.classList.remove("open");
    } else {
      menuOpenElem.classList.add("open");
      menuCloseElem.classList.add("open");
      navElem.classList.add("open");
    }
  });

  const elem = document.querySelector(".swiper-container");
  if (elem === null) return;

  const swiperParams = {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    speed: 0,
    allowTouchMove: false,
  };

  const swiper = new Swiper(".swiper-container", swiperParams);

  let startTime;
  let direction = "right-down";
  let isWaiting = false;
  let shouldResetTime = false;

  const birdElem = document.getElementById("bard");

  function animate(timestamp) {
    if (startTime === undefined || shouldResetTime) {
      startTime = timestamp;
      shouldResetTime = false;
    }

    const elapsed = timestamp - startTime;

    if (elapsed >= 4000 && !isWaiting) {
      direction = direction === "right-down" ? "left-up" : "right-down";
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
        shouldResetTime = true;
      }, 3000);
      return requestAnimationFrame(animate);
    }

    if (isWaiting) {
      return requestAnimationFrame(animate);
    }

    let progress = elapsed / 4000;
    let curve = Math.sin(progress * Math.PI) * 2;

    let moveDistance = window.innerWidth * 1.2;

    if (window.innerWidth <= 790) {
      moveDistance = window.innerWidth * 1.6; // スマートフォンやタブレット向けの移動距離
      curve = Math.sin(progress * Math.PI); // カーブの挙動を少し調整
    }

    if (direction === "right-down") {
      birdElem.style.transform = `translate(${moveDistance * progress}px, ${
        484.179 * progress * curve
      }px) rotate(${-4.07523 * progress}deg) scaleX(1)`;
    } else {
      birdElem.style.transform = `translate(${
        moveDistance * (1 - progress)
      }px, ${434.179 * (1 - progress) * curve}px) rotate(${
        -4.07523 * (1 - progress)
      }deg) scaleX(-1)`;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  document
    .getElementById("page-top")
    .addEventListener("click", function (event) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

  const pageLinks = document.querySelectorAll(".page-link");
  pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const headerOffset = 220;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  // gsap
  gsap.registerPlugin(ScrollTrigger);

  // wood-left animation
  gsap.from(".wood-left", {
    scrollTrigger: {
      trigger: ".wood-left",
      start: "top bottom",
      toggleActions: "play none none reverse",
      once: true,
    },
    x: "-100%",
    duration: 2,
    ease: "cubic-bezier(0.25,0.46,0.45,0.94)",
  });
  gsap.from(".wood-03", {
    scrollTrigger: {
      trigger: ".wood-03",
      start: "top bottom",
      toggleActions: "play none none reverse",
      once: true,
    },
    x: "-100%",
    duration: 2,
    ease: "cubic-bezier(0.25,0.46,0.45,0.94)",
  });

  // wood-right animation
  gsap.from(".wood-right", {
    scrollTrigger: {
      trigger: ".wood-right",
      start: "top bottom",
      toggleActions: "play none none reverse",
      once: true,
    },
    x: "100%",
    duration: 2,
    ease: "cubic-bezier(0.25,0.46,0.45,0.94)",
  });
  gsap.from(".fade-in-01", {
    scrollTrigger: {
      trigger: ".fade-in-01",
      start: "top bottom",
      once: true,
    },
    filter: "blur(10px)",
    scale: 1.02,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power1.out",
  });

  gsap.set(".sub-leaf", { left: "-36px", right: "auto" });
  gsap.to(".sub-leaf", {
    left: "initial",
    right: "-36px",
    scrollTrigger: {
      trigger: ".section2-sub-title",
      start: "top bottom",
      once: true,
    },
    duration: 1.2,
    delay: 1,
    ease: "power1.out",
  });
  gsap.from(".auro-title-box", {
    x: "-100%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".auro-title-box",
      start: "top bottom",
      once: true,
    },
    duration: 1,
    delay: 1,
    ease: "power1.out",
  });
  gsap.from(".auro-title-sub", {
    x: "100%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".auro-title-sub",
      start: "top bottom",
      once: true,
    },
    duration: 1,
    delay: 1,
    ease: "power1.out",
  });
  gsap.set(".sub-leaf-16", { left: "-36px", right: "auto" });
  gsap.to(".sub-leaf-16", {
    left: "initial",
    right: "-30px",
    scrollTrigger: {
      trigger: ".section2-sub-title",
      start: "top bottom",
      once: true,
    },
    duration: 1.2,
    delay: 1,
    ease: "power1.out",
  });
  gsap.from(".auro-title-wrap", {
    x: "-100%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".auro-title-wrap",
      start: "top bottom",
      once: true,
    },
    duration: 1,
    delay: 1,
    ease: "power1.out",
  });
  gsap.from(".auro-title-sub-02", {
    x: "100%",
    opacity: 0,
    scrollTrigger: {
      trigger: ".auro-title-sub-02",
      start: "top bottom",
      once: true,
    },
    duration: 1,
    delay: 1,
    ease: "power1.out",
  });

  gsap.set(".fade-in-02", {
    opacity: 0,
    y: "30px",
  });

  document.querySelectorAll(".fade-in-02").forEach((elem, index) => {
    // 最初のアニメーション：transform:translateY(30px) → transform:translateY(1.6e-6px)
    gsap.to(elem, {
      opacity: 1,
      y: 1.6e-6,
      delay: 0.02 * index,
      duration: 0.5, // 1秒の半分をこのアニメーションに割り当て
      ease: "cubic-bezier(.03,.69,.98,.67)",
      scrollTrigger: {
        trigger: elem,
        start: "top 100%",
        once: true,
      },
      onComplete: function () {
        // 2つ目のアニメーション：transform:translateY(1.6e-6px) → transform:translateY(0px)
        gsap.to(elem, {
          y: 0,
          duration: 0.5, // 残りの半分の時間
          ease: "cubic-bezier(.03,.69,.98,.67)",
        });
      },
    });
  });

  document.querySelectorAll(".fade-in-03").forEach((elem) => {
    // 初期状態を設定
    gsap.set(elem, { opacity: 0, x: "-5%" });

    gsap.to(elem, {
      opacity: 1,
      x: 0,
      duration: 1.6,
      ease: "cubic-bezier(.03,.69,.98,.67)",
      scrollTrigger: {
        trigger: elem,
        start: "top 80%",
        once: true,
      },
    });
  });

  document.querySelectorAll(".ato").forEach((elem, index) => {
    // 初期状態を設定
    gsap.set(elem, { opacity: 0 }); // 透明に設定

    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top 100%",
        once: true,
      },
      opacity: 1, // 透明度を1に変更
      ease: "none",
      delay: 0.1 * index, // 0.08秒ずつ遅延
      duration: 0.02,
    });
  });
});

function updateSideVisibility() {
  // 画面幅が790px以上の場合は関数を終了
  if (window.innerWidth > 790) return;

  // 各要素の位置情報を取得
  const spSideSection2Top = document
    .getElementById("section2")
    .getBoundingClientRect().top;
  const spSideSection5Top = document
    .getElementById("section5")
    .getBoundingClientRect().top;
  const spSideSection6Top = document
    .getElementById("section6")
    .getBoundingClientRect().top;
  const spSideSection9Top = document
    .getElementById("section9")
    .getBoundingClientRect().top;
  const spSideSection10Top = document
    .getElementById("section10")
    .getBoundingClientRect().top;
  const spSideSection13Top = document
    .getElementById("section13")
    .getBoundingClientRect().top;

  // 各要素の位置情報に基づき、指定された要素の表示状態を更新
  const spSideSection2Elem = document.getElementById("spSideSection2");
  const spSideSection3Elem = document.getElementById("spSideSection3");
  const spSideSection4Elem = document.getElementById("spSideSection4");

  if (spSideSection2Top < window.innerHeight && spSideSection5Top > 0) {
    spSideSection2Elem.style.opacity = "1";
    spSideSection2Elem.style.visibility = "visible";
  } else {
    spSideSection2Elem.style.opacity = "0";
    spSideSection2Elem.style.visibility = "hidden";
  }

  if (spSideSection6Top < window.innerHeight && spSideSection9Top > 0) {
    spSideSection3Elem.style.opacity = "1";
    spSideSection3Elem.style.visibility = "visible";
  } else {
    spSideSection3Elem.style.opacity = "0";
    spSideSection3Elem.style.visibility = "hidden";
  }

  if (spSideSection10Top < window.innerHeight && spSideSection13Top > 0) {
    spSideSection4Elem.style.opacity = "1";
    spSideSection4Elem.style.visibility = "visible";
  } else {
    spSideSection4Elem.style.opacity = "0";
    spSideSection4Elem.style.visibility = "hidden";
  }
}

// スクロールイベントとリサイズイベントでupdateSideVisibility関数を呼び出す
window.addEventListener("scroll", updateSideVisibility);
window.addEventListener("resize", updateSideVisibility);

// ページの初期読み込み時にも関数を呼び出す
window.addEventListener("load", updateSideVisibility);
