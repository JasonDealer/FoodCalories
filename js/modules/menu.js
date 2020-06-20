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
}

module.exports = menu;