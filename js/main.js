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
