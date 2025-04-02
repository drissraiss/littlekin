document.addEventListener("DOMContentLoaded", () => {
  /* Pre Header Language Selector  */
  let language_selector = document.querySelector(".pre-header__language-selector");
  const handle_click_outside_selector = () => {
    language_selector.classList.remove("pre-header__language-selector--active");
    document.removeEventListener("click", handle_click_outside_selector);
  };
  if (language_selector) {
    language_selector.addEventListener("click", function (event) {
      event.stopPropagation();
      this.classList.add("pre-header__language-selector--active");
      document.addEventListener("click", handle_click_outside_selector);
    });
  }

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
    spaceBetween: 14,
    slidesPerView: 4,
    loop: true, 
    freeMode: true, 
    navigation: {
      nextEl: ".category-section__button-next",
      prevEl: ".category-section__button-prev",
    },
    pagination: {
      el: ".category-section__swiper__pagination",
      clickable: true,
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
    const handle_mouse_move = (e) => update_slider_position(e.pageX);

    // Handle touch movement
    const handle_touch_move = (e) => update_slider_position(e.touches[0].pageX);

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

  /* Frequently Asked Questions */
  const faq = document.querySelector(".faq");
  if (faq) {
    let questions_faq = faq.querySelectorAll(".faq__questions .faq__item");
    questions_faq.forEach((e) => {
      e.addEventListener("click", function () {
        if (this.classList.contains("faq__item--active")) return this.classList.remove("faq__item--active");
        questions_faq.forEach((item) => {
          if (item == e) {
            this.classList.add("faq__item--active");
          } else {
            item.classList.remove("faq__item--active");
          }
        });
      });
    });
  }

  /* Timeline Section */
  const timeline = document.querySelector(".timeline");
  const timeline_years = document.querySelectorAll(".timeline__years__item");
  const timeline_items = document.querySelectorAll(".timeline__item");
  const timeline_btn_prev = document.querySelector(".timeline__years__prev");
  const timeline_btn_next = document.querySelector(".timeline__years__next");
  const update_timeline = (item_index) => {
    for (let index = 0; index < timeline_years.length; index++) {
      if (index == item_index) {
        timeline_years[index].classList.add("timeline__years__item--active");
        timeline_items[index].classList.add("timeline__item--active");
      } else {
        timeline_years[index].classList.remove("timeline__years__item--active");
        timeline_items[index].classList.remove("timeline__item--active");
      }
    }
  };
  const get_current_index_active = () => {
    return Array.from(timeline_years).findIndex((element) => element.classList.contains("timeline__years__item--active"));
  };
  if (timeline && timeline_years.length) {
    timeline_years.forEach((year, index) => {
      year.addEventListener("click", () => {
        update_timeline(index);
      });
    });
    timeline_btn_prev.addEventListener("click", () => {
      var current_index = get_current_index_active();
      var constrained_index;
      if (current_index != undefined) {
        if (current_index <= 0) {
          constrained_index = timeline_years.length - 1;
        } else if (current_index > timeline_years.length - 1) {
          constrained_index = 0;
        } else {
          constrained_index = current_index - 1;
        }
        update_timeline(constrained_index);
      }
    });

    timeline_btn_next.addEventListener("click", () => {
      var current_index = get_current_index_active();
      var constrained_index;
      if (current_index != undefined) {
        if (current_index < 0) {
          constrained_index = timeline_years.length - 1;
        } else if (current_index >= timeline_years.length - 1) {
          constrained_index = 0;
        } else {
          constrained_index = current_index + 1;
        }
        update_timeline(constrained_index);
      }
    });
  }

  /* Spotlight */
  var spotlight_product_cards = document.querySelectorAll(".spotlight__product");
  spotlight_product_cards.forEach((item) => {
    var percentage_x = parseInt(item.style.left);
    var percentage_y = parseInt(item.style.top);
    var translate_x = 5;
    var translate_y = -105;
    if (percentage_x > 50 && percentage_y > 50) {
      translate_x = -95;
    } else if (percentage_x > 50 && percentage_y < 50) {
      translate_x = -95;
      translate_y = 45;
    } else if (percentage_x < 50 && percentage_y < 50) {
      translate_y = 45;
    }
    item.querySelector(".spotlight__product__card").style.transform = `translate(${translate_x}%, ${translate_y}%)`;
  });

  /* Back to Top button */
  const back_to_top_button = document.querySelector("#back-to-top");
  if (back_to_top_button) {
    document.addEventListener("scroll", () => {
      if (window.scrollY >= 1000) {
        back_to_top_button.classList.add("back-to-top--active");
      } else {
        back_to_top_button.classList.remove("back-to-top--active");
      }
    });
    back_to_top_button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
      });
    });
  }
});
