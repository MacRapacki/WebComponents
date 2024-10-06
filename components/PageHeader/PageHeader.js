const template = document.createElement('template');
template.innerHTML = `
        <style>
    h1 {
        font-size: 20px;
        font-weight: 500;
    }

    .headerWrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }  

    img {
        width: 15.3px;
        height: 19px;
}
        </style>
        
        <div class='headerWrapper'><img src='./assets/notes.jpg' alt='Notes' /> <h1>Notes</h1></div>`;

class PageHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));
    }
}

customElements.define('page-header', PageHeader);
