import Layout from "./KeyLayout.js";

let Textarea = document.createElement('textarea');
Textarea.className = 'Textarea use-keyboard-input';
document.body.append(Textarea);

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: '',
        capsLock: false,
        lang: [],// change lang
    },

    init() {
        //create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        //setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.append(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        //add to DOM
        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        //Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });

    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        // let keyLayout = this.properties.lang;
        let keyLayout = Layout.ru;

        //creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'del', 'enter', 'arrow up'].indexOf(key) !== -1;

            //add attributes/classes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {

                case 'tab':
                    keyElement.innerHTML = 'tab';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\t';
                        this._triggerEvent('oninput');
                    });

                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'Tab') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\t';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'Tab') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'arrow up':
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_up');
                    keyElement.addEventListener('click', () => {

                        this.properties.value += '\u{2BC5}';
                        this._triggerEvent('oninput');
                    });

                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'ArrowUp') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\u{2BC5}';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'ArrowUp') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'arrow down':

                    keyElement.innerHTML = createIconHTML('keyboard_arrow_down');
                    keyElement.addEventListener('click', () => {

                        this.properties.value += '\u{2BC6}';
                        this._triggerEvent('oninput');
                    });

                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'ArrowDown') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\u{2BC6}';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'ArrowDown') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'arrow left':

                    keyElement.innerHTML = createIconHTML('keyboard_arrow_left');
                    keyElement.addEventListener('click', () => {

                        this.properties.value += '\u{2BC7}';
                        this._triggerEvent('oninput');
                    });


                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'ArrowLeft') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\u{2BC7}';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'ArrowLeft') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'arrow right':

                    keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
                    keyElement.addEventListener('click', () => {

                        this.properties.value += '\u{2BC8}';
                        this._triggerEvent('oninput');
                    });


                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'ArrowRight') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\u{2BC8}';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'ArrowRight') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'shiftl':

                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = 'shift';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\u{2B50}';
                        this._triggerEvent('oninput');
                    });
                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'ShiftLeft') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\u{2B50}';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'ShiftLeft') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'shiftr':

                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = 'shift';
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\u{273F}';
                        this._triggerEvent('oninput');
                    });
                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'ShiftRight') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\u{273F}';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'ShiftRight') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;    

                case 'ctrl':

                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLocaleLowerCase();

                    break;
                case 'alt':
                    keyElement.textContent = key.toLocaleLowerCase();

                    break;

                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'Backspace') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'Backspace') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'caps':
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    });

                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'CapsLock') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this._toggleCapsLock();
                            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                        }
                    });

                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'CapsLock') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });


                    document.addEventListener('keydown', (ev) => {
                        if (ev.code == 'Enter') {
                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += '\n';
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {
                        if (ev.code == 'Enter') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', () => {

                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });


                    document.addEventListener('keydown', function (ev) {
                        if (ev.code == 'Space') {
                            keyElement.classList.add('keyboard__key--pressed');
                        }
                    });
                    document.addEventListener('keyup', function (ev) {
                        if (ev.code == 'Space') {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }
                    });

                    break;

                case 'done':
                    keyElement.classList.add('keyboard__key--dark');
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    });

                    break;

                default:
                    keyElement.textContent = key.toLocaleLowerCase();
                    let Keyindex = keyLayout.indexOf(key);
                    //    const that = this;
                    document.addEventListener('keydown', (ev) => {

                        ev.preventDefault();

                        if (ev.code == Layout.KEYCODES[Keyindex]) {

                            keyElement.classList.add('keyboard__key--pressed');
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this._triggerEvent('oninput');
                        }
                    });
                    document.addEventListener('keyup', (ev) => {

                        if (ev.code == Layout.KEYCODES[Keyindex]) {
                            keyElement.classList.remove('keyboard__key--pressed');
                        }

                    });

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');
                    });

                    break;
            }

            fragment.append(keyElement);

            if (insertLineBreak) {
                fragment.append(document.createElement('br'));
            }

        });

        return fragment;

    },



    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);

        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0 && (key.textContent != 'alt') && (key.textContent != 'shift')
                && (key.textContent != 'ctrl') && (key.textContent != 'enter') && (key.textContent != 'tab') && (key.textContent != 'del')) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');

    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');
    },
};
window.addEventListener('DOMContentLoaded', function () {


    Keyboard.init();

    // Keyboard.open('dcode', function (currentValue) {
    //     console.log('value changes, here it is: ' + currentValue);
    // }, function (currentValue) {
    //     console.log('keyboard closed! Finishing value: ' + currentValue);
    // });
});








    //     runOnKeys(           
    //         "ControlLeft",
    //         "AltLeft"
    //     );

    //    function runOnKeys(...codes) {        
    //         console.log('in runOnKeys');
    //         let pressed = new Set();
    //         document.addEventListener('keydown', function (event) {
    //             pressed.add(event.code);
    //             for (let code of codes) { // все ли клавиши из набора нажаты?
    //                 if (!pressed.has(code)) {
    //                     return;
    //                 }
    //             }
    //             pressed.clear();

    //             console.log('switch lang');
    //             if (keyLayout == Layout.en) { 
    //                 console.log('1');
    //                return keyLayout = Layout.ru;

    //             } else {
    //                 console.log('2');
    //                 return keyLayout = Layout.en;                                        
    //             }


    //         });

        //     document.addEventListener('keyup', function (event) {
        //         pressed.delete(event.code);
        //     });
        // };

