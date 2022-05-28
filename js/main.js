//top header [currency selector]
const currency = document.querySelector(
  "header .top-header .currency-selector"
);
//Toggle drobdown list
const currencyMenu = document.querySelector(
  "header .top-header .currency-selector .drobdown-list"
);
currency.onclick = () => {
  if (currencyMenu.style.display === "block") {
    currencyMenu.style.display = "none";
  } else {
    currencyMenu.style.display = "block";
  }
};
//toggle selected class
const currencyList = document.querySelectorAll(
  "header .top-header .currency-selector ul li"
);
const currencyTitle = document.querySelector(
  "header .top-header .currency-selector .menu-toggle .title"
);
currencyList.forEach((list) => {
  list.addEventListener("click", removeSelectedClass);
});
function removeSelectedClass() {
  currencyList.forEach((list) => {
    list.classList.remove("selected");
    this.classList.add("selected");
    if (list.classList.contains("selected")) {
      currencyTitle.textContent = list.textContent;
    } else {
    }
  });
}
//bottom header
const categoriesBtn = document.querySelector(
    ".bottom-header .categories .categries-btn"
  ),
  productLists = document.querySelector(".bottom-header .categories .b-list"),
  bottomLinks = document.querySelectorAll(".bottom-header nav ul li a"),
  ellipsis = document.getElementById("ellipsis"),
  toggleElements = document.querySelectorAll(
    `.bottom-header
    .categories
    .b-list
    ul
    li.hide`
  );

console.log(toggleElements);

categoriesBtn.onclick = () => {
  if (!productLists.classList.contains("active")) {
    productLists.classList.add("active");
  } else {
    productLists.classList.remove("active");
  }
};
bottomLinks.forEach((link) => {
  link.addEventListener("click", toggleClass);
});

function toggleClass() {
  bottomLinks.forEach((link) => {
    link.classList.remove("active-link");
    this.classList.add("active-link");
  });
}

ellipsis.onclick = () => {
  toggleElements.forEach((element) => {
    if (!element.classList.contains("active")) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
};
//touch

const slider = document.querySelector(".landing .sliders"),
  slides = Array.from(document.querySelectorAll(".landing .sliders .slide"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector("img");
  slideImage.addEventListener("dragstart", (e) => e.preventDefault());

  // Touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

// Disable context menu
// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove("grabbing");
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

//categories sections
const categoriesSection = document.querySelector(
  ".categories .container .outer .content"
);

console.log(categoriesSection);

let categoriesArray = [
  `women's clothing`,
  `men's clothing`,
  `kid's clothing`,
  `laptop & tablets`,
  `smartphone`,
  `sport & travel`,
  `food & drink`,
  `gift & handmade`,
  `pet shop`,
  `drone`,
  `cosmetics`,
  `camera`,
  `audio`,
  `television`,
  `watch`,
  `jewelry`,
  `smartwatch`,
  `kid toy`,
  `motorcycle`,
  `gaming`,
];

let categoriesIcons = [
  `<i class="fa-solid fa-person-dress"></i>`,
  `<i class="fa-solid fa-shirt"></i>`,
  `<i class="fa-solid fa-child-reaching"></i>`,
  `<i class="fa-solid fa-laptop"></i>`,
  `<i class="fa-solid fa-mobile-screen-button"></i>`,
  `<i class="fa-solid fa-bicycle"></i>`,
  `<i class="fa-solid fa-burger"></i>`,
  `<i class="fa-solid fa-gift"></i>`,
  `<i class="fa-solid fa-cat"></i>`,
  `<i class="fa-brands fa-phoenix-squadron"></i>`,
  `<i class="fa-solid fa-paintbrush"></i>`,
  `<i class="fa-solid fa-camera"></i>`,
  `<i class="fa-solid fa-headset"></i>`,
  `<i class="fa-solid fa-tv"></i>`,
  `<i class="fa-solid fa-clock"></i>`,
  `<i class="fa-solid fa-gem"></i>`,
  `<i class="fa-solid fa-house-signal"></i>`,
  `<i class="fa-solid fa-gamepad"></i>`,
  `<i class="fa-solid fa-motorcycle"></i>`,
  `<i class="fa-solid fa-puzzle-piece"></i>`,
];

for (let i = 0; i < categoriesArray.length; i++) {
  let box = document.createElement("div");
  box.className = "box";
  box.innerHTML = `<div class = "icon" > ${categoriesIcons[i]} </div>`;

  let contentH4 = document.createElement("h4");
  contentH4.textContent = categoriesArray[i];
  box.appendChild(contentH4);
  categoriesSection.appendChild(box);
}
