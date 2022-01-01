import { noteService } from "../services/note.service.js"
import { NotesList } from "../cmps/NotesList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { ScreenExpand } from "../../../cmps/ScreenExpand.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"

export class KeepApp extends React.Component {
    state = {
        notes: [],
        selectedNote: null,
        isSelectedColor: false,
        inputType: 'note-txt',
        filterBy: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy).then(notes => {
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
            .then(() => {
                this.loadNotes()
            })
    }

    onUnselectedNote = () => {
        this.setState({ selectedNote: null })
    }

    onGetColor = (noteId) => {
        const { selectedColor } = this.state
        this.setState({ selectedColor: selectedColor, selectedNote: noteId })
    }

    onShowModal = (type) => {
        switch (type) {
            case 'Duplicated': eventBusService.emit('user-msg', { txt: `Duplicated!`, type: 'Duplicated', time: 3000 })
                break
            case 'Pinned': eventBusService.emit('user-msg', { txt: `Pinned to top!`, type: 'Pinned', time: 3000 })
                break
            case 'Deleted': eventBusService.emit('user-msg', { txt: `Deleted!`, type: 'Deleted', time: 3000 })
                break
        }
    }

    onToggleNotePin = (noteId) => {
        if (this.state.selectedNote) this.onShowModal('Pinned')
        noteService.toggleNotePin(noteId)
        this.loadNotes()
    }

    onDuplicateNote = (noteId) => {
        noteService.duplicateNote(noteId)
            .then(() => {
                if (this.state.selectedNote) this.onShowModal('Duplicated')
                this.loadNotes()
            })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId).then(() => {
            if (this.state.selectedNote) this.onShowModal('Deleted')
            this.loadNotes()
            this.onUnselectedNote()
        })
    }

    onChangeNoteColor = (color, noteId) => {
        noteService.editNote(noteId, { backgroundColor: color })
            .then(() => {
                this.loadNotes()
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    render() {
        const { inputType, selectedNote, isSelectedColor } = this.state
        return (
            <div className="notes-app">
                {selectedNote && <ScreenExpand isOpen={selectedNote} closeModal={this.onUnselectedNote} />}
                <NoteAdd inputType={inputType} setInputType={this.setInputType} creatNote={this.onCreateNote} />
                <NoteFilter onSetFilter={this.onSetFilter} />
                <section className="notes-cards notes-layout">
                    <i title="Pinned Notes" className="i-notes fas fa-thumbtack"></i>
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
                                onUnselectedNote={this.onUnselectedNote}
                                onGetColor={this.onGetColor}
                                isSelectedColor={isSelectedColor}
                                onChangeNoteColor={this.onChangeNoteColor} />
                        </div>
                    </div>

                    <i title="Pinned Notes" className="i-notes fas fa-sticky-note"></i>
                    <div className=".notes-unpinned">
                        <div className="cards-container">
                            <NotesList
                                notes={this.state.notes.filter(note => !note.isPinned)}
                                onRemoveNote={this.onRemoveNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onEditedNoteSave={this.onEditedNoteSave}
                                onUnselectedNote={this.onUnselectedNote}
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