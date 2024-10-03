import { NotesDataService } from './services/notesService.js';

const data = [1, 2, 3, 4, 5];
const updateData = (newData) => {
    data = newData;
};

const searchBar = document.querySelector('search-bar');
const asd = document.querySelector('.noNotesWrapper');
searchBar.setAttribute('data', data);
searchBar.setAttribute('handle-data', updateData);

NotesDataService.initializeState([]);
