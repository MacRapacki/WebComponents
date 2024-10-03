import { NotesDataService } from '../../services/notesService.js';

const template = document.createElement('template');
template.innerHTML = `
        <style>
.noNotesWrapper {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
}

.noNotesImg {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    margin-bottom: 16px;
}
.noNotesSubText,
.noNotesHeader {
    margin: 0 auto;
    text-align: center;
}

.noNotesHeader {
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 500;
}

.noNotesSubText {
    margin-bottom: 24px;
    color: #3B3C3E;
}
        </style>
        
        <div class="noNotesWrapper">
                <img class="noNotesImg" src="./assets//circle.jpg" />
                <h2 class="noNotesHeader">No notes yet</h2>
                <p class="noNotesSubText">
                    Add a note to keep track of your learnings.
                </p>
                <custom-button variant="secondary" fitContent="true">Add Note</button></custom-button>
        </div>`;

class NoNotesInfo extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        const button = shadow.querySelector('custom-button');
        const wrapper = shadow.querySelector('div.noNotesWrapper');
        const addNewForm = document.querySelector('add-new');

        button.addEventListener('click', () => {
            addNewForm.setAttribute('visible', 'true');
            addNewForm.setAttribute('active', 'true');
            wrapper.style.display = 'none';
        });
    }
}

customElements.define('no-notes-info', NoNotesInfo);
