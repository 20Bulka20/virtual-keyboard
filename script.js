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
        lang: false,// change lang
    },

    init() {
        //create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        //setup main elements
        this.elements.main.classList.add('keyboard', '1keyboard--hidden');
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
        const ru = [
            'ё', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
            'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del',
            'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
            'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift', 'arrow up',
            'ctrl', 'done', 'alt', 'space', 'alt', 'ctrl', 'arrow left', 'arrow down', 'arrow right'
    ]
        const en = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\"', 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'shift', 'arrow up',
            'ctrl', 'done', 'alt', 'space', 'alt', 'ctrl', 'arrow left', 'arrow down', 'arrow right'
        ];
        const keyLayout = en;

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

                case 'arrow up':
                    
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_up');                                     

                    break;

                case 'arrow down':

                    keyElement.innerHTML = createIconHTML('keyboard_arrow_down');                                     

                    break;

                case 'arrow left':
                                        
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_left');                                     

                    break;
                
                case 'arrow right':
                                        
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_right');                                     

                    break;

                case 'shift':
                                        
                    keyElement.classList.add('keyboard__key--wide'); 
                    keyElement.textContent = key.toLocaleLowerCase();                                    

                    break;

                case 'ctrl':
                                        
                    keyElement.classList.add('keyboard__key--wide'); 
                    keyElement.textContent = key.toLocaleLowerCase();                                    

                    break;

                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                        
                    });                    

                    break;

                    case 'caps':
                        keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                        keyElement.innerHTML = createIconHTML('keyboard_capslock');
    
                        keyElement.addEventListener('click', () => {
                            this._toggleCapsLock();
                            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                        });
    
                        break;
                    
                    case 'enter':
                        keyElement.classList.add('keyboard__key--wide');
                        keyElement.innerHTML = createIconHTML('keyboard_return');
    
                        keyElement.addEventListener('click', () => {
                            this.properties.value += '\n';
                            this._triggerEvent('oninput');                            
                        });
    
                        break;  

                    case 'space':
                        keyElement.classList.add('keyboard__key--extra-wide');
                        keyElement.innerHTML = createIconHTML('space_bar');
        
                        keyElement.addEventListener('click', () => {

                            this.properties.value += ' ';
                            this._triggerEvent('oninput');                            
                        });
                    

                        document.addEventListener('keydown', function(ev) {
                        if (ev.code == 'Space') {
                            keyElement.classList.add('keyboard__key--pressed');
                            console.log('wtf');
                        }
                      });
                      document.addEventListener('keyup', function(ev) {
                        if (ev.code == 'Space') {
                            keyElement.classList.remove('keyboard__key--pressed');
                            console.log('0.0');
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
                       document.addEventListener('keydown', function(ev) {
                        if (ev.code == 'Key' + key.toUpperCase()) {
                            keyElement.classList.add('keyboard__key--pressed');
                            console.log('wtf1');
                        }
                      });
                      document.addEventListener('keyup', function(ev) {
                        if (ev.code == 'Key' + key.toUpperCase()) {
                            keyElement.classList.remove('keyboard__key--pressed');
                            console.log('0.01');
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
            if (key.childElementCount === 0) {
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

