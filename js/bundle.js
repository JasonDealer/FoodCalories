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
/******/ 	return __webpack_require__(__webpack_require__.s = "../js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../js/modules/calc.js":
/*!*****************************!*\
  !*** ../js/modules/calc.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
        //calculator

        const result = document.querySelector('.calculating__result span');
    
        let sex, height, weight, age, ratio;
    
    
        //установка значений по-умолчанию
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
    
        //ф-ла рассчета каллорий
        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio) {
                result.textContent = '____';
                return;
            }
            if (sex === 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        //работа с активными классами из локального хранилища
        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            //ввод данных из переключателей
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
    
                        //добавление данных в локальное хранилище
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
    
                    } else {
                        sex = e.target.getAttribute('id');
    
                        //добавление данных в локальное хранилище
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }
        
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
        
                    calcTotal();
                });
            });
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
        //обработка ввода в input
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
    
                //подсветка неправильного ввода
                if (input.value.match(/\D/g)) {
                    input.style.border = "1px solid red";
                } else {
                    input.style.border = 'none';
                }
    
                //заполнение формулы инпутами
                switch(input.getAttribute('id')) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;
                }
    
                calcTotal();
            });
        }
    
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "../js/modules/forms.js":
/*!******************************!*\
  !*** ../js/modules/forms.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "../js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "../js/services/services.js");



function forms(formSelector, modalTimerId) {
        //forms send Fetch API

        const forms = document.querySelectorAll(formSelector);
        const message = {
            loading: 'icons/spinner.svg',
            sucsess: 'Спасибо! С вами свяжутся!',
            failure: 'Что-то пошло не так'
        };
    
        forms.forEach(item => {
            bindPostData(item);
        });
    
        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = "display: block; margin: 0 auto";
                form.append(statusMessage);
                form.insertAdjacentElement('afterend', statusMessage);
    
                let formData = new FormData(form);
    
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
                Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.sucsess);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
    
    /*             request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        showThanksModal(message.sucsess);
                        form.reset();
                        statusMessage.remove();
                    } else {
                        showThanksModal(message.failure);
                    }
                }); */
            });
        }
    
        function showThanksModal (message) {
            const previousModal = document.querySelector('.modal__dialog');
            previousModal.classList.add('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close >×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;
    
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                previousModal.classList.add('show');
                previousModal.classList.remove('hide');
                Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
            }, 3000);
        }
    
        // Fetch API
        
        /* fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({name: 'Alex'}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => console.log(json));
     */
    
        fetch('http://localhost:3000/menu').then(data => data.json())
        .then(res => console.log(res));
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "../js/modules/menu.js":
/*!*****************************!*\
  !*** ../js/modules/menu.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "../js/services/services.js");


function menu () {
        //Создание карточек

        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.classes = classes;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 2.3;
                this.changeToBYN();
            }
    
            changeToBYN(){
                this.price = (this.price / this.transfer).toFixed(2);
                
            }
    
            render() {
                const element = document.createElement('div');
                if (this.classes.length === 0){
                    this.element = 'menu.item';
                    element.classList.add(this.element);
                } else {
                this.classes.forEach(className => element.classList.add(className));
            }
                element.innerHTML = `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                            <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:
                                </div>
                                <div class="menu__item-total"><span>${this.price}</span> руб/день
                                </div>
                        </div>
                `;
                this.parent.append(element);
            }
        }
    
        Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResources"])('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container',
                    'menu__item').render();
                });
            });
}

/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "../js/modules/modal.js":
/*!******************************!*\
  !*** ../js/modules/modal.js ***!
  \******************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show', 'fadeModal');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function openModal (modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show', 'fadeModal');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
    clearInterval(modalTimerId);
    }
}

function modal(btnsSelector, modalSelector, modalTimerId) {
    //modal

    const modalBtns = document.querySelectorAll(btnsSelector),
          modal = document.querySelector(modalSelector);

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () =>  openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {   
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    //Проверка на то, что пользователь долистал до конца страницы
    /*if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) */

}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "../js/modules/slider.js":
/*!*******************************!*\
  !*** ../js/modules/slider.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider() {
        //slider

        const leftArrow = document.querySelector('.offer__slider-prev'),
              rightArrow = document.querySelector('.offer__slider-next'),
              slides = document.querySelectorAll('.offer__slide'),
              slider = document.querySelector('.offer__slider');
        let currentIndex = document.querySelector('#current'),
            allIndex = document.querySelector('#total'),
            index = 1;

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          massDots = [];
          dots.classList.add('carousel-indicators');
          dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        massDots.push(dot);
    }

    showSlides(1);

    if(slides.length < 10) {
        allIndex.textContent = `0${slides.length}`;
    } else {
        allIndex.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            index = 1;
        }
        if (n < 1) {
            index = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[index - 1].style.display = 'block';

        if(slides.length < 10) {
            currentIndex.textContent = `0${index}`;
        } else {
            currentIndex.textContent = index;
        }

        massDots.forEach(dot => dot.style.opacity = '0.5');
        massDots[index - 1].style.opacity = 1;

    }

    function showNSlides(n) {
        if (n > slides.length) {
            index = 1;
        }
        if (n < 1) {
            index = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[index - 1].style.display = 'block';

        if(slides.length < 10) {
            currentIndex.textContent = `0${index}`;
        } else {
            currentIndex.textContent = index;
        }

        massDots.forEach(dot => dot.style.opacity = '0.5');
        massDots[index - 1].style.opacity = 1;

    }

    function plusSlides (n) {
        showSlides(index += 1);
    }

    function minusSlides (n) {
        showNSlides(index -= 1);
    }

    leftArrow.addEventListener('click', () => {
        minusSlides(3);
    });

    rightArrow.addEventListener('click', () => {
        plusSlides(1);
    });

    massDots.forEach(dot => {

        dot.addEventListener('click' , (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            index = slideTo;
            if (e > slides.length) {
                index = 1;
            }
            if (e < 1) {
                index = slides.length;
            }
    
            slides.forEach(item => item.style.display = 'none');
            slides[index - 1].style.display = 'block';
    
            if(slides.length < 10) {
                currentIndex.textContent = `0${index}`;
            } else {
                currentIndex.textContent = index;
            }
            massDots.forEach(dot => dot.style.opacity = '0.5');
            massDots[index - 1].style.opacity = 1;
        });
    });
    }

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "../js/modules/tabs.js":
/*!*****************************!*\
  !*** ../js/modules/tabs.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

        //tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "../js/modules/timer.js":
/*!******************************!*\
  !*** ../js/modules/timer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer (id, deadline) {
    //timer

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60) % 60)),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setZero(num) {
        if (num >= 0 && num < 10) {
            return (`0${num}`);
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
            
        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);

}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "../js/script.js":
/*!***********************!*\
  !*** ../js/script.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "../js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "../js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "../js/modules/timer.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu */ "../js/modules/menu.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "../js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "../js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "../js/modules/calc.js");








document.addEventListener('DOMContentLoaded',() => {
    
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 5000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-07-17');
    Object(_modules_menu__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
    
});

/***/ }),

/***/ "../js/services/services.js":
/*!**********************************!*\
  !*** ../js/services/services.js ***!
  \**********************************/
/*! exports provided: postData, getResources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResources", function() { return getResources; });
const postData = async (url, data) => {
    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    }); 
    return await res.json();
};

async function getResources (url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();

}




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map