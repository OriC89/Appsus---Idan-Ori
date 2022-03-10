const { Route, Switch } = ReactRouterDOM;

import { emailService } from "../services/email.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";
// import { storageService } from "../../../services/storage.service.js";
import { EmailList } from "../cmps/EmailList.jsx";
import { EmailNav } from "../cmps/EmailNav.jsx";
import { EmailDetails } from "../cmps/EmailDetails.jsx";
import { EmailEdit } from "../cmps/EmailEdit.jsx";

export class EmailApp extends React.Component {
  state = {
    emails: null,
    filterBy: { category: null, search: "" },
  };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    emailService
      .query({ category: "unRead", search: "" })
      .then((unReadEmails) => {
        eventBusService.emit("unread-count", unReadEmails.length);
      });
    const { filterBy } = this.state;
    emailService.query(filterBy).then((emails) => {
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
        <EmailNav onSetFilter={this.onSetFilter} emails={emails} />
        <Switch>
          <Route
            exact
            path="/email-app/edit"
            render={(props) => (
              <EmailEdit {...props} loadEmails={this.loadEmails} />
            )}
          />
          <Route
            exact
            path="/email-app/:emailId"
            render={(props) => (
              <EmailDetails {...props} loadEmails={this.loadEmails} />
            )}
          />
          <Route
            exact
            path="/email-app"
            render={(props) => <EmailList emails={emails} {...props} />}
          />
        </Switch>
      </section>
    );
  }
}
