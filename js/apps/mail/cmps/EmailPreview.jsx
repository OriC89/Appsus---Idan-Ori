const { Link } = ReactRouterDOM;
import { emailService } from "../services/email.service.js";
import { utilService } from "../../../services/util.service.js";

export function EmailPreview({ email }) {
  return (
    <div className={emailService.getPreviewClass(email.isRead)}>
      <Link className=" clean-link" to={`/email-app/${email.id}`}>
        <div className="preview-header">
          <h4 className="is-read">
            {email.by !== "Me" && emailService.getIsReadTxt(email.isRead)}
          </h4>
          <div className="send-time">
            {utilService.getFormattedDateNTime(email.sentAt).time},
            {utilService.getFormattedDateNTime(email.sentAt).date}
          </div>
        </div>
        <div className="preview-summary">
          <h2>By: {email.by}</h2>
          <h4>Subject: {email.subject}</h4>
          <h4 className="email-content">
            {emailService.getPreviewTxt(email.body)}
          </h4>
        </div>
      </Link>
    </div>
  );
}
