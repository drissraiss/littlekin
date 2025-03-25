/* Hero Section */
var hero__swiper = new Swiper(".hero__swiper", {
  loop: true,
  pagination: {
    el: ".hero__swiper__pagination",
    clickable: true,
  },
});

/* Top Category section */
var category_section__swiper = new Swiper(".category-section__swiper", {
  slidesPerView: 4,
  spaceBetween: 14,
  loop: true,
  navigation: {
    nextEl: ".category-section__button-next",
    prevEl: ".category-section__button-prev",
  },
});