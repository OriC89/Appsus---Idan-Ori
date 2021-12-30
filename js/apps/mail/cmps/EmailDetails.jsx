const { Link } = ReactRouterDOM;
import { emailService } from "../services/mail.service.js";
import { utilService } from "../../../services/util.service.js";

export class EmailDetails extends React.Component {
  state = {
    email: null,
  };

  componentDidMount() {
    console.log("props in EmailDetails", this.props);
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

        <Link to="/email-app">Go Back</Link>
      </section>
    );
  }
}
