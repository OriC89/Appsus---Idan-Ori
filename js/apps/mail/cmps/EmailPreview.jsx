const { Link } = ReactRouterDOM
import { mailService } from "../services/mail.service"

export function EmailPreview({ email }) {
    return (
        // <Link to={`/email/${car.id}`}>
            <div className="email-preview">
                <h4>{email.by}</h4>
                <h4>{email.subject}</h4>
                <h4 className="email-content">{mailService.getPreviewEmail(email.body)}</h4>
            </div>
        // </Link>
    )
}