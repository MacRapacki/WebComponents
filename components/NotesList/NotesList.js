import { NotesDataService } from '../../services/notesService.js';

const template = document.createElement('template');
template.innerHTML = `
        <style>

ul,
li {
    list-style: none;
    margin: 0;
    padding: 0;
}

ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.noteWrapper {
    box-shadow: 0px 4px 16px 0px #00000012;
    border-radius: 12px;
    background-color: #ffffff;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.noteWrapper .noteHeader {
    display: flex;
    justify-content: space-between;
}

.noteWrapper .noteHeader .actions {
    display: flex;
    gap: 8px;
}

.noteWrapper div h3 {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
}

.noteWrapper p.description {
    font-size: 14px;
    font-weight: 400;
    color: #3B3C3E;
}

.noteWrapper p.date {
    font-size: 12px;
    font-weight: 400;
    color: #5B5C5E;
}

img {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
        </style>

        <ul></ul>
        
        `;

class NotesList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        this.ul = shadow.querySelector('ul');
    }

    static get observedAttributes() {
        return ['data-id', 'edited-id'];
    }

    removeChild(id) {
        this.shadowRoot.getElementById(id).remove();
        NotesDataService.DeleteNote(id);
    }

    onEditClick(id) {
        document.querySelector('add-new').setAttribute('edit-id', id);
    }

    editChild(id) {
        const notes = NotesDataService.state;
        const {
            title,
            description,
            id: noteId,
            date,
        } = notes.find((item) => item.id == id);

        const tmpl = `
        <div class="noteWrapper" id=${noteId}>
            <div class='noteHeader'>
                <h3>${title}</h3>
                <div class='actions'>
                    <img class="edit" src="./assets/edit.jpg" alt="edit" />
                    <img class="remove" src="./assets/bin.jpg" alt="remove" />
                </div>
            </div>
            <p class="description">${description}</p>
            <p class="date">${date}</p>
        </div>
        
        `;
        this.shadowRoot.getElementById(id).innerHTML = tmpl;
    }

    createChild(newValue) {
        const notes = NotesDataService.state;

        const { title, description, id, date } = notes.find(
            (item) => item.id == newValue
        );
        const li = document.createElement('li');
        const formattedDate = Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
        }).format(date);

        const tmpl = `
        <div class="noteWrapper" id=${id}>
            <div class='noteHeader'>
                <h3>${title}</h3>
                <div class='actions'>
                    <img class="edit" src="./assets/edit.jpg" alt="edit" />
                    <img class="remove" src="./assets/bin.jpg" alt="remove" />
                </div>
            </div>
            <p class="description">${description}</p>
            <p class="date">${formattedDate}</p>
        </div>
        
        `;
        li.innerHTML = tmpl;

        li.querySelector('img.remove').addEventListener('click', () => {
            this.removeChild(id);
        });

        li.querySelector('img.edit').addEventListener('click', () => {
            this.onEditClick(id);
        });

        this.ul.appendChild(li);
    }

    attributeChangedCallback(name, old, newValue) {
        if (name === 'data-id') {
            this.createChild(newValue);
        }
        if (name === 'edited-id') {
            const state = NotesDataService.state;

            const header = this.shadowRoot.querySelector(`#${newValue} h3`);
            const description = this.shadowRoot.querySelector(
                `#${newValue} .description`
            );
            header.textContent = state.find(
                (item) => item.id == newValue
            ).title;
            description.textContent = state.find(
                (item) => item.id == newValue
            ).description;
        }
    }
}

customElements.define('notes-list', NotesList);
