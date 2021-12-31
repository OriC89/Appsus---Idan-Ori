const { Link, withRouter } = ReactRouterDOM;
import { eventBusService } from "../../../services/event-bus-service.js";

class _EmailNav extends React.Component {
  state = {
    unReadCount: 0,
    filterBy: {
      category: null,
      search: "",
    },
    sortBy: null,
  };

  componentDidMount = () => {
    eventBusService.on("unread-count", (unReadCount) => {
      this.setState({ unReadCount });
    });
  };

  onSetSearch = ({ target }) => {
    const value = target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, search: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
        this.props.history.push("/email-app");
      }
    );
  };

  onSetCategory = ({ target }) => {
    const category = target.id;
    this.setState(
      (prevState) => ({
        filterBy: { ...prevState.filterBy, category: category },
      }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
        this.props.history.push("/email-app");
      }
    );
  };

  render() {
    return (
      <section className="mail-nav">
        <Link className="compose-btn nav-btn clean-link" to="/email-app/edit">
          ➕ Write Email
        </Link>
        <div className="search-input">
          Search Emails:
          <input
            ref={this.inputRef}
            placeholder="Enter Text"
            name="search"
            type="text"
            id="search"
            onChange={this.onSetSearch}
          />
        </div>
        <div id="inbox" onClick={this.onSetCategory} className="nav-btn">
          📥 Inbox
        </div>
        <div id="read" onClick={this.onSetCategory} className="nav-btn">
          Read Messages
        </div>
        <div id="unRead" onClick={this.onSetCategory} className="nav-btn">
          Unread Messages({this.state.unReadCount})
        </div>
        <div id="sentMail" onClick={this.onSetCategory} className="nav-btn">
          Sent Messages
        </div>
      </section>
    );
  }
}

export const EmailNav = withRouter(_EmailNav);
