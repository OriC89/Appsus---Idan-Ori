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
        type: "note-txt",
        info: { txt: "React is just another Reaction" },
        style: { backgroundColor: "#F0F8FF" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "note-img",
        info: { url: "./assets/img/by-img.jpg", title: "The throphy is ours!" },
        style: { backgroundColor: "#F5F5F5" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "note-todos",
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
        style: { backgroundColor: "#90EE90" },
        isPinned: true
    },
    {
        id: utilService.makeId(5),
        type: "note-video",
        info: { url: "https://www.youtube.com/watch?v=fqJmgOZlHQM&t=13s", title: "Victory in the cup finals!" },
        style: { backgroundColor: "#90EE90" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "note-txt",
        info: { txt: "Dinner, 20:00 with the Cohe's" },
        style: { backgroundColor: "#F5F5F5" },
        isPinned: false
    },
    {
        id: utilService.makeId(5),
        type: "note-video",
        info: { url: "https://www.youtube.com/watch?v=0kt_D4PFfp0", title: "For Oren Yaniv :-)" },
        style: { backgroundColor: "#F0F8FF" },
        isPinned: true,
    },
]


function query(filterBy = null) {
    let notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        notes = gNotes
        _saveNotesToStorage
    }
    if (!filterBy) return Promise.resolve(notes)
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    console.log('notes from query', filteredNotes)
    console.log(filteredNotes);
    return Promise.resolve(filteredNotes)
}

function _getFilteredNotes(notes, filterBy) {
    let { type, txt } = filterBy
    return notes.filter(note => {
        return note.type.includes(type) && (note.info.txt ? note.info.txt.includes(txt) : false ||
            note.info.title ? note.info.title.includes(txt) : false)
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
    gNotes.push(newNote)
    _saveNotesToStorage()
}

// DELETE NOTE
function removeNote(noteId) {
    const deletedIdx = _getNoteIdx(noteId)
    if (deletedIdx !== -1) {
        gNotes.splice(deletedIdx, 1)
        _saveNotesToStorage()
    }
    return Promise.resolve()
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
    const newDuplicate = _getNoteIdx(noteId)
    if (newDuplicate !== -1) {
        const newCopy = JSON.parse(JSON.stringify(gNotes[newDuplicate]))
        newCopy.id = utilService.makeId()
        gNotes.push(newCopy)
        _saveNotesToStorage()
    }
}

// GET NOTE BY ID 
function _getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    var note = notes.find(note => {
        return noteId === note.id
    })
    return Promise.resolve(note)
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