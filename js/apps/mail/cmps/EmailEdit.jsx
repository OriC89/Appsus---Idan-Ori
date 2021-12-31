import { utilService } from "../../../services/util.service.js";
import { emailService } from "../services/email.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";

export class EmailEdit extends React.Component {
  state = {
    email: {
      id: "",
      by: "Me",
      subject: "",
      body: "",
      isRead: true,
      sentAt: 0,
      to: "",
      isStarred: false,
    },
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(
      (prevState) => ({
        email: { ...prevState.email, [field]: value },
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  onGoBack = () => {
    this.props.history.push("/email-app");
  };

  onSendEmail = (ev) => {
    ev.preventDefault();
    const { email } = this.state;
    emailService.saveEmail(email).then(() => {
      eventBusService.emit("user-msg", { txt: "Sent !", type: "success" });
      this.onGoBack();
    });
  };

  render() {
    return (
      <section className="email-edit">
        <form onSubmit={this.onSendEmail}>
          <div className="edit-input">
            To:
            <input
              ref={this.inputRef}
              placeholder="Enter Email"
              name="to"
              type="email"
              id="to"
              onChange={this.handleChange}
            />
          </div>

          <div className="edit-input">
            Title:{" "}
            <input
              placeholder="Enter Title"
              name="title"
              type="text"
              id="title"
              onChange={this.handleChange}
            />
          </div>

          <div className="edit-input">
            Message:
            <br />
            <input
              className="message-body"
              name="body"
              type="text"
              id="body"
              onChange={this.handleChange}
            />
          </div>
          <button className="primary-btn ">Send Email</button>
        </form>
      </section>
    );
  }
}
