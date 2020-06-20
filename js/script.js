import tabs from './modules/tabs';
import modal, { openModal } from './modules/modal';
import timer from './modules/timer';
import menu from './modules/menu';
import slider from './modules/slider';
import forms from './modules/forms';
import calc from './modules/calc';

document.addEventListener('DOMContentLoaded',() => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2020-07-17');
    menu();
    slider();
    forms('form', modalTimerId);
    calc();
    
});