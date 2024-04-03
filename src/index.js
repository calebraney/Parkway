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
        //Custom Animations
        missionText();
        approachCTA();
        navColorScroll();
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
