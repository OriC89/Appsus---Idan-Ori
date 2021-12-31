const { Link } = ReactRouterDOM;
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
      if (!email) return this.props.history.push("/email-app");
      this.setState({ email });
    });
  };

  onGoBack = () => {
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
          {utilService.getFormattedDateNTime(email.sentAt).time},
          {utilService.getFormattedDateNTime(email.sentAt).date}
          {email.to}
        </div>
        <div className="email-body">{email.body}</div>
        <button onClick={this.onRemoveEmail}>Remove this Email</button>

        <Link to="/email-app">Go Back</Link>
      </section>
    );
  }
}
