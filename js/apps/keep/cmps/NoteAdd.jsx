export function NoteAdd({ inputType, setInputType, creatNote }) {

    const formRef = React.createRef()
    const actionBtns = React.createRef()
    const extraInput = React.createRef()
    const addNote = React.createRef()
    const input1 = React.createRef()
    const input2 = React.createRef()

    const onFormInteraction = (ev) => {
        const form = ev.target.form
        form.classList.add('expand-form') // open expansion
        actionBtns.current.classList.add('inside-form-visible')
        if (inputType !== 'note-txt') {
            extraInput.current.classList.add('inside-form-visible')
        }
        addNote.current.classList.add('inside-form-visible')
    }

    const onSetNoteType = (type) => {
        setInputType(type)
        formRef.current.classList.add('expand-form') // Expand
        actionBtns.current.classList.add('inside-form-visible') //show action btns
        if (type !== 'note-txt') extraInput.current.classList.add('inside-form-visible')  // show extra input
        else extraInput.current.classList.remove('inside-form-visible')
        addNote.current.classList.add('inside-form-visible') // show add btn
    }

    const onFormInactivity = (ev) => {
        const form = ev.target.form // close expansion
        form.classList.remove('expand-form')
        actionBtns.current.classList.remove('inside-form-visible')   // hide action buttons
        extraInput.current.classList.remove('inside-form-visible')   // hide
        addNote.current.classList.remove('inside-form-visible')      // hide add btn
    }

    const onAddNote = () => {
        const titleInput = input1.current.value
        const detailsInput = input2.current.value
        if (!titleInput) return // empty note safty
        let info
        if (inputType === 'note-txt') {
            info = { txt: titleInput }
        } else if (inputType === 'note-img' || inputType === 'note-video') {
            if (!detailsInput) return // empty vid img url safty
            info = { title: titleInput, url: detailsInput }
        } else if (inputType === 'note-todos') {
            if (!detailsInput) return // empty todos safty
            const todos = detailsInput.split(',').map(todo => {
                return { txt: todo, doneAt: null }
            })
            info = { label: titleInput, todos }
        }
        creatNote(info)
        input1.current.value = ''
        input2.current.value = ''
    }

    return (
        <section className="notes-input notes-layout">
            <form className="notes-input-form" ref={formRef}>
                <label htmlFor="notes-title"></label>
                <input className="add-input" id="notes-title" type="text" placeholder="Note Title Here" autoComplete="off" onFocus={onFormInteraction} onBlur={onFormInactivity} ref={input1} />
                <div className={`optional-input ${inputType !== 'note-txt' ? 'inside-form-visible' : ''}`} ref={extraInput}>
                    <label htmlFor="notes-content"></label>
                    <input id="notes-content" type="text" placeholder={(inputType === 'note-todos' ? 'Todos Goes Here(use , to separate)' : 'Url goes here')} autoComplete="off" onFocus={onFormInteraction} onBlur={onFormInactivity} ref={input2} />
                </div>
                <div className="choose-type-btns" ref={actionBtns}>
                    <i title="text" tabIndex="-1" onFocus={(ev) => { ev.target.click() }} onBlur={(ev) => { ev.target.blur() }} onClick={() => { onSetNoteType('note-txt') }} style={{ color: (inputType === 'note-txt' ? '#efc718' : 'white') }} className="far fa-file-alt"></i>
                    <i title="todo list" tabIndex="-1" onFocus={(ev) => { ev.target.click() }} onBlur={(ev) => { ev.target.blur() }} onClick={() => { onSetNoteType('note-todos') }} style={{ color: (inputType === 'note-todos' ? '#efc718' : 'white') }} className="fas fa-list-ul"></i>
                    <i title="image" tabIndex="-1" onFocus={(ev) => { ev.target.click() }} onBlur={(ev) => { ev.target.blur() }} onClick={() => { onSetNoteType('note-img') }} style={{ color: (inputType === 'note-img' ? '#efc718' : 'white') }} className="far fa-image"></i>
                    <i title="youtube video" tabIndex="-1" onFocus={(ev) => { ev.target.click() }} onBlur={(ev) => { ev.target.blur() }} onClick={() => { onSetNoteType('note-video') }} style={{ color: (inputType === 'note-video' ? 'green' : 'white') }} className="fab fa-youtube"></i>
                </div>
                <button title="add note" tabIndex="-1" onFocus={(ev) => { ev.target.click() }} onBlur={(ev) => { ev.target.blur() }} onClick={onAddNote} ref={addNote} className="add-note-btn fas fa-plus add-input"></button>
            </form>
        </section>
    )
}   