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

  /* Mega Menu */
  let nav_links = document.querySelectorAll(".header__nav__list__item");
  nav_links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      let mega_menu = document.querySelector('.header__mega-menu[data-index="' + this.dataset.index + '"]');
      if (mega_menu) {
        mega_menu.classList.add("header__mega-menu--active");
        link.addEventListener("mouseleave", function () {
          setTimeout(() => {
            mega_menu.classList.remove("header__mega-menu--active");
          }, 1000);
        });
      }
    });
  });

  /* Mobile Menu */
  const menu_hamburger = document.querySelector(".header__menu-hamburger");
  const menu_close = document.querySelector(".header__nav__list__mobile__close");
  const mobile_menu = document.querySelector(".header__nav__list__mobile");
  const sub_menu = document.querySelectorAll(".header__nav__list__mobile__item");

  const show_mobile_menu = () => {
    mobile_menu.classList.add("header__nav__list__mobile--active");
    document.body.classList.add("overflow-hidden");
  };
  const hide_mobile_menu = () => {
    mobile_menu.classList.remove("header__nav__list__mobile--active");
    document.body.classList.remove("overflow-hidden");
  };

  sub_menu.forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("header__nav__list__mobile__item--active");
    });
  });

  if (menu_hamburger) {
    menu_hamburger.addEventListener("click", function () {
      show_mobile_menu();
      if (menu_close) {
        menu_close.addEventListener("click", function () {
          hide_mobile_menu();
        });
      }
    });
  }

  /* Open and close Menu Mobile with sliding */
  let touche_start_x = 0;
  let touche_end_x = 0;

  function handle_touche_start(event) {
    touche_start_x = event.changedTouches[0].clientX;
  }

  function handle_touche_end(event) {
    touche_end_x = event.changedTouches[0].clientX;

    if (touche_start_x - touche_end_x > 50 ) {
      hide_mobile_menu();
    }
    
    if (touche_end_x - touche_start_x > 100 && touche_start_x < 20) {
      show_mobile_menu();
    }
  }
  document.addEventListener("touchstart", handle_touche_start);
  document.addEventListener("touchend", handle_touche_end);

  /* Search Form */
  let search_form_icon = document.querySelector(".header__icon-search");
  let search_form = document.querySelector(".header__search-form__form");

  if(search_form_icon) {
    search_form_icon.addEventListener("mouseenter", function () {
      if (search_form) {
        search_form.classList.add("header__search-form__form--active");
        search_form_icon.addEventListener("mouseleave", function () {
          setTimeout(() => {
            search_form.classList.remove("header__search-form__form--active");
          }, 1000);
        });
      }
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
  let category_section_slider = document.querySelector(".category-list");
  let category_section_button_next = document.querySelector(".category-section__button-next");
  let category_section_button_prev = document.querySelector(".category-section__button-prev");

  if (category_section_slider) {
    if (category_section_button_next) {
      category_section_button_next.addEventListener("click", function () {
        category_section_slider.scrollBy({
          left: 299,
          behavior: "smooth",
        });
      });
    }
    if (category_section_button_prev) {
      category_section_button_prev.addEventListener("click", function () {
        category_section_slider.scrollBy({
          left: -299,
          behavior: "smooth",
        });
      });
    }
  }

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

  /* Custem Slider (Slider DRS) */
  let custom_sliders = document.querySelectorAll(".slider-drs");
  let isDown = false;
  let startX;
  let scrollLeft;
  let dragged = false;

  custom_sliders.forEach((slider) => {
    slider.querySelectorAll("a").forEach((a) => {
      a.addEventListener("dragstart", (e) => {
        e.preventDefault(); // Prevent default drag behavior
      });
    });

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      dragged = false;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      setTimeout(() => (dragged = false), 0); // reset just in case
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 5) {
        // threshold to consider it a drag
        dragged = true;
      }
      slider.scrollLeft = scrollLeft - walk;
    });

    // Prevent click on links if it was a drag
    slider.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  });
});
