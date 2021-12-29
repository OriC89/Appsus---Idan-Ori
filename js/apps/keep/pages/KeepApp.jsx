import { noteService } from '../services/note.service.js'
import { NotesList } from '../cmps/note-list.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: [],
        inputType: 'txt',
        isColor: false,
        selectedNote: null,
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
        this.setState({ selectedNote: null })
    }

    onCreateNote = (info) => {
        noteService.createNote(info, this.state.inputType)
        this.loadNotes()
    }

    onPrevPage = () => {
        this.setState({ selectedNote: null })
    }

    onGetColor = (noteId) => {
        const { selectedColor } = this.state
        this.setState({ selectedColor: !selectedColor, selectedNote: noteId })
    }

    onToggleNotePin = (noteId) => {
        if (this.state.selectedNote) {
            this.onShowModal('pinned')
        }
        noteService.toggleNotePin(noteId);
        this.loadNotes();
    }

    onDuplicateNote = (noteId) => {
        if (this.state.selectedNote) {
            this.onShowModal('duplicate')
        }
        noteService.duplicateNote(noteId);
        this.loadNotes();
    }

    onRemoveNote = (noteId) => {
        if (this.state.selectedNote) {
            this.onShowModal('delete')
        }
        noteService.removeNote(noteId);
        this.onPrevPage()
        this.loadNotes();
    }

    onChangeNoteColor = (color, noteId) => {
        noteService.editNote(noteId, { backgroundColor: color })
        this.loadNotes();
    }

    onShowModal = (type) => {
        switch (type) {
            case 'pinned': eventBusService.emit('userMsg', { txt: `Pinned!`, type: 'pinned', time: 1000 })
                break
            case 'delete': eventBusService.emit('userMsg', { txt: `Note Deleted!`, type: 'delete', time: 1000 })
                break
            case 'duplicate': eventBusService.emit('userMsg', { txt: `Duplicated!`, type: 'duplicate', time: 1000 })
                break
        }
    }

    render() {
        const { selectedNote, isColor, notes } = this.state
        console.log(this.state.notes);
        return (
            <div className="keep-app">
                <section className="notes-container notes-layout">
                    <h1>pinned</h1>
                    <div className="notes-pinned">
                        <div className="notes-list">
                            <NotesList
                                notes={notes.filter(note => !note.isPinned)}
                                isColor={isColor}
                                onGetColor={this.onGetColor}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onEditedNoteSave={this.onEditedNoteSave}
                                onPrevPage={this.onPrevPage}
                                onChangeNoteColor={this.onChangeNoteColor}
                                onRemoveNote={this.onRemoveNote}
                            />
                        </div>
                    </div>
                    <h1>Unpinned Notes</h1>
                    <div className="notes-unpinned">
                        <div className="notes-list">
                            <NotesList
                                notes={notes.filter(note => !note.isPinned)}
                                onRemoveNote={this.onRemoveNote} // DELETE NOTE
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                onSaveEdit={this.onEditedNoteSave}
                                onGoBack={this.onPrevPage}
                                onGetColor={this.onGetColor}
                                onChangeNoteColor={this.onChangeNoteColor}
                                selectedNote={selectedNote}
                                isColor={isColor}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}