function modal() {
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

}

module.exports = modal;