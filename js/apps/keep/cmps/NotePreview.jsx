import { NoteTypeTxt } from './notesType/NoteTypeTxt.jsx'
import { NoteTypeImg } from './notesType/NoteTypeImg.jsx'
import { NoteTypeTodos } from './notesType/NoteTypeTodos.jsx'
import { NoteTypeVideo } from './notesType/NoteTypeVideo.jsx'
import { Colors } from './ColorsPickInNotes.jsx'

export function NotePreview({ note, onRemoveNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onEditedNoteSave, onPrevPage, onChangeNoteColor }) {
    let currNote = React.createRef()
    let displayNote

    const { info } = note

    switch (note.type) {
        case `note-video`:
            displayNote = <NoteTypeVideo noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onPrevPage={onPrevPage} />
            break
        case `note-txt`:
            displayNote = <NoteTypeTxt noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onPrevPage={onPrevPage} />
            break
        case `note-todos`:
            displayNote = <NoteTypeTodos noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onPrevPage={onPrevPage} />
            break
        case `note-img`:
            displayNote = <NoteTypeImg noteId={note.id} info={info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onPrevPage={onPrevPage} />
            break
    }

    const toggleActions = (ev, input) => {
        const elFuncs = ev.target.getElementsByClassName('note-actions')[0]
        ev.stopPropagation() // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
        if (!elFuncs) return
        if (input === 'enter') elFuncs.classList.add('expand-note')
        else elFuncs.classList.remove('expand-note')
    }

    const palleteToggle = (noteId) => {
        document.querySelector(`.colors-${noteId}`).classList.toggle('show-colors')
    }

    const onChangeColor = (color) => {
        onChangeNoteColor(color, note.id);
    }


    return (
        <div onMouseEnter={(ev) => { toggleActions(ev, 'enter') }}
            onMouseLeave={(ev) => { toggleActions(ev, 'leave') }}
            abindex="-1" className={`note ${note.type} ${selectedNote === note.id ? 'note-edit' : ''}`} ref={currNote} style={note.style}  >
            <div className="note-card mobile">
                {displayNote}
            </div>
            <div className={`note-actions ${selectedNote === note.id ? 'edit-func' : ''}`}>
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