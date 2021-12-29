import { NoteTypeTxt } from "./NoteTypeTxt.jsx"

export function NotePreview({ note, onToggleNotePin, onEditNote, selectedNote, onEditedNoteSave, onPrevPage, onChangeNoteColor, onRemoveNote, onDuplicateNote }) {
    let currNote = React.createRef()
    let noteToDisplay

    switch (note.type) {
        case `txt`:
            noteToDisplay = <NoteTypeTxt noteId={note.id} info={note.info}
                selectedNote={selectedNote} onEditedNoteSave={onEditedNoteSave}
                onPrevPage={onPrevPage} />
            break
    }

    const toggleExpansion = (ev, input) => {
        const elExpans = ev.target.getElementsByClassName('note-expend')[0]
        ev.stopPropagation()
        if (!elExpans) return
        if (input === 'enter') elExpans.classList.add('expand-note')
        else elExpans.classList.remove('expand-note')
    }

    const onColorPallete = (noteId) => {
        document.querySelector(`.colors-${noteId}`).classList.toggle('colors')
    }

    const onChangeColor = (color) => {
        onChangeNoteColor(color, note.id)
    }

    return (
        <div onMouseEnter={(ev) => { toggleExpansion(ev, 'enter') }}
            onMouseLeave={(ev) => { toggleExpansion(ev, 'leave') }}
            className={`note ${note.type} ${selectedNote === note.id ? 'note-edit' : ''}`} ref={currNote} style={note.style}>
            <div className="note-content">
                {noteToDisplay}
            </div>
            <div className={`note-expend ${selectedNote === note.id ? 'edit' : ''}`}>
                <i onClick={() => { onEditNote(note.id) }} className="fas fa-edit"></i>
                <i onClick={() => { onRemoveNote(note.id) }} className="fas fa-trash"></i>
                <i onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <i onClick={() => { onDuplicateNote(note.id) }} className="fas fa-clone"></i>
                <i onClick={() => { onColorPallete(note.id) }} className="fas fa-palette"></i>
            </div>
        </div >
    )

}