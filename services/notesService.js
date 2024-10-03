export class NotesDataService {
    static state = [];

    static initializeState(state) {
        this.state = state;
    }

    static AddNote(id, title, description, date) {
        this.state.push({
            id,
            title,
            description,
            date,
        });
        // console.log(this.state);
    }

    static UpdateNote(id, title, description, date) {
        const note = this.state.find((t) => t.id === id);
        note.id = id;
        note.title = title;
        note.description = description;
        note.date = date;
        console.log(this.state);
    }

    static DeleteNote(id) {
        this.state = this.state.filter((t) => t.id !== id);
        // console.log(this.state);
    }
}
