import { attr, runSplit } from './utilities';
import { accordion } from './interactions/accordion';
import { hoverActive } from './interactions/hoverActive';
import { countUp } from './interactions/countUp';
import { mouseOver } from './interactions/mouseOver';
import { parallax } from './interactions/parallax';
import { scrollIn } from './interactions/scrollIn';
import { scrolling } from './interactions/scrolling';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination, EffectCreative } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  // Comment out for production
  console.log('Local Script Loaded');

  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (gsap.Flip !== undefined) {
    gsap.registerPlugin(Flip);
  }

  //////////////////////////////
  //Global Variables

  const navColorScroll = function () {
    //Elements
    const NAV = '[data-ix-navcolor="nav"]';
    const PAGE_WRAP = '.page_wrap';
    const NAV_DISTANCE = '36'; //in rems

    //Options
    const theme = 'data-theme';
    let defaultTheme = 'light';
    const themes = ['light', 'dark'];

    //get the elements
    const nav = document.querySelector(NAV);
    const pageWrap = document.querySelector(PAGE_WRAP);
    const sections = document.querySelectorAll('section');
    if (!pageWrap || sections.length === 0) return;

    //utility function to get the theme and return it
    const getTheme = function (element) {
      const elementTheme = element.getAttribute(theme);
      //return the theme if it is a valid theme otherwise returns the default theme
      if (themes.includes(elementTheme)) {
        return elementTheme;
      }
      //if invert and default theme is 1, return 2
      if (elementTheme === 'invert' && defaultTheme === themes[0]) {
        return themes[1];
      }
      //if invert and default theme is 2, return 1
      if (elementTheme === 'invert' && defaultTheme === themes[1]) {
        return themes[0];
      }
      // if value is invalid or inherit return the default theme
      else {
        return defaultTheme;
      }
    };

    //utility function to get the theme and return it
    const applyTheme = function (section, appliedTheme) {
      const tl = gsap.timeline({
        defaults: {
          duration: 0.6,
          ease: 'power1.out',
        },
        scrollTrigger: {
          trigger: section,
          start: `top ${NAV_DISTANCE}`,
          end: `bottom ${NAV_DISTANCE}`,
          scrub: true,
          markers: false,
          onEnter: () => {
            nav.setAttribute(theme, appliedTheme);
          },
          onEnterBack: () => {
            nav.setAttribute(theme, appliedTheme);
          },
        },
      });
    };

    //get the page theme
    const pageTheme = getTheme(pageWrap);
    //set the default theme to match the page theme
    defaultTheme = pageTheme;

    //apply the section theme to the nav
    sections.forEach(function (section) {
      sectionTheme = getTheme(section);
      applyTheme(section, sectionTheme);
    });
  };

  const navLinkHover = function () {
    //selectors
    const NAV_MENU = '[data-ix-navhover="menu"]';
    const NAV_LINK = '[data-ix-navhover="link"]';
    const NAV_LINK_WRAP = '[data-ix-navhover="link-wrap"]';
    const NAV_LINK_BG = '[data-ix-navhover="bg"]';
    //options
    const ACTIVE_CLASS = 'is-hovered';
    // hover menu tracking
    let menuHover = false;

    const bg = document.querySelector(NAV_LINK_BG);
    const menu = document.querySelector(NAV_MENU);
    const linkWraps = document.querySelectorAll(NAV_LINK_WRAP);
    //check for elements
    if (!bg || !menu || linkWraps.length === 0) return;

    //function to handle events
    const activateLink = function (linkWrap, hoverIn = true) {
      const link = linkWrap.querySelector(NAV_LINK);
      //if hover in append the background and add active classes
      if (hoverIn) {
        //get state
        let state = Flip.getState(bg);
        //append background and add active classes
        linkWrap.append(bg);
        link.classList.add(ACTIVE_CLASS);
        bg.classList.add(ACTIVE_CLASS);
        // animate
        Flip.from(state, {
          duration: menuHover ? 0.4 : 0,
          ease: 'power2.out',
        });
      } else {
        //if hover out remove active class
        link.classList.remove(ACTIVE_CLASS);
      }
    };
    //menu hover and tracking
    menu.addEventListener('mouseover', function () {
      menuHover = true;
    });
    menu.addEventListener('mouseleave', function () {
      menuHover = false;
      bg.classList.remove(ACTIVE_CLASS);
    });
    //link hover and flip
    linkWraps.forEach((linkWrap) => {
      linkWrap.addEventListener('mouseover', function () {
        activateLink(linkWrap);
      });
      linkWrap.addEventListener('mouseleave', function () {
        activateLink(linkWrap, false);
      });
    });
  };

  //////////////////////////////
  //Animations

  const focusText = function () {
    const TEXT_ITEM = '[data-ix-focus="text"]';
    const IMAGE_ITEM = '[data-ix-focus="image"]';
    const ACTIVE_CLASS = 'is-active';

    const textLinks = gsap.utils.toArray(TEXT_ITEM);
    const images = gsap.utils.toArray(IMAGE_ITEM);
    if (textLinks.length === 0 || images.length === 0) return;
    //utility function to activate active items
    const activateItems = function (activeIndex) {
      //remove all text and image active classes
      textLinks.forEach((item, index) => {
        console.log(item.classList, index);
        if (index === activeIndex) {
          item.classList.add(ACTIVE_CLASS);
        } else {
          item.classList.remove(ACTIVE_CLASS);
        }
      });
      images.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add(ACTIVE_CLASS);
        } else {
          item.classList.remove(ACTIVE_CLASS);
        }
      });
    };
    console.log(textLinks.length);
    //activate the first item on load
    activateItems(0);
    // listen for click events to activate items
    textLinks.forEach((textItem, textIndex) => {
      textItem.addEventListener('click', (event) => {
        activateItems(textIndex);
      });
    });
  };
  const missionText = function () {
    const WRAP = '[data-ix-mission="wrap"]';
    const TEXT = '[data-ix-mission="text"]';
    const SPAN = '[data-ix-mission="span"]';
    const ACTIVE_CLASS = 'is-active';

    const wrap = document.querySelector(WRAP);
    const text = document.querySelector(TEXT);
    const span = document.querySelector(SPAN);
    if (!wrap || !text || !span) return;
    //split the text
    const splitText = runSplit(text);
    if (!splitText) return;
    //remove active class
    span.classList.remove(ACTIVE_CLASS);

    const tl = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: 'power1.out',
      },
      scrollTrigger: {
        trigger: wrap,
        start: 'top 80%',
        end: 'bottom 90%',
        scrub: 1,
      },
    });
    tl.fromTo(
      splitText.words,
      {
        opacity: 0.2,
      },
      {
        opacity: 1,
        stagger: { each: 0.2, from: 'start' },
        onComplete: () => {
          span.classList.add(ACTIVE_CLASS);
        },
      }
    );
  };

  const teamModal = function () {
    //selectors
    const TRIGGER = '[data-ix-popup="trigger"]';
    const MODAL = '[data-ix-popup="modal"]';
    const MODAL_LAYOUT = '[data-ix-popup="modal-layout"]';
    const OVERLAY = '[data-ix-popup="overlay"]';
    const CLOSE = '[data-ix-popup="close"]';

    //options
    const ACTIVE_CLASS = 'is-active';
    const NO_SCROLL = 'no-scroll';
    const ID = 'data-ix-popup-id';
    const triggers = gsap.utils.toArray(TRIGGER);
    const modals = gsap.utils.toArray(MODAL);
    const body = document.querySelector('body');
    if (triggers.length === 0 || modals.length === 0) return;

    const modalTimeline = function (modal) {
      const closeBtn = modal.querySelector(CLOSE);
      const layout = modal.querySelector(MODAL_LAYOUT);
      const overlay = modal.querySelector(OVERLAY);
      if (!closeBtn || !layout || !overlay) return;
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.6,
          ease: 'power1.out',
        },
      });
      tl.set(modal, { display: 'none' });
      tl.set(modal, { display: 'block' });
      tl.fromTo(layout, { xPercent: 100 }, { xPercent: 0 });
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1 }, '<');
      return tl;
    };

    const openModal = function (modal, tl, open = true) {
      if (open) {
        tl.restart();
        modal.classList.add(ACTIVE_CLASS);
        body.classList.add(NO_SCROLL);
      } else {
        modal.classList.remove(ACTIVE_CLASS);
        body.classList.remove(NO_SCROLL);
        tl.reverse();
      }
    };
    function findModal(modals, itemId) {
      for (let i = 0; i < modals.length; i++) {
        if (modals[i].getAttribute('data-ix-popup-id') === itemId) {
          return modals[i];
        }
      }
      return null; // Return null if no matching modal found
    }

    triggers.forEach((trigger) => {
      const itemID = trigger.getAttribute(ID);
      const modal = findModal(modals, itemID);
      //get triggers inside the modal
      if (!modal) return;
      const closeBtn = modal.querySelector(CLOSE);
      const overlay = modal.querySelector(OVERLAY);
      if (!closeBtn || !overlay) return;
      console.log(modal);

      //make modal timeline
      const tl = modalTimeline(modal);
      //open modal on click

      trigger.addEventListener('click', function () {
        openModal(modal, tl, true);
      });
      //close modal on click
      overlay.addEventListener('click', function () {
        openModal(modal, tl, false);
      });
      closeBtn.addEventListener('click', function () {
        openModal(modal, tl, false);
      });
      window.addEventListener('keydown', (e) => {
        // if key is tab and the target is the password Button, focus on the password input
        if (e.key == 'Escape') {
          e.preventDefault();
          openModal(modal, tl, false);
        }
      });
    });
  };
  const approachHero = function () {
    const H1 = '[data-ix-approachhero="h1"]';
    //settings
    const ACTIVE_CLASS = 'is-active';
    const DURATION = 0.6;
    const headings = gsap.utils.toArray(H1);
    if (headings.length === 0) return;
    gsap.set(headings, { opacity: 1 });
    gsap.fromTo(
      headings,
      {
        y: '110%',
      },
      {
        y: '0%',
        duration: DURATION,
        ease: 'power1.out',
      }
    );
    setTimeout(() => {
      //get state
      let state = Flip.getState(headings, { props: 'color,fontVariations' });
      //append background and add active classes
      headings.forEach((item) => {
        item.classList.add(ACTIVE_CLASS);
      });
      // animate
      Flip.from(state, {
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });
    }, DURATION * 1000);
  };
  const approachCTA = function () {
    const WRAP = '[data-ix-cta="wrap"]';
    const IMAGE = '[data-ix-cta="image"]';
    const MASK = '[data-ix-cta="mask"]';
    const BUTTON = '[data-ix-cta="button"]';

    const wrap = document.querySelector(WRAP);
    const image = document.querySelector(IMAGE);
    const mask = document.querySelector(MASK);
    const button = document.querySelector(BUTTON);
    if (!wrap || !image || !mask) return;

    //scroll based animation
    const scrollTl = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: 'power1.out',
      },
      scrollTrigger: {
        trigger: wrap,
        start: 'top 70%',
        end: 'top top',
        scrub: 1,
      },
    });
    scrollTl.to(mask, {
      width: '100%',
      height: '100%',
      borderRadius: '0px',
    });

    if (!button) return;
    //hover event listener for button
    const hoverTL = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.6,
        ease: 'power1.out',
      },
    });
    hoverTL.to(image, {
      scale: 1.5,
      duration: 15,
    });

    button.addEventListener('mouseover', function () {
      hoverTL.play();
    });
    button.addEventListener('mouseout', function () {
      hoverTL.reverse();
    });
  };

  //////////////////////////////
  //swiper

  const homeInvestmentsSlider = function () {
    //selectors
    const SWIPER = '.home_investments_slider';
    const SWIPER_LIST_WRAP = '.investments_slider_list_wrap';
    const HEADING_ITEM = '.investments_heading_item';
    const SUBHEADING_ITEM = '.investments_sub_item';
    const nextButton = '.swiper-next';
    const previousButton = '.swiper-prev';
    //class options
    const activeClass = 'is-active';
    const nextClass = 'is-next';
    const prevClass = 'is-prev';
    const afterClass = 'is-after';
    const beforeClass = 'is-before';
    const disabledClass = 'is-disabled';
    //function to animate text
    const updateText = function (swiper, list) {
      const activeIndex = swiper.activeIndex;
      list.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add(activeClass);
          gsap.fromTo(
            item,
            {
              y: '2rem',
              opacity: 0,
            },
            {
              y: '0rem',
              opacity: 1,
              delay: 0.2,
              duration: 0.6,
              ease: 'power1.out',
            }
          );
        } else {
          item.classList.remove(activeClass);
          gsap.to(item, {
            y: '-2rem',
            opacity: 0,
            duration: 0.6,
            ease: 'power1.out',
          });
        }
      });
    };
    //Utility function to activate perspective slides
    const activateSlides = function (swiper) {
      const activeIndex = swiper.activeIndex;
      // console.log(activeIndex);
      //remove before and after classes
      swiper.slides.forEach((slide, index) => {
        // console.log('item index:', index);
        //remove previous and next class
        slide.classList.remove(beforeClass);
        slide.classList.remove(afterClass);
        //check if before or active
        if (index < activeIndex) {
          slide.classList.add(beforeClass);
        }
        if (index > activeIndex) {
          slide.classList.add(afterClass);
        }
      });
    };

    //get swipers
    const swipers = gsap.utils.toArray(SWIPER);
    swipers.forEach(function (swiper) {
      if (!swiper) return;
      const imageSwiperWrap = swiper.querySelector(SWIPER_LIST_WRAP);
      const headings = swiper.querySelectorAll(HEADING_ITEM);
      const subHeadings = swiper.querySelectorAll(SUBHEADING_ITEM);

      //get navication sliderLists
      const nextButtonEl = swiper.querySelector(nextButton);
      const previousButtonEl = swiper.querySelector(previousButton);
      // if navigation sliderLists don't exist return
      if (!nextButtonEl || !previousButtonEl || !imageSwiperWrap) return;
      const imageSwiper = new Swiper(imageSwiperWrap, {
        modules: [Navigation, EffectCreative],
        slidesPerView: 'auto',
        // spaceBetween: '-5%',
        speed: 800,
        centeredSlides: true,
        loop: true,
        normalizeSlideIndex: true,
        // initialSlide: 0,
        // loopAdditionalSlides: 5,
        allowTouchMove: false,
        followFinger: false,
        freeMode: false,
        updateOnMove: false,
        draggable: false,
        rewind: false,
        effect: 'creative',
        creativeEffect: {
          perspective: false,
          limitProgress: 10,
          next: {
            // Array with translate X, Y and Z values
            translate: ['75%', 0, 0],
          },
          prev: {
            // Array with translate X, Y and Z values
            translate: ['-75%', 0, 0],
          },
        },
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: disabledClass,
        },
        slideActiveClass: activeClass,
        slideDuplicateActiveClass: activeClass,
        slideNextClass: nextClass,
        slidePrevClass: prevClass,
        on: {
          afterInit: function (imageSwiper) {
            activateSlides(imageSwiper);
            updateText(imageSwiper, headings);
            updateText(imageSwiper, subHeadings);
          },
          slideChangeTransitionStart: function (imageSwiper) {
            activateSlides(imageSwiper);
            updateText(imageSwiper, headings);
            updateText(imageSwiper, subHeadings);
          },
        },
      });
    });
  };

  const portfolioSlider = function () {
    //selectors
    const SWIPER = '.portfolio_slider_layout';
    const SWIPER_LIST_WRAP = '.portfolio_slider_list_wrap';
    const HEADING_ITEM = '.portfolio_heading_item';
    const SUBHEADING_ITEM = '.portfolio_sub_item';
    //class options
    const activeClass = 'is-active';
    const nextClass = 'is-next';
    const prevClass = 'is-prev';
    const afterClass = 'is-after';
    const beforeClass = 'is-before';
    //animation options
    const DURATION = 0.8;
    const DURATION_MS = DURATION * 1000;

    //Utility function to activate perspective slides
    const clickListener = function (swiper, headings, subHeadings) {
      headings.forEach((heading, index) => {
        heading.addEventListener('click', (event) => {
          swiper.slideToLoop(index, DURATION_MS, true);
        });
      });
    };
    const updateText = function (headings, subHeadings, activeIndex) {
      headings.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add(activeClass);
        } else {
          item.classList.remove(activeClass);
        }
      });
      subHeadings.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add(activeClass);
        } else {
          item.classList.remove(activeClass);
        }
      });
    };
    //Utility function to activate perspective slides
    const activateSlides = function (swiper) {
      const activeIndex = swiper.activeIndex;
      //remove before and after classes
      swiper.slides.forEach((slide, index) => {
        //remove previous and next class
        slide.classList.remove(beforeClass);
        slide.classList.remove(afterClass);
        //check if before or active
        if (index < activeIndex) {
          slide.classList.add(beforeClass);
        }
        if (index > activeIndex) {
          slide.classList.add(afterClass);
        }
      });
    };

    //get swipers
    const swipers = gsap.utils.toArray(SWIPER);
    swipers.forEach(function (swiper) {
      if (!swiper) return;
      const imageSwiperWrap = swiper.querySelector(SWIPER_LIST_WRAP);
      const headings = swiper.querySelectorAll(HEADING_ITEM);
      const subHeadings = swiper.querySelectorAll(SUBHEADING_ITEM);

      if (!imageSwiperWrap) return;
      const imageSwiper = new Swiper(imageSwiperWrap, {
        modules: [Autoplay, EffectCreative],
        slidesPerView: 1,
        loop: true,
        speed: DURATION_MS,
        normalizeSlideIndex: true,
        allowTouchMove: false,
        autoplay: { delay: 3000 },
        effect: 'creative',
        creativeEffect: {
          perspective: false,
          limitProgress: 10,
          next: {
            translate: ['12vw', 0, 0],
          },
          prev: {
            translate: ['-12vw', 0, 0],
          },
        },
        slideActiveClass: activeClass,
        slideDuplicateActiveClass: activeClass,
        slideNextClass: nextClass,
        slidePrevClass: prevClass,
        on: {
          afterInit: function (imageSwiper) {
            activateSlides(imageSwiper);
            updateText(headings, subHeadings, imageSwiper.activeIndex);
          },
          slideChangeTransitionStart: function (imageSwiper) {
            activateSlides(imageSwiper);
            updateText(headings, subHeadings, imageSwiper.activeIndex);
          },
        },
      });
      // imageSwiper.start();

      clickListener(imageSwiper, headings, subHeadings);
    });
  };

  const approachTestimonialSlider = function () {
    //selectors
    const SWIPER = '.testimonials_slider';
    const SWIPER_LIST_WRAP = '.testimonials_list_wrap';
    const nextButton = '.swiper-next';
    const previousButton = '.swiper-prev';
    const bulletsWrapClass = '.swiper-bullet-wrapper';
    //class options
    const activeClass = 'is-active';
    const disabledClass = 'is-disabled';
    //get swipers
    const swipers = gsap.utils.toArray(SWIPER);
    swipers.forEach(function (swiper) {
      if (!swiper) return;
      const swiperList = swiper.querySelector(SWIPER_LIST_WRAP);
      //get navigation elements
      const nextButtonEl = swiper.querySelector(nextButton);
      const previousButtonEl = swiper.querySelector(previousButton);
      const bulletWrapEl = swiper.querySelector(bulletsWrapClass);

      // if navigation sliderLists don't exist return
      if (!nextButtonEl || !previousButtonEl || !swiperList) return;
      const testimonialSwiper = new Swiper(swiperList, {
        modules: [Navigation, Pagination, EffectCreative],
        slidesPerView: 1,
        speed: 800,
        centeredSlides: true,
        loop: true,
        normalizeSlideIndex: true,
        allowTouchMove: false,
        followFinger: false,
        freeMode: false,
        updateOnMove: false,
        draggable: true,
        rewind: false,
        effect: 'creative',
        creativeEffect: {
          perspective: true,
          limitProgress: 1,
          next: {
            // Array with translate X, Y and Z values
            translate: ['60%', 0, 0],
            rotate: [0, -75, 0],
            opacity: 0,
            scale: 0.75,
          },
          prev: {
            // Array with translate X, Y and Z values
            translate: ['-60%', 0, 0],
            rotate: [0, 75, 0],
            opacity: 0,
            scale: 0.75,
          },
        },
        pagination: {
          el: bulletWrapEl,
          bulletActiveClass: activeClass,
          bulletClass: 'swiper-bullet',
          bulletElement: 'button',
          clickable: true,
        },
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: disabledClass,
        },
        slideActiveClass: activeClass,
        slideDuplicateActiveClass: activeClass,
      });
    });
  };

  // const investmentsHeroSlider = function () {
  //   const sliderWrap = '.home_investments_slider.swiper';
  //   const nextButton = '.swiper-next';
  //   const previousButton = '.swiper-prev';
  //   const activeClass = 'is-active';
  //   const nextClass = 'is-next';
  //   const prevClass = 'is-prev';
  //   const disabledClass = 'is-disabled';
  //   const bulletsWrapClass = '.swiper-bullet-wrapper';

  //   gsap.utils.toArray(sliderWrap).forEach(function (slider) {
  //     if (!slider) return;
  //     //get navication sliders
  //     const nextButtonEl = slider.querySelector(nextButton);
  //     const previousButtonEl = slider.querySelector(previousButton);
  //     const bulletWrapEl = slider.querySelector(bulletsWrapClass);
  //     // if navigation sliders don't exist return
  //     if (!nextButtonEl || !previousButtonEl) return;
  //     const swiper = new Swiper(slider, {
  //       modules: [Navigation, Pagination],
  //       slidesPerView: 1,
  //       spaceBetween: '5%',
  //       speed: 600,
  //       centeredSlides: true,
  //       loop: true,
  //       drag: false,
  //       followFinger: false,
  //       freeMode: false,
  //       updateOnMove: true,
  //       rewind: false,
  //       effect: 'creative',
  //       creativeEffect: {
  //         perspective: true,
  //         next: {
  //           // Array with translate X, Y and Z values
  //           translate: [0, 0, 0],
  //           // Array with rotate X, Y and Z values (in deg)
  //           rotate: [0, 24, 0],
  //           opacity: 0.5,
  //         },
  //         prev: {
  //           // Array with translate X, Y and Z values
  //           translate: [0, 0, 0],
  //           // Array with rotate X, Y and Z values (in deg)
  //           rotate: [0, 24, 0],
  //           opacity: 0.5,
  //         },
  //       },
  //       pagination: {
  //         el: bulletWrapEl,
  //         bulletActiveClass: activeClass,
  //         bulletClass: 'swiper-bullet',
  //         bulletElement: 'button',
  //         clickable: true,
  //       },
  //       navigation: {
  //         nextEl: nextButtonEl,
  //         prevEl: previousButtonEl,
  //         disabledClass: disabledClass,
  //       },
  //       slideActiveClass: activeClass,
  //       slideDuplicateActiveClass: activeClass,
  //       slideNextClass: nextClass,
  //       slidePrevClass: prevClass,
  //     });
  //   });
  // };

  //////////////////////////////
  //Control Functions on page load
  const gsapInit = function () {
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px)  and (max-width: 991px)',
        isDesktop: '(min-width: 992px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (gsapContext) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
        // Resuable Animations
        accordion(gsapContext);
        hoverActive(gsapContext);
        //Custom Animations
        focusText();
        missionText();
        approachHero();
        approachCTA();
        teamModal();
        navColorScroll();
        homeInvestmentsSlider();
        approachTestimonialSlider();
        portfolioSlider();
        //optional animations
        if (!reduceMotion) {
          mouseOver(gsapContext);
          parallax(gsapContext);
          scrollIn(gsapContext);
          scrolling(gsapContext);
          countUp(gsapContext);
          //optional desktop only
          if (isDesktop) {
            navLinkHover();
          }
        }
      }
    );
  };
  gsapInit();

  const resetScrollTriggers = document.querySelectorAll('[data-ix-reset]');
  //reset gsap on click of reset triggers
  resetScrollTriggers.forEach(function (item) {
    item.addEventListener('click', function (e) {
      ScrollTrigger.refresh();
    });
  });
});
