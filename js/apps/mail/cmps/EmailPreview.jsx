// const { Link } = ReactRouterDOM;
import { emailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";

export function EmailPreview({ email }) {
  return (
    // <Link to={`/email/${car.id}`}>
    <div className="mail-preview">
      <div className="short-mail">
        <h4>{email.by}</h4>
        <h4>{email.subject}</h4>
        <h4 className="email-content">
          {emailService.getPreviewEmail(email.body)}
        </h4>
      </div>
      <div className="send-time">
        {utilService.getFormattedDateNTime(email.sentAt).time},
        {utilService.getFormattedDateNTime(email.sentAt).date}
      </div>
    </div>
    // </Link>
  );
}
