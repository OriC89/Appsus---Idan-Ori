const { NavLink } = ReactRouterDOM;

export function EmailNav(){
    return(
        <section className="email-nav">
            <button>Inbox</button>
            <button>Read Messages</button>
            <button>Unread Messages</button>
            <button>Sent Messages</button>
        </section>
    )
}