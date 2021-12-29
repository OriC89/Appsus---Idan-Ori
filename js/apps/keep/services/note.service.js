import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
    query,
    createNote,
    removeNote,
    editNote,
    duplicateNote,
    toggleNotePin
}

const NOTES_KEY = 'notesDB'
const gNotes = storageService.load(NOTES_KEY) || [{
        id: utilService.makeId(5),
        type: "txt",
        info: { txt: "React is just another Reaction" },
        style: { backgroundColor: "#FFD700" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "img",
        info: { url: "./assets/img/by-img.jpg", title: "The throphy is ours!" },
        style: { backgroundColor: "#FF1493" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "todos",
        info: {
            label: "Get done or you're done",
            todos: [
                { txt: "Learn how to wink with both eyes", doneAt: null },
                { txt: "Fix the boiler", doneAt: 187111111 },
                { txt: "Get a job", doneAt: null },
                { txt: "Renew my passport", doneAt: null },
                { txt: "Buy 3nd Monitor", doneAt: null },
            ],
        },
        style: { backgroundColor: "#8B008B" },
        isPinned: true
    },
    {
        id: utilService.makeId(5),
        type: "video",
        info: { url: "https://www.youtube.com/watch?v=fqJmgOZlHQM&t=13s", title: "Victory in the cup finals!" },
        style: { backgroundColor: "#7FFF00" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "txt",
        info: { txt: "Dinner, 20:00 with the Cohe's" },
        style: { backgroundColor: "#0000FF" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "video",
        info: { url: "https://www.youtube.com/watch?v=0kt_D4PFfp0", title: "DEFEATING Hapoel Aviv!" },
        style: { backgroundColor: "#DC143C" },
        isPinned: true,
    },
]

_saveNotesToStorage()


function query(filterBy = null) {
    const notes = _loadNotesFromStorage()
    if (!filterBy) return Promise.resolve(notes)
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    return Promise.resolve(filteredNotes)
}

// function query() {
//     const notes = _loadNotesFromStorage()
//     return Promise.resolve(notes);
// }

function _getFilteredNotes(notes, filterBy) {
    let { type, txt } = filterBy
    return notes.filter(note => {
        return note.type.includes(type) && note.info.txt >= txt
    })
}

// CREATE NOTE
function createNote(info, type) {
    const newNote = {
        id: utilService.makeId(5),
        type,
        info,
        style: { backgroundColor: "##ff0000" },
        isPinned: false
    }
    gNotes.push(newNote);
    _saveNotesToStorage();
}

// DELETE NOTE
function removeNote(noteId) {
    const deletedIdx = _getNoteIdx(noteId)
    if (deletedIdx !== -1) {
        gNotes.splice(deletedIdx, 1)
        _saveNotesToStorage
    }
}

// EDIT NOTE
function editNote(noteId, info) {
    const editIdx = _getNoteIdx(noteId)
    if (editIdx !== -1) {
        if (Object.keys(info)[0] === 'backgroundColor') {
            gNotes[editIdx].style = info
        } else {
            gNotes[editIdx].info = info
        }
        _saveNotesToStorage()
    }
}

// PIN/UNPIN NOTE
function toggleNotePin(noteId) {
    const toggleIdx = _getNoteIdx(noteId)
    if (toggleIdx !== -1) {
        gNotes[toggleIdx].isPinned = !gNotes[toggleIdx].isPinned
        _saveNotesToStorage()
    }
}

// DUPLICATE NOTE
function duplicateNote(noteId) {
    const duplicateIdx = _getNoteIdx(noteId)
    if (duplicateIdx !== -1) {
        const newCopy = JSON.parse(JSON.stringify(gNotes[duplicateIdx]))
        newCopy.id = utilService.makeId()
        gNotes.push(newCopy)
        _saveNotesToStorage()
    }
}

// GET NOTE INDEX
function _getNoteIdx(noteId) {
    const idx = gNotes.findIndex(note => noteId === note.id)
    return idx
}

// SAVE TO STORAGE
function _saveNotesToStorage() {
    storageService.save(NOTES_KEY, gNotes)
}

// LOAD FROM STORAGE
function _loadNotesFromStorage() {
    return storageService.load(NOTES_KEY)
}