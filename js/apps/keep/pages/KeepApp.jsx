import { noteService } from "../services/note.service.js"
import { NotesList } from "../cmps/NotesList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { ScreenExpand } from "../../../cmps/ScreenExpand.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"

export class KeepApp extends React.Component {
    state = {
        notes: [],
        selectedNote: null,
        isSelectedColor: false,
        inputType: 'note-txt',
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query().then(notes => {
            this.setState({ notes })
        })
    }

    setInputType = (type) => {
        this.setState({ ...this.state, inputType: type })
    }


    onEditMode = (noteId) => {
        this.setState({ selectedNote: noteId }, this.loadNotes())

    }

    onEditedNoteSave = (noteId, info) => {
        noteService.editNote(noteId, info)
        this.setState({ selectedNote: null }, this.loadNotes())
    }

    onCreateNote = (info) => {
        noteService.createNote(info, this.state.inputType);
        this.loadNotes()
    }

    onPrevPage = () => {
        this.setState({ selectedNote: null })
    }

    onGetColor = (noteId) => {
        const { selectedColor } = this.state
        this.setState({ selectedColor: !selectedColor, selectedNote: noteId })
    }

    onShowModal = (type) => {
        switch (type) {
            case 'Duplicated': eventBusService.emit('user-msg', { txt: `Duplicated!`, type: 'Duplicated', time: 2000 })
                break
            case 'Pinned': eventBusService.emit('user-msg', { txt: `Pinned to top!`, type: 'pinned', time: 2000 })
                break
            case 'Deleted': eventBusService.emit('user-msg', { txt: `Deleted!`, type: 'Deleted', time: 2000 })
                break
        }
    }



    onToggleNotePin = (noteId) => {
        if (this.state.selectedNote) this.onShowModal('Pinned')
        noteService.toggleNotePin(noteId)
        this.loadNotes()
    }

    onDuplicateNote = (noteId) => {
        if (this.state.selectedNote) this.onShowModal('Duplicated')
        noteService.duplicateNote(noteId)
        this.loadNotes()
    }

    onRemoveNote = (noteId) => {
        // if (this.state.selectedNote) this.onShowModal('Deleted')
        noteService.removeNote(noteId).then(()=>{
            this.onPrevPage()
            this.loadNotes()
        })
    }

    onChangeNoteColor = (color, noteId) => {
        noteService.editNote(noteId, { backgroundColor: color })
        this.loadNotes()
    }


    render() {

        const { inputType, selectedNote, isSelectedColor } = this.state
        console.log(this.state.notes)

        return (
            <div className="notes-app">
                {selectedNote && <ScreenExpand isOpen={selectedNote} closeModal={this.onPrevPage} />}
                <NoteAdd inputType={inputType} setInputType={this.setInputType} creatNote={this.onCreateNote} />

                <section className="notes-cards notes-layout">
                    <i title="Pinned Notes" className="center fas fa-thumbtack"></i>
                    <div className="notes-pinned">
                        <div className="cards-container">
                            <NotesList
                                notes={this.state.notes.filter(note => note.isPinned)}
                                onRemoveNote={this.onRemoveNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onEditedNoteSave={this.onEditedNoteSave}
                                onPrevPage={this.onPrevPage}
                                onGetColor={this.onGetColor}
                                isSelectedColor={isSelectedColor}
                                onChangeNoteColor={this.onChangeNoteColor} />
                        </div>
                    </div>

                    <h2 className="center">NOTES</h2>
                    <div className="notes-general">
                        <div className="cards-container">
                            <NotesList
                                notes={this.state.notes.filter(note => !note.isPinned)}
                                onRemoveNote={this.onRemoveNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onEditedNoteSave={this.onEditedNoteSave}
                                onPrevPage={this.onPrevPage}
                                onGetColor={this.onGetColor}
                                isSelectedColor={isSelectedColor}
                                onChangeNoteColor={this.onChangeNoteColor}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}