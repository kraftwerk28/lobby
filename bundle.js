/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lobby.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lobby.js":
/*!******************!*\
  !*** ./lobby.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.addEventListener('load', () => {\n  'use strict';\n\n  const $ = s => {\n    const n = s.slice(1);\n    switch (s.charAt(0)) {\n      case '.':\n        return document.getElementsByClassName(n);\n      case '#':\n        return document.getElementById(n);\n      default:\n        break;\n    }\n  };\n\n  const switcher = $('#bottom');\n  const loadmask = $('#loadmask');\n  let firstView = true;\n  let aboutHasBeenTyped = false;\n  let oldY = 0;\n  let currentPopup = null;\n  let maxH = window.innerHeight - 65;\n  // const titleHeight = $('#title').offsetHeight;\n  const isMobile = (typeof window.orientation !== \"undefined\") ||\n    (navigator.userAgent.indexOf('IEMobile') !== -1);\n\n\n  loadmask.style.transitionDuration = '1s';\n  loadmask.style.opacity = 0;\n  setTimeout(() => { loadmask.style.display = 'none'; }, 1000);\n  setTimeout(() => {\n    window.scrollTo({ top: '0px', behavior: 'instant' });\n  }, 0);\n  $('#activities').style.height = window.innerHeight - 70 - 50 + 'px';\n\n  window.addEventListener('scroll', (e) => {\n    const st = window.scrollY;\n    const max = $('#activities').clientHeight;\n    $('#activities').style.opacity = (max - st) / max;\n    norm();\n  });\n\n  const norm = () => {\n    setTimeout(() => {\n      if ($('#about').offsetHeight < maxH / 2 && !firstView) {\n        firstView = false;\n        $('#toggle-view').click();\n      }\n      if ($('#about').offsetHeight >= maxH / 2 && firstView) {\n        firstView = true;\n        $('#toggle-view').click();\n      }\n      if ($('#about').offsetHeight > maxH + 1)\n        $('#about').style.height = maxH + 'px';\n\n    }, 100);\n  };\n\n  window.addEventListener('wheel', ({ deltaY }) => {\n    if ((deltaY > 0 && firstView) || (deltaY < 0 && !firstView)) {\n      $('#toggle-view').click();\n    }\n  });\n\n  $('#main2').addEventListener('touchstart', (e) => {\n    oldY = e.touches[0].clientY;\n    startH = $('#about').offsetHeight;\n  });\n\n  $('#main2').addEventListener('touchmove', (e) => {\n    // $('#about').style.height = startH -\n    //   (e.targetTouches[0].clientY - oldY) * 1 + 'px';\n    // norm();\n    const nowY = e.touches[0].clientY;\n    if ((oldY - nowY > 0 && firstView) || (oldY - nowY < 0 && !firstView)) {\n      $('#toggle-view').click();\n    }\n  });\n\n  $('#toggle-view').addEventListener('click', () => {\n    typePortfolio();\n    firstView = !firstView;\n    const arrow = $('#toggle-view').firstElementChild;\n    if (firstView) {\n      $('#toggle-view').firstChild.textContent = 'about';\n      $('#about').style.height = '0px';\n      arrow.style.transform = 'rotateX(0deg)';\n    } else {\n      $('#toggle-view').firstChild.textContent = 'main';\n      $('#about').style.height = maxH + 'px';\n      arrow.style.transform = 'rotateX(180deg)';\n    }\n  })\n\n  const switchlayout = () => {\n    firstView = !firstView;\n    const button = switcher.firstElementChild;\n    if (firstView) {\n      window.scrollBy({ top: -window.innerHeight + titleHeight, behavior: 'smooth' });\n      button.style.transform = 'translateY(0px)';\n      button.children[0].textContent = 'about';\n      button.children[1].style.transform = 'rotateX(0deg)';\n    } else {\n      window.scrollBy({ top: window.innerHeight - titleHeight, behavior: 'smooth' });\n      button.style.transform = 'translateY(40px)';\n      button.children[0].textContent = 'main';\n      button.children[1].style.transform = 'rotateX(180deg)';\n      if (!aboutHasBeenTyped) {\n        aboutHasBeenTyped = true;\n        typePortfolio();\n      }\n    }\n\n  };\n\n  const showPopup = (el) => {\n    currentPopup = el;\n    el.style.display = 'block';\n    el.firstElementChild.style.animationName = 'showPopup';\n  };\n\n  const hidePopup = (el) => {\n    const div = el.firstElementChild;\n    div.style.animationName = 'hidePopup';\n    el.showing = false;\n    setTimeout(() => {\n      el.style.display = 'none';\n    }, 500);\n    currentPopup = null;\n  };\n\n  const typePortfolio = () => {\n    if (aboutHasBeenTyped) return;\n    aboutHasBeenTyped = true;\n    const portfolio = document.getElementById('about').children[1];\n    portfolio.style.visibility = 'visible';\n    const blocks = portfolio.children;\n    const texts = Array.prototype.map.call(blocks, t => {\n      const tt = t.textContent;\n      t.textContent = '';\n      return tt;\n    });\n\n    const type = (i) => {\n      if (i >= texts.length) {\n        return;\n      }\n      const txt = texts[i];\n      let symbol = 0;\n      const t = setInterval(() => {\n        blocks[i].textContent += txt[symbol++];\n        if (symbol >= txt.length) {\n          clearInterval(t);\n          type(++i);\n        }\n      }, 15);\n    };\n    type(0);\n  };\n\n  const popups = $('.popup');\n  const activities = $('.activity');\n\n  Array.prototype.forEach.call(popups, (el) => {\n    const div = el.firstElementChild;\n    const close = div.firstElementChild;\n    close.onclick = (e) => {\n      e.preventDefault();\n      hidePopup(el);\n    };\n    el.onclick = (e) => {\n      if (e.target === el)\n        hidePopup(el);\n    };\n  });\n\n  Array.prototype.forEach.call(activities, (el, i) => {\n    el.expanded = false;\n    el.pos = el.getBoundingClientRect();\n    el.onclick = () => {\n      el.expanded = !el.expanded;\n      if (el.expanded) {\n      } else {\n      }\n      showPopup(popups[i]);\n    };\n  });\n\n  const carousels = $('.carousel');\n\n  Array.prototype.forEach.call(carousels, (el, i) => {\n    const imgs = el.getAttribute('urls').split(' ');\n    let ind = 0;\n    el.style.backgroundImage = `url(res/img/${imgs[ind++]})`;\n    setInterval(() => {\n      el.style.backgroundImage = `url(res/img/${imgs[ind++]})`;\n      if (ind >= imgs.length) ind = 0;\n    }, Math.round(10000 / imgs.length));\n\n  });\n\n});\n\n\n\n//# sourceURL=webpack:///./lobby.js?");

/***/ })

/******/ });