const template = document.createElement('template');
template.innerHTML = `
        <style>
        input {
            width: 100%;
            height: 40px;
            border: none;
            background-color: #EEEFF0;
            padding: 8px 12px;
            border-radius: 12px;
            box-sizing: border-box;
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

        this.handleData;
        this.input = shadow.querySelector('input');
        this.input.addEventListener('keydown', () =>
            console.log(this.handleData)
        );
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
