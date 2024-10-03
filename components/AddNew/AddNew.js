import { NotesDataService } from '../../services/notesService.js';

const template = document.createElement('template');
template.innerHTML = `
        <style>

.addNewWrapper {
    display: flex;
    flex-direction: column;
    gap:16px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    margin: 0 -16px;
    padding:16px;
}

.addNewHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

p {
  margin: 0 
}

.btnWrapper {
    display: flex;
    justify-content: flex-end;
}

.btnWrapper button {
    width: fit-content
}

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

textarea {
    height: 210px;
}

.disable {
    display: none;
}
        </style>
        <div class="addNewBtnWrapper">
                <custom-button variant="primary">Add New</button></custom-button>
        </div>
        
        <div class="addNewWrapper">
                <div class="addNewHeader">
                    <p>Add new note</p>
                    <custom-button variant="transparent">cancel</custom-button>
                </div>
                <input type="text" placeholder="Note title"/>
                <textarea placeholder="Your note"></textarea>
                <div class="btnWrapper">
                    <custom-button variant="primary" >Save</button></custom-button>
                </div>
        </div>`;

class AddNew extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        this.saveButton = shadow.querySelector('.btnWrapper custom-button');
        this.cancelButton = shadow.querySelector('.addNewHeader custom-button');
        this.addNewBtn = shadow.querySelector(
            '.addNewBtnWrapper custom-button'
        );
        this.wrapper = shadow.querySelector('div.addNewWrapper');
        this.input = shadow.querySelector('input');
        this.textarea = shadow.querySelector('textarea');
        this.toggle = () => {
            this.wrapper.classList.toggle('disable');
            this.addNewBtn.classList.toggle('disable');
        };
        this.idToEdit;

        this.saveButton.addEventListener('click', () => {
            const id = `id-${(Math.random() * 1000000).toFixed()}`;

            if (!!this.idToEdit) {
                console.log(!!this.idToEdit);

                NotesDataService.UpdateNote(
                    this.getAttribute('edit-id'),
                    this.input.value,
                    this.textarea.value,
                    new Date()
                );
            } else {
                NotesDataService.AddNote(
                    id,
                    this.input.value,
                    this.textarea.value,
                    new Date()
                );
            }

            if (!!this.idToEdit) {
                document
                    .querySelector('notes-list')
                    .setAttribute('edited-id', `${this.idToEdit}`);
            } else {
                document
                    .querySelector('notes-list')
                    .setAttribute('data-id', id);
            }

            this.input.value = '';
            this.textarea.value = '';
            this.wrapper.classList.add('disable');
            this.addNewBtn.classList.remove('disable');
            this.idToEdit = null;
        });

        this.addNewBtn.addEventListener('click', this.toggle);
        this.cancelButton.addEventListener('click', this.toggle);
    }
    connectedCallback() {
        this.addNewBtn.classList.add('disable');
    }

    static get observedAttributes() {
        return ['visible', 'edit-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'visible') {
            if (newValue === 'true') {
                return this.wrapper.classList.remove('disable');
            }

            this.wrapper.classList.add('disable');
        }
        if (name === 'edit-id') {
            this.idToEdit = newValue;

            this.toggle();
        }
    }
}

customElements.define('add-new', AddNew);
