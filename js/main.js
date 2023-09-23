$(document).ready(function () {
  var slideIndexBis = 1;
  var sliding = false;

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
    ],
  });
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

  requestAnimationFrame(animate);
});
