export function NoteTypeTxt({ noteId, info, selectedNote, onEditedNoteSave, onPrevPage, isColor }) {
    let setInfo;

    const txtRef = React.createRef()

    const handleRef = () => {
        setInfo = { txt: txtRef.current.value }
        onEditedNoteSave(noteId, setInfo)
    }

    if (!selectedNote || selectedNote != noteId || isColor) {
        return (
            <div className="note-txt">
                <h2>{info.txt}</h2>
            </div>
        )
    } else {
        return (
            <div className="edit-note">
                <form className="edit-inputs-todos">
                    <input className="txt" ref={txtRef} name="text" type=" text" defaultValue={info.txt} />
                </form>
                <div className="edit-buttons">
                    <button className="btn edit-save" onClick={() => handleRef()}> SAVE! </button>
                    <button className="btn edit-goback fas fa-times" onClick={() => onPrevPage()}></button>
                </div>
            </div>
        )
    }
}