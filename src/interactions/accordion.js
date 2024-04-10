import { attr, checkBreakpoints } from '../utilities';

export const accordion = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'accordion';
  //elements
  const ACCORDION_WRAP = '[data-ix-accordion="wrap"]';
  const ACCORDION_ITEM = '[data-ix-accordion="item"]';
  const ACCORDION_TOP = '[data-ix-accordion="top"]';
  const ACCORDION_BOTTOM = '[data-ix-accordion="bottom"]';

  //options
  const OPTION_FIRST_OPEN = 'data-ix-accordion-first-open';
  const OPTION_ONE_ACTIVE = 'data-ix-accordion-one-active';
  const OPTION_KEEP_ONE_OPEN = 'data-ix-accordion-keep-one-open';
  const OPTION_HOVER_OPEN = 'data-ix-accordion-hover';
  const ACTIVE_CLASS = 'is-active';
  const accordionLists = gsap.utils.toArray(ACCORDION_WRAP);

  // utility function to open or close accordions
  const openAccordion = function (item, open = true) {
    if (open === true) {
      item.classList.add(ACTIVE_CLASS);
    } else {
      item.classList.remove(ACTIVE_CLASS);
    }
  };
  ////////////////////////
  // event logic
  if (accordionLists.length === 0 || accordionLists === undefined) return;
  accordionLists.forEach((list) => {
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(list, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    // set up conditions for
    let firstOpen = attr(false, list.getAttribute(OPTION_FIRST_OPEN));
    let oneActive = attr(false, list.getAttribute(OPTION_ONE_ACTIVE));
    let keepOneOpen = attr(false, list.getAttribute(OPTION_KEEP_ONE_OPEN));
    let hoverOnly = attr(false, list.getAttribute(OPTION_HOVER_OPEN));
    //get the first accordion item and all of the items
    const accordionItems = list.querySelectorAll(ACCORDION_ITEM);
    if (accordionItems.length === 0) return;
    const firstItem = list.firstElementChild;
    if (firstOpen) {
      openAccordion(firstItem);
    }
    if (!hoverOnly) {
      // Add event listener for when accordion lists are clicked
      list.addEventListener('click', function (e) {
        // check if the clicked element was the top of an accordion and get that accordion
        const clickedEl = e.target.closest(ACCORDION_TOP);
        if (!clickedEl) return;
        // get all the accordions within this list and the active item
        const clickedItem = clickedEl.closest(ACCORDION_ITEM);
        // check if the clicked item is already active
        let clickedItemAlreadyActive = clickedItem.classList.contains(ACTIVE_CLASS);
        // if item is NOT ACTIVE
        if (!clickedItemAlreadyActive) {
          // check if oneActive is True
          if (oneActive) {
            // if one active is true loop through each item
            accordionItems.forEach((item) => {
              //if item is the current item Open
              if (item === clickedItem) {
                openAccordion(item);
              }
              //otherwise remove active class and close
              else {
                openAccordion(item, false);
              }
            });
          }
          if (!oneActive) {
            // if one active is false just set the current item to active and open it
            openAccordion(clickedItem);
          }
        }
        // if the current item IS ACTIVE and keep one open is false
        if (clickedItemAlreadyActive && !keepOneOpen) {
          openAccordion(clickedItem, false);
        }
      });
    }
    if (hoverOnly) {
      const accordionItems = list.querySelectorAll(ACCORDION_ITEM);
      accordionItems.forEach((item) => {
        item.addEventListener('mouseover', function () {
          openAccordion(item);
        });
        item.addEventListener('mouseout', function () {
          openAccordion(item, false);
        });
      });
    }
  });
};
