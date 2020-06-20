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

export default modal;
export {closeModal};
export {openModal};