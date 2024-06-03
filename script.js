const shop_name = document.getElementById("name");
const nav_list = document.getElementById("nav-list");
const menu = document.getElementById("menu");
const food_section = document.getElementById("food-section");
const mode_toggle = document.getElementById("toggler");

//Prevent Hackettstown Bagel Animating Out on Page Load

setTimeout(() => {
  shop_name.style.visibility = "visible";
  menu.style.visibility = "visible";
},1500);

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

//Nav Bar Animation
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      document.getElementById("nav-bar").classList.toggle("nav-sticky", !entry.isIntersecting);
      shop_name.classList.toggle("name-hidden", entry.isIntersecting);
      shop_name.classList.toggle("name-appear", !entry.isIntersecting);

      //Makes full-length nav-items reappear after being in mobile view
      let items = document.querySelectorAll(".nav-item");
      items.forEach(item =>{if (item.classList.contains("hidden")){item.classList.remove("hidden")}});

      if (window.innerWidth <= 1000){
        let left_items = document.querySelectorAll(".menu-item-left");
        left_items.forEach(item =>{
          item.classList.toggle("hidden", !entry.isIntersecting);
          item.classList.toggle("menu-item-left-appear", entry.isIntersecting);
        })

        let right_items = document.querySelectorAll(".menu-item-right");
        right_items.forEach(item =>{
          item.classList.toggle("hidden", !entry.isIntersecting);
          item.classList.toggle("menu-item-right-appear", entry.isIntersecting);
        })

        menu.classList.toggle("hidden", entry.isIntersecting);
        menu.classList.toggle("menu-appear", !entry.isIntersecting);
      };

      if (window.innerWidth >= 1000){menu.classList.add("hidden")};
    })
  }, 
  {
    threshold: 1,
    rootMargin: "16px",
  }
)

observer.observe(document.getElementById("header"));

const reveal_observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const items = entry.target.querySelectorAll(".revealable");
      items.forEach(item =>{
        item.classList.toggle("revealable", !entry.isIntersecting);
        item.classList.toggle("revealed", entry.isIntersecting);
      })
      if (entry.isIntersecting) {reveal_observer.unobserve(entry.target)};
    })
  },
  {
    threshold: 0.5,
  }
)

//Image Carousel
const carousel_auto_scroll = setInterval(() => {carousel_move(1)}, 4000)

const buttons = document.querySelectorAll("[data-carousel-button]");
buttons.forEach(button =>{
  button.addEventListener("click", () => {
    clearInterval(carousel_auto_scroll);
    const offset = button.dataset.carouselButton == "next" ? 1 : -1;
    carousel_move(offset)});
})

function carousel_move(offset) {
  const slides = document.querySelector("[data-slides]");
  const activeSlide = slides.querySelector("[data-active]");

  let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  if (newIndex < 2) {newIndex = slides.children.length - 1};
  if (newIndex >= slides.children.length) {newIndex = 2};

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

//Event Listener Functions
function switchModes(event){
  const root = document.querySelector(':root');
  const rs = getComputedStyle(root);
  // const mode = rs.getPropertyValue('--mode');
  // event.target.dataset.toggle = mode;
  if (rs.getPropertyValue('--mode') == 0){
    root.style.setProperty('--mode', '1');
    root.style.setProperty('--color-primary', '#f3bb7a');
    root.style.setProperty('--color-secondary', '#CA4740');
    root.style.setProperty('--color-background', '#363636');
    root.style.setProperty('--color-text', 'white');
    root.style.setProperty('--color-text-secondary', '#c4c4c4');
    root.style.setProperty('--diamond-filter', 'hue-rotate(-20deg) brightness(100%) saturate(120%)');
    root.style.setProperty('--icon-filter', 'invert(.7) sepia(100%) hue-rotate(-5deg) brightness(90%) saturate(150%)');
    root.style.setProperty('--icon-hover-filter', 'invert(.7) sepia(100%) hue-rotate(-5deg) brightness(75%) saturate(200%)');
    root.style.setProperty('--mode-filter', 'sepia(100%) hue-rotate(-5deg) brightness(75%) saturate(200%)');
    document.getElementById('logo').style.setProperty('content','url(images/logo-dark.png)');
    document.querySelector('footer').style.setProperty('color','var(--color-background)')
    let welcomeP = document.getElementById('welcome-text').querySelectorAll('p');
    welcomeP.forEach(p => p.style.setProperty('color','var(--color-text'));

  } else {
    root.style.setProperty('--mode', '0');
    root.style.setProperty('--color-primary', '#CA4740');
    root.style.setProperty('--color-secondary', '#f3bb7a');
    root.style.setProperty('--color-background', 'white');
    root.style.setProperty('--color-text', 'black');
    root.style.setProperty('--color-text-secondary', '#363636');
    root.style.setProperty('--diamond-filter', 'hue-rotate(315deg) brightness(55%) saturate(250%)');
    root.style.setProperty('--icon-filter', 'invert(.7) sepia(100%) hue-rotate(310deg) brightness(55%) saturate(375%)');
    root.style.setProperty('--icon-hover-filter', 'invert(.7) sepia(100%) hue-rotate(310deg) brightness(40%) saturate(375%)');
    root.style.setProperty('--mode-filter', 'sepia(100%) hue-rotate(310deg) brightness(60%) saturate(300%)');
    document.getElementById('logo').style.setProperty('content','url(images/logo-light.png)');
    document.querySelector('footer').style.setProperty('color','var(--color-text)');
    let welcomeP = document.getElementById('welcome-text').querySelectorAll('p');
    welcomeP.forEach(p => p.style.setProperty('color','var(--color-text-secondary'));
    
  }
}

function animate(){
  reveal_observer.observe(document.getElementById("food-section"));
  reveal_observer.observe(document.getElementById("welcome"));
  reveal_observer.observe(document.getElementById("links"));
  reveal_observer.observe(document.getElementById("location-section"));
  reveal_observer.observe(document.getElementById("photo-parallax"));
  reveal_observer.observe(document.getElementById("social-links"));

  const root = document.getElementById('links-boxes');
  console.log(root.style);
}

window.addEventListener('load', animate);
mode_toggle.addEventListener('click', switchModes);
document.getElementById('')
