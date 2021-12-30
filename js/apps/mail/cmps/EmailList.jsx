// import { storageService } from "../../../services/storage.service.js";
// import { emailService } from "../services/mail.service.js";
import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails }) {
  if (!emails || !emails.length) return <h1>There are no emails to show</h1>;
  return (
    <section className="email-list">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} />
      ))}
    </section>
  );
}
