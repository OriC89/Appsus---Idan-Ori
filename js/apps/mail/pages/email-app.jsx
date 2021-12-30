import { emailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";
// import { storageService } from "../../../services/storage.service.js";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailNav } from "../cmps/EmailNav.jsx";
import { EmailDetails } from "../cmps/EmailDetails.jsx";

export class EmailApp extends React.Component {
  state = {
    emails: null,
    filterBy: { category: null, search: "" },
  };

  componentDidMount() {
    this.loadEmails();
  }

  get ctgSearchParam() {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    return urlSearchParams.get("ctg");
  }

  get carsToDisplay() {
    const { emails } = this.state;
    const ctg = this.ctgSearchParam;
    return emails.filter((email) => !ctg || email.ctg === ctg);
  }

  loadEmails = () => {
    const { filterBy } = this.state;
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
    return (
      <section className="email-app">
        <React.Fragment>
          <EmailNav onSetFilter={this.onSetFilter} />
          <EmailList emails={emails} />
        </React.Fragment>
      </section>
    );
  }
}
