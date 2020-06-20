function forms() {
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
}

module.exports = forms;