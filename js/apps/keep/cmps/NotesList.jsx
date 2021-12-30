import { NotePreview } from "./NotePreview.jsx"
import { utilService } from "../../../services/util.service.js"

export function NotesList({ notes, onRemoveNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onEditedNoteSave, onPrevPage, onChangeNoteColor }) {

    return notes.map(note => <NotePreview key={`${note.id}-${utilService.getRandomIntInclusive(1, 10000)}`}
        note={note}
        onRemoveNote={onRemoveNote}
        onToggleNotePin={onToggleNotePin}
        onDuplicateNote={onDuplicateNote}
        onEditMode={onEditMode}
        selectedNote={selectedNote}
        onEditedNoteSave={onEditedNoteSave}
        onPrevPage={onPrevPage}
        onChangeNoteColor={onChangeNoteColor}
    />)

}