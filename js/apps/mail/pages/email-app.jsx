import { emailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";
import { storageService } from "../../../services/storage.service.js";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailNav } from "../cmps/EmailNav.jsx";

export class EmailApp extends React.Component {
  state = {
    emails: null,
    filterBy: null,
  };

  componentDidMount() {
    console.log("h");
    this.loadEmails();
  }

  // get ctgSearchParam() {
  //   const urlSearchParams = new URLSearchParams(this.props.location.search);
  //   return urlSearchParams.get("ctg");
  // }

  // get carsToDisplay() {
  //   const { emails } = this.state;
  //   const ctg = this.ctgSearchParam;
  //   return emails.filter((email) => !ctg || email.ctg === ctg);
  // }

  loadEmails = () => {
    const { filterBy } = this.state;
    // console.log("before query", this.state.emails);
    emailService.query(filterBy).then((emails) => {
      eventBusService.emit("emails-count", emails.length);
      this.setState({ emails });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadEmails);
  };

  render() {
    const { emails } = this.state;
    console.log("emails at render", emails);
    return (
      <section className="email-app">
        <EmailNav onSetFilter={this.onSetFilter} />
        <EmailList emails={emails} />
      </section>
    );
  }
}
