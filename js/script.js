document.addEventListener('DOMContentLoaded',() => {

    //tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2020-07-17';

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

    setClock('.timer', deadline);

    //modal

    const modalBtns = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal () {
        modal.classList.add('show', 'fadeModal');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    function closeModal () {
        modal.classList.remove('show', 'fadeModal');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {   
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //

    const modalTimerId = setTimeout(openModal, 5000);

    //Проверка на то, что пользователь долистал до конца страницы
    /*if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) */

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

    const getResources = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();

    };

    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container',
                'menu__item').render();
            });
        });

    //forms send Fetch API

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'icons/spinner.svg',
        sucsess: 'Спасибо! С вами свяжутся!',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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

            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
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

    //slider

    const leftArrow = document.querySelector('.offer__slider-prev'),
          rightArrow = document.querySelector('.offer__slider-next'),
          slides = document.querySelectorAll('.offer__slide');
    let currentIndex = document.querySelector('#current'),
        allIndex = document.querySelector('#total'),
        index = 1;

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

    }

    function plusSlides (n) {
        showSlides(index += 1);
    }

    leftArrow.addEventListener('click', () => {
        plusSlides(-1);
    });

    rightArrow.addEventListener('click', () => {
        plusSlides(1);
    });
});