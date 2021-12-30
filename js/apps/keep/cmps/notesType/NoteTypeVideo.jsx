export function NoteTypeVideo({ noteId, info, selectedNote, onEditedNoteSave, onPrevPage }) {

    let userUrl
    const videoRef = React.createRef()

    const handleRef = () => {
        const newInfo = { url: videoRef.current.value }
        onEditedNoteSave(noteId, newInfo)
    }

    userUrl = info.url.replace('watch?v=', `embed/`)
    userUrl = userUrl.replace('youtube', 'youtube-nocookie')

    if (!selectedNote || selectedNote !== noteId) {
        return (
            <div className="note-video">
                <iframe src={userUrl}></iframe>
                <p>{info.title}</p>
            </div>
        )
    } else {
        return (
            <div className="note-video">
                <div className="edit-inputs">
                    <iframe src={userUrl}></iframe>
                    <p>Copy URL Here</p>
                    <input type="text" defaultValue={userUrl} ref={videoRef} />
                    <div className="edit-buttons">
                        <button className="btn edit-save" onClick={() => handleRef()}> SAVE! </button>
                        <button className="btn edit-goback fas fa-times" onClick={() => onPrevPage()}></button>
                    </div>
                </div>
            </div>
        )
    }
}