import { attr, runSplit } from './utilities';
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
        hoverActive(gsapContext);
        mouseOver(gsapContext);
        parallax(gsapContext);
        scrollIn(gsapContext);
        scrolling(gsapContext);
        countUp(gsapContext);
        //Custom Animations
        missionText();
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
