// const { Link } = ReactRouterDOM;
import { emailService } from "../services/email.service.js";
import { utilService } from "../../../services/util.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";

export class EmailDetails extends React.Component {
  state = {
    email: null,
  };

  componentDidMount() {
    this.loadEmail();
  }

  loadEmail = () => {
    const { emailId } = this.props.match.params;
    emailService.getEmailById(emailId).then((email) => {
      if (!email.isRead) email.isRead = true;
      if (!email) return this.props.history.push("/email-app");
      this.setState({ email });
      emailService.saveEmail(email);
      this.props.loadEmails();
    });
  };

  onGoBack = () => {
    this.props.loadEmails();
    this.props.history.push("/email-app");
  };

  onRemoveEmail = () => {
    const { id } = this.state.email;
    emailService.removeEmail(id).then(() => {
      eventBusService.emit("user-msg", {
        txt: "Email is deleted !",
        type: "danger",
      });
      this.onGoBack();
    });
  };

  render() {
    const { email } = this.state;
    if (!email) return <h1>loading</h1>;
    return (
      <section className="email-details">
        <div className="email-subject">{email.subject}</div>
        <div className="main-details">
          <div>
            <span>{email.by}</span>, {email.senderEmail}
          </div>
          <div className="send-time">
            {utilService.getFormattedDateNTime(email.sentAt).time},
            {utilService.getFormattedDateNTime(email.sentAt).date}
          </div>
        </div>
        <div className="email-body">{email.body}</div>
        <button onClick={this.onRemoveEmail}>Remove this Email</button>
      </section>
    );
  }
}
