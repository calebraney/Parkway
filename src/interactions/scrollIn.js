import { attr, checkBreakpoints, runSplit } from '../utilities';

export const scrollIn = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrollin';
  // selectors
  const SCROLLIN_ELEMENT = 'data-ix-scrollin';
  // types of scrolling elements (value for scrollin element attribute)
  const SCROLLIN_HEADING = 'heading';
  const SCROLLIN_ITEM = 'item';
  const SCROLLIN_CONTAINER = 'container';
  const SCROLLIN_STAGGER = 'stagger';
  const SCROLLIN_RICH_TEXT = 'rich-text';
  const SCROLLIN_IMAGE_WRAP = 'image-wrap';
  const SCROLLIN_IMAGE = 'image';
  const SCROLLIN_LINE = 'line';

  //options
  const SCROLL_TOGGLE_ACTIONS = 'data-ix-scrollin-toggle-actions';
  const SCROLL_SCRUB = 'data-ix-scrollin-scrub';
  const SCROLL_START = 'data-ix-scrollin-start';
  const SCROLL_END = 'data-ix-scrollin-end';
  const CLIP_DIRECTION = 'data-ix-scrollin-direction';

  //resuable timeline creation with option attributes for individual customization per element
  const scrollInTL = function (item) {
    // default GSAP options
    const settings = {
      scrub: false,
      toggleActions: 'play none none none',
      start: 'top 90%',
      end: 'top 75%',
    };
    //override settings if an attribute is present and a valid type.
    settings.toggleActions = attr(settings.toggleActions, item.getAttribute(SCROLL_TOGGLE_ACTIONS));
    settings.scrub = attr(settings.scrub, item.getAttribute(SCROLL_SCRUB));
    settings.start = attr(settings.start, item.getAttribute(SCROLL_START));
    settings.end = attr(settings.end, item.getAttribute(SCROLL_END));
    const tl = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: 'power1.out',
      },
      scrollTrigger: {
        trigger: item,
        start: settings.start,
        end: settings.end,
        toggleActions: settings.toggleActions,
        scrub: settings.scrub,
      },
    });
    return tl;
  };

  //resuable timeline creation with option attributes for individual customization per element
  const defaultTween = function (item, tl, options = {}) {
    const varsFrom = {
      opacity: 0,
      x: '1rem',
      skewX: -5,
    };
    const varsTo = {
      opacity: 1,
      x: '0rem',
      skewX: 0,
    };
    //optional adjustments to the tween
    // {stagger: large}
    if (options.stagger === true) {
      varsTo.stagger = { each: 0.1, from: 'start' };
    }
    // {skew: 'large'}
    if (options.skew === 'large') {
      varsFrom.skewX = -25;
    }

    // default GSAP options
    const tween = tl.fromTo(item, varsFrom, varsTo);
    return tween;
  };

  const scrollInHeading = function (item) {
    //split the text
    const splitText = runSplit(item);
    if (!splitText) return;
    //set heading to full opacity (check to see if needed)
    // item.style.opacity = 1;
    const tl = scrollInTL(item);
    const tween = defaultTween(splitText.words, tl, { stagger: true, skew: 'large' });
    //add event calleback to revert text on completion
    tl.eventCallback('onComplete', () => {
      splitText.revert();
    });
  };

  const scrollInItem = function (item) {
    if (!item) return;
    const tl = scrollInTL(item);
    const tween = defaultTween(item, tl);
  };

  //utility function to get the clipping direction of items (horizontal or vertical only)
  const getCLipStart = function (item) {
    //set defautl direction
    let defaultDirection = 'right';
    let clipStart;
    //get the clip direction
    const direction = attr(defaultDirection, item.getAttribute(CLIP_DIRECTION));
    const clipDirections = {
      left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    };
    //check for each possible direction and map it to the correct clipping value
    if (direction === 'left') {
      clipStart = clipDirections.left;
    }
    if (direction === 'right') {
      clipStart = clipDirections.right;
    }
    if (direction === 'top') {
      clipStart = clipDirections.top;
    }
    if (direction === 'bottom') {
      clipStart = clipDirections.bottom;
    }
    return clipStart;
  };

  const scrollInImage = function (item) {
    //item is the image wrap for this animation
    if (!item) return;
    //set clip path directions
    const clipStart = getCLipStart(item);
    const clipEnd = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    //create timeline
    const tl = scrollInTL(item);
    tl.fromTo(
      item,
      {
        clipPath: clipStart,
      },
      {
        clipPath: clipEnd,
        duration: 1,
      }
    );
  };

  const scrollInLine = function (item) {
    if (!item) return;
    //set clip path directions
    const clipStart = getCLipStart(item);
    const clipEnd = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    //create timeline
    const tl = scrollInTL(item);
    tl.fromTo(
      item,
      {
        clipPath: clipStart,
      },
      {
        clipPath: clipEnd,
      }
    );
  };

  const scrollInContainer = function (item) {
    if (!item) return;
    //get the children of the item
    const children = gsap.utils.toArray(item.children);
    if (children.length === 0) return;
    children.forEach((child) => {
      const tl = scrollInTL(child);
      const tween = defaultTween(child, tl);
    });
  };

  const scrollInStagger = function (item) {
    if (!item) return;

    // get the children of the item
    const children = gsap.utils.toArray(item.children);
    if (children.length === 0) return;
    const tl = scrollInTL(item);
    const tween = defaultTween(children, tl, { stagger: true });
  };

  const scrollInRichText = function (item) {
    if (!item) return;
    //get the children of the item
    const children = gsap.utils.toArray(item.children);
    if (children.length === 0) return;
    children.forEach((child) => {
      const childTag = child.tagName;
      console.log(childTag);
      //apply the items animation based on the child type
      if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(childTag)) {
        scrollInHeading(child);
      }
      if (childTag === 'FIGURE') {
        scrollInImage(child);
      } else {
        scrollInItem(child);
      }
    });
  };

  //get all elements and apply animations
  const items = gsap.utils.toArray(`[${SCROLLIN_ELEMENT}]`);
  items.forEach((item) => {
    if (!item) return;
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    //find the type of the scrolling animation
    const scrollInType = item.getAttribute(SCROLLIN_ELEMENT);
    if (scrollInType === SCROLLIN_HEADING) {
      scrollInHeading(item);
    }
    if (scrollInType === SCROLLIN_ITEM) {
      scrollInItem(item);
    }
    if (scrollInType === SCROLLIN_IMAGE) {
      scrollInImage(item);
    }
    if (scrollInType === SCROLLIN_LINE) {
      scrollInLine(item);
    }
    if (scrollInType === SCROLLIN_CONTAINER) {
      scrollInContainer(item);
    }
    if (scrollInType === SCROLLIN_STAGGER) {
      scrollInStagger(item);
    }
    if (scrollInType === SCROLLIN_RICH_TEXT) {
      scrollInRichText(item);
    }
  });
};
