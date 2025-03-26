document.addEventListener("DOMContentLoaded", () => {
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

  /* Image Comparison Slider */
  const comparison_slider = document.querySelector(".comp-sld");
  const handle_slider = document.querySelector(".comp-sld__handle");
  const after_slider = document.querySelector(".comp-sld__item--after");

  if (comparison_slider) {
    function update_slider_position(x) {
      let slider_rect = comparison_slider.getBoundingClientRect();
      let percentage = ((x - slider_rect.left) / slider_rect.width) * 100;

      // Constrain percentage between 0 and 100
      let constrained_percentage = Math.max(0, Math.min(percentage, 100));

      // Update position of slider handle and clip-path of right container
      handle_slider.style.left = `${constrained_percentage}%`;
      after_slider.style.clipPath = `inset(0 0 0 ${constrained_percentage}%)`;
    }

    // Handle mouse movement
    const handle_mouse_move = e => update_slider_position(e.pageX)
    
    // Handle touch movement
    const handle_touch_move = e =>update_slider_position(e.touches[0].pageX);

    // Mouse events
    handle_slider.addEventListener("mousedown", (e) => {
      e.preventDefault();
      document.addEventListener("mousemove", handle_mouse_move);
    });

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handle_mouse_move);
    });

    // Touch events
    handle_slider.addEventListener("touchstart", (e) => {
      e.preventDefault();
      document.addEventListener("touchmove", handle_touch_move);
    });

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", handle_touch_move);
    });
  }
});
