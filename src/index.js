import { attr, runSplit } from './utilities';
import { accordion } from './interactions/accordion';
import { hoverActive } from './interactions/hoverActive';
import { countUp } from './interactions/countUp';
import { mouseOver } from './interactions/mouseOver';
import { parallax } from './interactions/parallax';
import { scrollIn } from './interactions/scrollIn';
import { scrolling } from './interactions/scrolling';

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
      } else {
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
          markers: true,
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

  //////////////////////////////
  //Animations
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
        mouseOver(gsapContext);
        parallax(gsapContext);
        scrollIn(gsapContext);
        scrolling(gsapContext);
        countUp(gsapContext);
        //Custom Animations
        missionText();
        approachCTA();
        // navColorScroll();
        //or control animations globally in match media
        if (!reduceMotion) {
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
