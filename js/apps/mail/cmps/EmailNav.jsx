const { NavLink } = ReactRouterDOM;

export function EmailNav() {
  return (
    <section className="email-nav">
      <div>Inbox</div>
      <div>Read Messages</div>
      <div>Unread Messages</div>
      <div>Sent Messages</div>
    </section>
  );
}
