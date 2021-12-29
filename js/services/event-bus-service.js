function on(eventName, listener) {
    const addListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, addListener)
    return () => {
        window.removeEventListener(eventName, addListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const eventBusService = { on, emit }

window.myBus = eventBusService