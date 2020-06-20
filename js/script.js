document.addEventListener('DOMContentLoaded',() => {
    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          menu = require('./modules/menu'),
          slider = require('./modules/slider'),
          forms = require('./modules/forms'),
          calc = require('./modules/calc');

    tabs();
    modal();
    timer();
    menu();
    slider();
    forms();
    calc();
    
});