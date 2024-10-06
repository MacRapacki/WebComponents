const template = document.createElement('template');
template.innerHTML = `
<style>

    input[type='text'] {
    background-color: #eeeff0;
    color: #5b5c5e;
    padding: 8px 12px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
}

input[type='text']:hover {
    background-color: #dcdee0;
}

input[type='text']:focus {
    background-color: #ffffff;
    border: 1px solid #1b1c1e;
    color: #1b1c1e;
}

        input::placeholder {
             font-size: 16px;
        }

        label {
            margin-top: 24px;
        }
        </style>

        <label><input type="text" placeholder="Search notes..."/></label>
        `;

class SearchBar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        this.input = shadow.querySelector('input');
        this.label = shadow.querySelector('label');
    }

    static get observedAttributes() {
        return ['active', 'handle-data'];
    }

    attributeChangedCallback(name, old, newValue) {
        if (name === 'active') {
            newValue === 'true'
                ? (this.label.style.display = 'block')
                : (this.label.style.display = 'none');
        }
    }
}

customElements.define('search-bar', SearchBar);
