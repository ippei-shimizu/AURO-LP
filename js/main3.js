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
    } else if (window.innerWidth <= 790 && $.fn.fullpage.isInitialised) {
      $.fn.fullpage.destroy("all");
    }
  }
  initFullPage();

  window.addEventListener("resize", initFullPage);
  window.addEventListener("orientationchange", initFullPage);

  // ページ読み込み時のチェック
  handleResponsiveImages();

  // ウィンドウのリサイズ時のチェック
  window.addEventListener("resize", handleResponsiveImages);

  function handleResponsiveImages() {
    const imageMappings = [
      { selector: ".penki-02", defaultSrc: "./images/penki-02-1.png" },
      { selector: ".penki-05", defaultSrc: "./images/penki-4-1.png" },
      { selector: ".wax-01", defaultSrc: "./images/wax-01-1.png" },
      { selector: ".senzai-04", defaultSrc: "./images/senzai-04.png" },
    ];

    imageMappings.forEach((mapping) => {
      updateImageSrc(mapping.selector, mapping.defaultSrc);
    });
  }

  function updateImageSrc(selector, defaultSrc) {
    const imgElement = document.querySelector(selector);
    if (imgElement) {
      if (window.innerWidth <= 790) {
        imgElement.src = imgElement.getAttribute("data-mobile-src");
      } else {
        imgElement.src = defaultSrc;
      }
    }
  }
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

  if (window.innerWidth >= 790) {
    const elem = document.querySelector(".swiper-container");
    if (elem === null) return;

    const swiperParams = {
      loop: true,
      effect: "fade",
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      speed: 1000,
      allowTouchMove: false,
      on: {
        init: function () {
          // 初期化時に非アクティブなスライドのopacityを0にする
          updateSlidesOpacity(this);
        },
        slideChangeTransitionStart: function () {
          // スライドが変更される前に、全てのスライドのopacityを0にする
          for (const slide of this.slides) {
            slide.style.opacity = 0;
          }
        },
        slideChangeTransitionEnd: function () {
          // スライドのトランジションが終了したら、次のスライドのopacityを1にする
          const nextSlide = this.slides[this.activeIndex];
          fadeInSlide(nextSlide);
        },
      },
    };
    const swiper = new Swiper(".swiper-container", swiperParams);

    function fadeInSlide(slide) {
      let opacityValue = 0;
      const interval = setInterval(() => {
        opacityValue += 0.01;
        slide.style.opacity = opacityValue;

        if (opacityValue >= 1) {
          clearInterval(interval);
        }
      }, 20); // 30ms間隔で0.01増加。全体でおおよそ3秒間かかります。
    }

    function updateSlidesOpacity(swiperInstance) {
      // 全てのスライドを取得
      const slides = swiperInstance.slides;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (i === swiperInstance.activeIndex) {
          // アクティブなスライドの場合はopacityを1にする
          slide.style.opacity = 1;
        } else {
          // 非アクティブなスライドの場合はopacityを0にする
          slide.style.opacity = 0;
        }
      }
    }
  } else {
    const elem = document.querySelector(".swiper-container");
    if (elem === null) return;

    const swiperParams = {
      loop: true,
      effect: "fade",
      autoplay: {
        delay: 55000,
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

      if (elapsed >= 14000 && !isWaiting) {
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

      let progress = elapsed / 14000;
      let curve = Math.sin(progress * Math.PI) * 2;

      if (direction === "right-down") {
        birdElem.style.transform = `translate(${2324.12 * progress}px, ${
          484.179 * progress * curve
        }px) rotate(${-4.07523 * progress}deg) scaleX(1)`;
      } else {
        birdElem.style.transform = `translate(${2324.12 * (1 - progress)}px, ${
          434.179 * (1 - progress) * curve
        }px) rotate(${-4.07523 * (1 - progress)}deg) scaleX(-1)`;
      }

      requestAnimationFrame(animate);
    }
  }

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
      }, 15000);
      return requestAnimationFrame(animate);
    }

    if (isWaiting) {
      return requestAnimationFrame(animate);
    }

    let progress = elapsed / 4000;
    let curve = Math.sin(progress * Math.PI) * 2;

    let moveDistance = window.innerWidth * 1.2;

    if (window.innerWidth <= 790) {
      moveDistance = window.innerWidth * 1.6;
      curve = Math.sin(progress * Math.PI);
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
  document
    .getElementById("page-top-sp")
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

  let scrollTriggers = [];

  function setupScrollTriggers() {
    if (window.innerWidth <= 790) {
      scrollTriggers.forEach((st) => st.kill());
      scrollTriggers = [];

      let st1 = gsap.from(".wood-left", {
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
      scrollTriggers.push(st1.scrollTrigger);

      let st2 = gsap.from(".wood-03", {
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
      scrollTriggers.push(st2.scrollTrigger);

      let st3 = gsap.from(".wood-right", {
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
      scrollTriggers.push(st3.scrollTrigger);

      document.querySelectorAll(".fade-in-01").forEach((elem, index) => {
        let animation = gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            once: true,
          },
          filter: "blur(10px)",
          scale: 1.02,
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        });
        scrollTriggers.push(animation.scrollTrigger);
      });

      let st5 = gsap.set(".sub-leaf", { left: "-36px", right: "auto" });
      scrollTriggers.push(st5.scrollTrigger);

      let st6 = gsap.to(".sub-leaf", {
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
      scrollTriggers.push(st6.scrollTrigger);

      let st7 = gsap.set(".sub-leaf", { left: "-36px", right: "auto" });
      scrollTriggers.push(st7.scrollTrigger);

      let st8 = gsap.to(".sub-leaf", {
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
      scrollTriggers.push(st8.scrollTrigger);

      let st10 = gsap.from(".auro-title-box", {
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
      scrollTriggers.push(st10.scrollTrigger);

      let st11 = gsap.from(".auro-title-sub", {
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
      scrollTriggers.push(st11.scrollTrigger);

      let st12 = gsap.from(".auro-title-wrap", {
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
      scrollTriggers.push(st12.scrollTrigger);

      let st13 = gsap.from(".auro-title-sub-02", {
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
      scrollTriggers.push(st13.scrollTrigger);

      let st14 = gsap.set(".fade-in-02", {
        opacity: 0,
        y: "30px",
      });
      scrollTriggers.push(st14.scrollTrigger);

      document.querySelectorAll(".fade-in-02").forEach((elem, index) => {
        let animation1 = gsap.to(elem, {
          opacity: 1,
          y: 1.6e-6,
          delay: 0.4,
          duration: 1.6,
          ease: "cubic-bezier(.03,.69,.98,.67)",
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            once: true,
          },
          onComplete: function () {
            gsap.to(elem, {
              y: 0,
              duration: 0.5,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
          },
        });
        scrollTriggers.push(animation1.scrollTrigger);
      });

      let st16 = gsap.set(".sub-leaf-16", { left: "-36px", right: "auto" });
      scrollTriggers.push(st16.scrollTrigger);

      let st17 = gsap.to(".sub-leaf-16", {
        left: "initial",
        right: "-30px",
        scrollTrigger: {
          trigger: ".sub-leaf-16",
          start: "top 80%",
          once: true,
        },
        duration: 1.2,
        delay: 1,
        ease: "power1.out",
      });
      scrollTriggers.push(st17.scrollTrigger);

      document.querySelectorAll(".fade-in-03").forEach((elem) => {
        let animation = gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top bottom",
            once: true,
          },
          filter: "blur(10px)",
          scale: 1.02,
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        });
        scrollTriggers.push(animation.scrollTrigger);
      });

      document.querySelectorAll(".ato").forEach((elem, index) => {
        gsap.set(elem, { opacity: 0 });

        let animation = gsap.to(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 100%",
            once: true,
          },
          opacity: 1,
          ease: "none",
          delay: 0.2 * index,
          duration: 0.02,
        });

        scrollTriggers.push(animation.scrollTrigger);
      });

      document.querySelectorAll(".ato").forEach((elem, index) => {
        gsap.set(elem, { opacity: 0 });

        let animation = gsap.to(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 100%",
            once: true,
          },
          opacity: 1,
          ease: "none",
          delay: 0.2 * index,
          duration: 0.02,
        });

        scrollTriggers.push(animation.scrollTrigger);
      });

      document.querySelectorAll(".awa-img").forEach((elem) => {
        gsap.set(elem, { opacity: 0 });

        let animation = gsap.to(elem, {
          opacity: 1,
          scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            once: true,
          },
          ease: "power1.out",
        });

        scrollTriggers.push(animation.scrollTrigger);
      });

      ScrollTrigger.refresh();
    } else {
      scrollTriggers.forEach((st) => st.kill());
      scrollTriggers = [];

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
        afterLoad: function (anchorLink, index) {
          gsap.set(".wood-left", { x: "-100%" });
          gsap.set(".wood-right", { x: "100%" });
          gsap.set(".fade-in-04", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".auro-title-box", { opacity: "0", x: "-100%" });
          gsap.set(".auro-title-sub", { opacity: "0", x: "100%" });
          gsap.set(".sub-leaf", { left: "-36px", right: "auto" });
          gsap.set(".auro-title-box-3", { opacity: "0", x: "-100%" });
          gsap.set(".auro-title-sub-3", { opacity: "0", x: "100%" });
          gsap.set(".sub-leaf-3", { left: "-36px", right: "auto" });
          gsap.set(".auro-title-box-4", { opacity: "0", x: "-100%" });
          gsap.set(".auro-title-sub-4", { opacity: "0", x: "100%" });
          gsap.set(".sub-leaf-4", { left: "-36px", right: "auto" });
          gsap.set(".auro-title-box-5", { opacity: "0", x: "-100%" });
          gsap.set(".auro-title-sub-5", { opacity: "0", x: "100%" });
          gsap.set(".sub-leaf-5", { left: "-36px", right: "auto" });
          gsap.set(".penki-img", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".penki-02", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-05", { opacity: 0, y: "30px" });
          gsap.set(".penki-03", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-06", { opacity: 0, y: "30px" });
          gsap.set(".penki-05", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-07", { opacity: 0, y: "30px" });
          gsap.set(".penki-06", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".wax-01", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-08", { opacity: 0, y: "30px" });
          gsap.set(".wax-02", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-09", { opacity: 0, y: "30px" });
          gsap.set(".wax-03", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-10", { opacity: 0, y: "30px" });
          gsap.set(".senzai-01", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".senzai-02", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-11", { opacity: 0, y: "30px" });
          gsap.set(".senzai-03", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-12", { opacity: 0, y: "30px" });
          gsap.set(".awa-01", { opacity: 0 });
          gsap.set(".awa-02", { opacity: 0 });
          gsap.set(".senzai-04", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-13", { opacity: 0, y: "30px" });
          gsap.set(
            [
              ".awa-03",
              ".awa-04",
              ".awa-05",
              ".awa-06",
              ".awa-07",
              ".awa-08",
              ".awa-09",
              ".awa-10",
              ".awa-11",
              ".awa-12",
              ".awa-13",
            ],
            { opacity: 0 }
          );
          gsap.set(".senzai-05", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-14", { opacity: 0, y: "30px" });
          gsap.set(
            [
              ".awa-14",
              ".awa-15",
              ".awa-16",
              ".awa-17",
              ".awa-18",
              ".awa-19",
              ".awa-20",
              ".awa-21",
              ".awa-22",
              ".awa-23",
              ".awa-24",
              ".awa-25",
              ".awa-26",
            ],
            { opacity: 0 }
          );
          gsap.set(
            [".ato-01", ".ato-02", ".ato-03", ".ato-04", ".ato-05", ".ato-06"],
            { opacity: 0 }
          );
          gsap.set(
            [
              ".ato-07",
              ".ato-08",
              ".ato-09",
              ".ato-10",
              ".ato-11",
              ".ato-12",
              ".ato-13",
              ".ato-14",
              ".ato-15",
              ".ato-16",
            ],
            { opacity: 0 }
          );
          gsap.set(".senzai-06", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-15", { opacity: 0, y: "30px" });
          gsap.set(".senzai-07", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".wood-03", { x: "-100%" });
          gsap.set(".kuma", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".fade-in-20", { opacity: "0", filter: "blur(10px)" });
          gsap.set(".auro-title-wrap", { opacity: "0", x: "-100%" });
          gsap.set(".auro-title-sub-02", { opacity: "0", x: "100%" });
          gsap.set(".sub-leaf-16", { left: "-36px", right: "auto" });
          gsap.set(".fade-in-16", { opacity: 0, y: "30px" });

          if (anchorLink === "page2") {
            gsap.to(".wood-left", {
              x: "0%",
              duration: 2,
              ease: "cubic-bezier(0.25,0.46,0.45,0.94)",
            });
            gsap.to(".wood-right", {
              x: "0%",
              duration: 2,
              ease: "cubic-bezier(0.25,0.46,0.45,0.94)",
            });
            gsap.to(".fade-in-04", {
              filter: "blur(0px)",
              scale: 1.02,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-box", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-sub", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".sub-leaf", {
              left: "initial",
              right: "-58px",
              duration: 1.2,
              delay: 1,
              ease: "power1.out",
            });
          }
          if (anchorLink === "page3") {
            gsap.to(".penki-img", {
              filter: "blur(0px)",
              scale: 1.02,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-box-3", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-sub-3", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".sub-leaf-3", {
              left: "initial",
              right: "-58px",
              duration: 1.2,
              delay: 1,
              ease: "power1.out",
            });
          }
          if (anchorLink === "page4") {
            gsap.to(".penki-02", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-05").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
          if (anchorLink === "page5") {
            gsap.to(".penki-03", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-06").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
            [
              ".ato-01",
              ".ato-02",
              ".ato-03",
              ".ato-04",
              ".ato-05",
              ".ato-06",
            ].forEach((selector, i) => {
              gsap.to(selector, {
                opacity: 1,
                ease: "none",
                delay: 0.2 * (index + i),
                duration: 0.02,
              });
            });
          }
          if (anchorLink === "page6") {
            gsap.to(".penki-05", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-07").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
            [
              ".ato-07",
              ".ato-08",
              ".ato-09",
              ".ato-10",
              ".ato-11",
              ".ato-12",
              ".ato-13",
              ".ato-14",
              ".ato-15",
              ".ato-16",
            ].forEach((selector, i) => {
              gsap.to(selector, {
                opacity: 1,
                ease: "none",
                delay: 0.2 * (index + i),
                duration: 0.02,
              });
            });
          }
          if (anchorLink === "page7") {
            gsap.to(".penki-06", {
              filter: "blur(0px)",
              scale: 1.02,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-box-4", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-sub-4", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".sub-leaf-4", {
              left: "initial",
              right: "-58px",
              duration: 1.2,
              delay: 1,
              ease: "power1.out",
            });
          }
          if (anchorLink === "page8") {
            gsap.to(".wax-01", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-08").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
          if (anchorLink === "page9") {
            gsap.to(".wax-02", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-09").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
          if (anchorLink === "page10") {
            gsap.to(".wax-03", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-10").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
          if (anchorLink === "page11") {
            gsap.to(".senzai-01", {
              filter: "blur(0px)",
              scale: 1.02,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-box-5", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-sub-5", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".sub-leaf-5", {
              left: "initial",
              right: "-58px",
              duration: 1.2,
              delay: 1,
              ease: "power1.out",
            });
          }
          if (anchorLink === "page12") {
            gsap.to(".senzai-02", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-11").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
          if (anchorLink === "page13") {
            gsap.to(".senzai-03", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-12").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
            gsap.to(".awa-01", {
              opacity: 1,
              scrollTrigger: {
                trigger: ".awa-01",
                start: "top 80%",
                once: true,
              },
              ease: "power1.out",
            });
            gsap.to(".awa-02", {
              opacity: 1,
              ease: "power1.out",
            });
          }
          if (anchorLink === "page14") {
            gsap.to(".senzai-04", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-13").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
            gsap.to(
              [
                ".awa-03",
                ".awa-04",
                ".awa-05",
                ".awa-06",
                ".awa-07",
                ".awa-08",
                ".awa-09",
                ".awa-10",
                ".awa-11",
                ".awa-12",
                ".awa-13",
              ],
              {
                opacity: 1,
                ease: "power1.out",
              }
            );
          }
          if (anchorLink === "page15") {
            gsap.to(".senzai-05", {
              opacity: 1,
              filter: "blur(0px)",
              x: "0%",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-14").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
            gsap.to(
              [
                ".awa-14",
                ".awa-15",
                ".awa-16",
                ".awa-17",
                ".awa-18",
                ".awa-19",
                ".awa-20",
                ".awa-21",
                ".awa-22",
                ".awa-23",
                ".awa-24",
                ".awa-25",
                ".awa-26",
              ],
              {
                opacity: 1,
                ease: "power1.out",
              }
            );
          }
          if (anchorLink === "page16") {
            gsap.to(".senzai-06", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            document.querySelectorAll(".fade-in-15").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
          if (anchorLink === "page17") {
            gsap.to(".senzai-07", {
              filter: "blur(0px)",
              scale: 1.02,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            });
          }
          if (anchorLink === "page18") {
            gsap.to(".wood-03", {
              x: "0%",
              duration: 2,
              ease: "cubic-bezier(0.25,0.46,0.45,0.94)",
            });
            gsap.to(".kuma", {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "cubic-bezier(.03,.69,.98,.67)",
            });
            gsap.to(".fade-in-20", {
              filter: "blur(0px)",
              scale: 1.02,
              opacity: 1,
              duration: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-wrap", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".auro-title-sub-02", {
              x: "0%",
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power1.out",
            });
            gsap.to(".sub-leaf-16", {
              left: "initial",
              right: "-58px",
              duration: 1.2,
              delay: 1,
              ease: "power1.out",
            });
            document.querySelectorAll(".fade-in-16").forEach((elem, index) => {
              gsap.to(elem, {
                opacity: 1,
                y: 1.6e-6,
                delay: 1 + 0.5 * index,
                duration: 1.6,
                ease: "cubic-bezier(.03,.69,.98,.67)",
                onComplete: function () {
                  gsap.to(elem, {
                    y: 0,
                    duration: 0.5,
                    ease: "cubic-bezier(.03,.69,.98,.67)",
                  });
                },
              });
            });
          }
        },
      });
    }
  }
  setupScrollTriggers();
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
