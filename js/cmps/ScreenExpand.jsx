export function ScreenExpand({ isOpen, closeModal, }) {

    return (
        <div onClick={() => { closeModal(null) }} className={`screen ${(isOpen ? 'screen-on' : '')}`}></div>
    )
}