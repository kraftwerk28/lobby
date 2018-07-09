'use strict';

const $ = (s) => document.getElementById(s);

const switcher = $('bottom');
const loadmask = $('loadmask');
let currentPopup = null;
let firstView = true;
let oldScroll = 0;
let aboutHasBeenTyped = false;
const isMobile = (typeof window.orientation !== "undefined") ||
  (navigator.userAgent.indexOf('IEMobile') !== -1);

window.addEventListener('load', () => {
  loadmask.style.transitionDuration = '1s';
  loadmask.style.opacity = 0;
  setInterval(() => { loadmask.style.display = 'none'; }, 1000);
});

window.addEventListener('scroll', (e) => {
  const st = window.scrollY;
  if ((st > oldScroll && firstView) || (st < oldScroll && !firstView)) {
    e.preventDefault();
    switchlayout();
  }
  oldScroll = st;
});

document.addEventListener('backbutton', (e) => {
  if (currentPopup) {
    e.preventDefault();
    hidePopup(currentPopup);
  }
});

// if (isMobile) {
//   window.addEventListener('touchstart', (e) => {
//     e.preventDefault()
//   });
// }

window.addEventListener('wheel', (e) => {
  if ((e.deltaY > 0 && firstView) || (e.deltaY < 0 && !firstView)) {
    switchlayout();
  }
});

const switchlayout = () => {
  firstView = !firstView;
  const button = switcher.firstElementChild;
  if (firstView) {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    button.style.transform = 'translateY(0px)';
    button.children[0].textContent = 'about';
    button.children[1].style.transform = 'rotateX(0deg)';
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    button.style.transform = 'translateY(40px)';
    button.children[0].textContent = 'main';
    button.children[1].style.transform = 'rotateX(180deg)';
    if (!aboutHasBeenTyped) {
      aboutHasBeenTyped = true;
      typePortfolio();
    }
  }

};

const showabout = () => {
  switchlayout();
};

const showPopup = (el) => {
  currentPopup = el;
  el.style.display = 'block';
  el.firstElementChild.style.animationName = 'showPopup';
};

const hidePopup = (el) => {
  const div = el.firstElementChild;
  div.style.animationName = 'hidePopup';
  el.showing = false;
  setTimeout(() => {
    el.style.display = 'none';
  }, 500);
  currentPopup = null;
};

const typePortfolio = () => {
  const portfolio = document.getElementById('about');
  const blocks = portfolio.children;
  const texts = Array.prototype.map.call(blocks, t => {
    const tt = t.textContent;
    t.textContent = '';
    return tt;
  });

  let i = 0;

  const type = (i) => {
    if (i >= texts.length) return;
    const txt = texts[i];
    let symbol = 0;
    const t = setInterval(() => {
      blocks[i].textContent += txt[symbol++];
      if (symbol >= txt.length) {
        clearInterval(t);
        type(++i);
      }
    }, 15);
  };
  type(0);
};

const popups = document.getElementsByClassName('popup');

Array.prototype.forEach.call(popups, (el) => {
  const div = el.firstElementChild;
  const close = div.firstElementChild;
  close.onclick = (e) => {
    e.preventDefault();
    hidePopup(el);
  };
  el.onclick = (e) => {
    if (e.target === el)
      hidePopup(el);
  };
});

const activities = document.getElementsByClassName('activity');

Array.prototype.forEach.call(activities, (el, i) => {
  el.expanded = false;
  el.pos = el.getBoundingClientRect();
  el.onclick = () => {
    el.expanded = !el.expanded;
    if (el.expanded) {
    } else {
    }
    showPopup(popups[i]);
  };
});
