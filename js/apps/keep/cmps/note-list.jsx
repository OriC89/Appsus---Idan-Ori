import { NotePreview } from "./note-preview.jsx"

export function NotesList({ notes, onToggleNotePin, onEditNote, selectedNote, onEditedNoteSave, onPrevPage, onChangeNoteColor, onRemoveNote, onDuplicateNote }) {
    if (!notes.length) return <h1>There Are No Notes To Show</h1>
    return (
        <div>
            {notes.map(note => <NotePreview
                key={note.id}
                note={note}
                onToggleNotePin={onToggleNotePin}
                onDuplicateNote={onDuplicateNote}
                onEditMode={onEditNote}
                selectedNote={selectedNote}
                onEditedNoteSave={onEditedNoteSave}
                onPrevPage={onPrevPage}
                onChangeNoteColor={onChangeNoteColor}
                onRemoveNote={onRemoveNote} />)}
        </div>
    )
}