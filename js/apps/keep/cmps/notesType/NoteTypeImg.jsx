export function NoteTypeImg({ noteId, info, selectedNote, onEditedNoteSave, onUnselectedNote }) {

    const urlRef = React.createRef()
    const urlTitle = React.createRef()

    const handleRef = () => {
        const setInfo = {
            url: urlRef.current.value,
            title: urlTitle.current.value
        }
        onEditedNoteSave(noteId, setInfo)
    }

    if (!selectedNote || selectedNote != noteId) {
        return (
            <div className="note-card">
                <img className="img-Note" src={`${info.url}`} />
                <h3>{info.title}</h3>
            </div>
        )

    } else {
        return (
            <div className="edit-note">
                <img className="img-Note" src={`${info.url}`} />
                <div className="edit-inputs">
                    <p>Copy URL Here </p>
                    <input type="text" defaultValue={info.url} ref={urlRef} />
                    <input type="text" defaultValue={info.title} ref={urlTitle} />
                    <div className="edit-buttons">
                        <button onClick={() => handleRef()} className="btn edit-save" > SAVE! </button>
                        <button onClick={() => onUnselectedNote()} className="btn edit-goback fas fa-times" ></button>
                    </div>
                </div>
            </div>
        )

    }
}