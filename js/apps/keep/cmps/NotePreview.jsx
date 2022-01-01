import { NoteTypeTxt } from './notesType/NoteTypeTxt.jsx'
import { NoteTypeImg } from './notesType/NoteTypeImg.jsx'
import { NoteTypeTodos } from './notesType/NoteTypeTodos.jsx'
import { NoteTypeVideo } from './notesType/NoteTypeVideo.jsx'
import { Colors } from './ColorsPickInNotes.jsx'

export function NotePreview({ note, onRemoveNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onEditedNoteSave, onUnselectedNote, onChangeNoteColor }) {
    let currNote = React.createRef()
    let displayNote

    const { info } = note

    switch (note.type) {
        case `note-video`:
            displayNote = <NoteTypeVideo noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onUnselectedNote={onUnselectedNote} />
            break
        case `note-txt`:
            displayNote = <NoteTypeTxt noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onUnselectedNote={onUnselectedNote} />
            break
        case `note-todos`:
            displayNote = <NoteTypeTodos noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onUnselectedNote={onUnselectedNote} />
            break
        case `note-img`:
            displayNote = <NoteTypeImg noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onUnselectedNote={onUnselectedNote} />
            break
    }

    const toggleActions = (ev, input) => {
        const elActions = ev.target.getElementsByClassName('note-actions')[0]
        ev.stopPropagation() // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
        if (!elActions) return
        if (input === 'enter') elActions.classList.add('expand-note')
        else elActions.classList.remove('expand-note')
    }

    const palleteToggle = (noteId) => {
        document.querySelector(`.colors-${noteId}`).classList.toggle('toggle-colors')
    }

    const onChangeColor = (color) => {
        onChangeNoteColor(color, note.id)
    }


    return (
        <div onMouseEnter={(ev) => { toggleActions(ev, 'enter') }}
            onMouseLeave={(ev) => { toggleActions(ev, 'leave') }}
            abindex="-1" className={`note ${note.type} ${selectedNote === note.id ? 'note-edit' : ''}`} ref={currNote} style={note.style}  >
            <div className="note-card mobile">
                {displayNote}
            </div>
            <div className={`note-actions ${selectedNote === note.id ? 'edit-actions-btns' : ''}`}>
                <i title="Remove Note" onClick={() => { onRemoveNote(note.id) }} className="fas fa-trash"></i>
                <i title="Pin / Unppin" onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <i title="Change Color" onClick={() => { palleteToggle(note.id) }} className="fas fa-palette"></i>
                <i title="Duplicate Note" onClick={() => { onDuplicateNote(note.id) }} className="fas fa-clone"></i>
                <i title="Edit Note" onClick={() => { onEditMode(note.id) }} className={`fas fa-edit`}></i>
                <Colors noteId={note.id} onChangeColor={onChangeColor} />
            </div>
        </div>
    )

}