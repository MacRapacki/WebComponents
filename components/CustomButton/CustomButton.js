const template = document.createElement('template');
template.innerHTML = `
<style>

.default {
    width: 100%;
    height: 40px;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}

.primary {
    background-color: #6b3c9b;
    color: #ffffff;
}

.primary:hover {
    background-color: #844dba;
}

.primary:active {
    background-color: #5b2f87;
}

.secondary {
    background-color: #ffffff;
    color: #1b1c1e;
    border: 1px solid #BCBCBD;
}

.secondary:hover {
    background-color: #e7e7e7;
}

.secondary:active {
    background-color: #bdbdbd;
    border: 1px solid #bdbdbd;
}

.transparent {
    background-color: transparent;
    color: #0F75B8;
    border: none;
    font-weight: 400;
    font-size: 14px;
}

.transparent:hover {
    text-decoration: underline;
    text-underline-position: under
}

.disable{
    display:none;
}

.default img {
    width: 16px;
    height: 20px;

}

</style>


<button class="default"><img class="disable" src="./assets/add.jpg" alt="note plus" /><slot></slot></button>
`;

class CustomButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        this.button = shadow.querySelector('button');
        this.icon = shadow.querySelector('.default img');
    }

    static get observedAttributes() {
        return ['variant', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'variant') {
            this.button.classList.add(newValue);

            if (newValue === 'secondary') {
                this.icon.classList.remove('disable');
            }
        }
    }
}

window.customElements.define('custom-button', CustomButton);
