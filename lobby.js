import './sass/style.scss';

window.addEventListener('load', () => {
  'use strict';

  const $ = s => {
    const n = s.slice(1);
    switch (s.charAt(0)) {
      case '.':
        return document.getElementsByClassName(n);
      case '#':
        return document.getElementById(n);
      default:
        break;
    }
  };

  const switcher = $('#bottom');
  const loadmask = $('#loadmask');
  let firstView = true;
  let aboutHasBeenTyped = false;
  let oldY = 0;
  let currentPopup = null;
  let maxH = window.innerHeight - 65;
  // const titleHeight = $('#title').offsetHeight;
  const isMobile = (typeof window.orientation !== "undefined") ||
    (navigator.userAgent.indexOf('IEMobile') !== -1);


  loadmask.style.transitionDuration = '1s';
  loadmask.style.opacity = 0;
  setTimeout(() => { loadmask.style.display = 'none'; }, 1000);
  setTimeout(() => {
    window.scrollTo({ top: '0px', behavior: 'instant' });
  }, 0);
  $('#activities').style.height = window.innerHeight - 70 - 50 + 'px';

  window.addEventListener('scroll', (e) => {
    const st = window.scrollY;
    const max = $('#activities').clientHeight;
    $('#activities').style.opacity = (max - st) / max;
    norm();
  });

  const norm = () => {
    setTimeout(() => {
      if ($('#about').offsetHeight < maxH / 2 && !firstView) {
        firstView = false;
        $('#toggle-view').click();
      }
      if ($('#about').offsetHeight >= maxH / 2 && firstView) {
        firstView = true;
        $('#toggle-view').click();
      }
      if ($('#about').offsetHeight > maxH + 1)
        $('#about').style.height = maxH + 'px';

    }, 100);
  };

  window.addEventListener('wheel', ({ deltaY }) => {
    if ((deltaY > 0 && firstView) || (deltaY < 0 && !firstView)) {
      $('#toggle-view').click();
    }
  });

  window.addEventListener('backbutton', () => {
    document.body.style.backgroundColor = 'purple';
    
  });

  $('#main2').addEventListener('touchstart', (e) => {
    oldY = e.touches[0].clientY;
    startH = $('#about').offsetHeight;
  });

  $('#main2').addEventListener('touchmove', (e) => {
    // $('#about').style.height = startH -
    //   (e.targetTouches[0].clientY - oldY) * 1 + 'px';
    // norm();
    const nowY = e.touches[0].clientY;
    if ((oldY - nowY > 0 && firstView) || (oldY - nowY < 0 && !firstView)) {
      $('#toggle-view').click();
    }
  });

  $('#toggle-view').addEventListener('click', () => {
    typePortfolio();
    firstView = !firstView;
    const arrow = $('#toggle-view').firstElementChild;
    if (firstView) {
      $('#toggle-view').firstChild.textContent = 'about';
      $('#about').style.height = '0px';
      arrow.style.transform = 'rotateX(0deg)';
    } else {
      $('#toggle-view').firstChild.textContent = 'main';
      $('#about').style.height = maxH + 'px';
      arrow.style.transform = 'rotateX(180deg)';
    }
  })

  const switchlayout = () => {
    firstView = !firstView;
    const button = switcher.firstElementChild;
    if (firstView) {
      window.scrollBy({ top: -window.innerHeight + titleHeight, behavior: 'smooth' });
      button.style.transform = 'translateY(0px)';
      button.children[0].textContent = 'about';
      button.children[1].style.transform = 'rotateX(0deg)';
    } else {
      window.scrollBy({ top: window.innerHeight - titleHeight, behavior: 'smooth' });
      button.style.transform = 'translateY(40px)';
      button.children[0].textContent = 'main';
      button.children[1].style.transform = 'rotateX(180deg)';
      if (!aboutHasBeenTyped) {
        aboutHasBeenTyped = true;
        typePortfolio();
      }
    }

  };

  const showPopup = (el) => {
    currentPopup = el;
    el.style.display = 'block';
    el.style.animationName = 'showPopup';
  };

  const hidePopup = (el) => {
    el.style.animationName = 'hidePopup';
    el.showing = false;
    setTimeout(() => {
      el.style.display = 'none';
    }, 500);
    currentPopup = null;
  };

  const typePortfolio = () => {
    if (aboutHasBeenTyped) return;
    aboutHasBeenTyped = true;
    const portfolio = document.getElementById('about').children[1];
    portfolio.style.visibility = 'visible';
    const blocks = portfolio.children;
    const texts = Array.prototype.map.call(blocks, t => {
      const tt = t.textContent;
      t.textContent = '';
      return tt;
    });

    const type = (i) => {
      if (i >= texts.length) {
        return;
      }
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

  const popups = $('.popup');
  const activities = $('.activity');

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

  const carousels = $('.carousel');

  Array.prototype.forEach.call(carousels, (el, i) => {
    const imgs = el.getAttribute('urls').split(' ');
    let ind = 0;
    el.style.backgroundImage = `url(${imgs[ind++]})`;
    setInterval(() => {
      el.style.backgroundImage = `url(${imgs[ind++]})`;
      if (ind >= imgs.length) ind = 0;
    }, Math.round(10000 / imgs.length));

  });

});

