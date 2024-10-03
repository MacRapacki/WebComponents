const template = document.createElement('template');
template.innerHTML = `
<style>

input[type='text'],
textarea {
    background-color: #eeeff0;
    color: #5b5c5e;
    padding: 8px 12px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
}

input[type='text']:hover,
textarea:hover {
    background-color: #dcdee0;
}

input[type='text']:focus,
textarea:focus {
    background-color: #ffffff;
    border: 1px solid #1b1c1e;
    color: #1b1c1e;
}

.disable{
    display: none;
}

</style>


<input type="text" />
<textarea class="disable" ></textarea>
`;

class TextField extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        this.input = shadow.querySelector('input');
        this.textarea = shadow.querySelector('textarea');
    }

    static get observedAttributes() {
        return ['variant'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'variant') {
            if (newValue === 'textarea') {
                this.input.classList.add('disable');
                this.textarea.classList.remove('disable');
            }
        }
    }
}

window.customElements.define('text-field', TextField);
