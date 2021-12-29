export function LongTxt({ text }) {

    let screenMaxSize = window.innerWidth
    window.onresize = () => {
        screenMaxSize = window.innerWidth
    }

    let txtToShow
    if (text.length > screenMaxSize / 40) {
        txtToShow = text.substring(0, screenMaxSize / 40) + '...'
    } else {
        txtToShow = text
    }

    return <p>{txtToShow}</p>
}