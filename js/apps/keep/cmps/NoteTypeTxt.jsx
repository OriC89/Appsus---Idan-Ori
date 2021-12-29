export function NoteTypeTxt({ noteId, info, selectedNote, onSaveEdit, onPrevPage, isColor }) {
    let noteInfo

    const txtRef = React.createRef()

    const handleRef = () => {
        noteInfo = { txt: txtRef.current.value }
        onSaveEdit(noteId, noteInfo)
    }

    if (!selectedNote || selectedNote !== noteId || isColor) {
        return (
            <div>
                <h2>{info.txt}</h2>
            </div>
        )
    } else {
        return (
            <div>
                <form>
                    <input ref={txtRef} name="text" type=" text" defaultValue={info.txt} />
                </form>
                <div>
                    <button onClick={() => handleRef()}> Save</button>
                    <button onClick={() => onPrevPage()}></button>
                </div>
            </div>
        )
    }
}