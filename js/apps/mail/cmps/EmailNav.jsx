const { Link, withRouter } = ReactRouterDOM;
import { eventBusService } from "../../../services/event-bus-service.js";

class _EmailNav extends React.Component {
  state = {
    unReadCount: 0,
    filterBy: {
      category: "inbox",
      search: "",
    },
    sortBy: "sentAt",
    isAdding: false,
  };

  componentDidMount = () => {
    this.removeEventBus = eventBusService.on("adding-finished", (isAdding) => {
      this.setState({ isAdding });
    });
    this.removeEventBus = eventBusService.on("unread-count", (unReadCount) => {
      this.setState({ unReadCount });
    });
  };

  componentWillUnmount() {
    this.removeEventBus();
  }

  onSetSearch = ({ target }) => {
    if (this.state.isAdding) return;
    var value = target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, search: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
        this.props.history.push("/email-app");
      }
    );
  };

  onSetCategory = ({ target }) => {
    this.state.isAdding = false;
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

  getHighlightFilter = (id, category) => {
    if (id === category && !this.state.isAdding) return "nav-btn selected-btn";
    else return "nav-btn";
  };

  getWriteEmailClass = () => {
    if (this.state.isAdding)
      return "compose-btn nav-btn clean-link selected-btn";
    else return "compose-btn nav-btn clean-link";
  };

  setIsWriting = () => {
    this.state.isAdding = !this.state.isAdding;
  };

  onSetSort = ({ target }) => {
    const sortBy = target.value;
    this.setState({ sortBy }, () => {
      this.props.setSort(this.state.filterBy);
      this.props.history.push("/email-app");
    });
  };

  render() {
    const { category } = this.state.filterBy;
    return (
      <section className="mail-nav">
        <div className="search-input nav-btn">
          <input
            ref={this.inputRef}
            placeholder="Search"
            name="search"
            type="text"
            id="search"
            onChange={this.onSetSearch}
          />
        </div>
        <Link
          className={this.getWriteEmailClass()}
          to="/email-app/edit"
          onClick={this.setIsWriting}
        >
          ➕ Compose Email
        </Link>
        <div className="filters">
          <div
            id="inbox"
            onClick={this.onSetCategory}
            className={this.getHighlightFilter("inbox", category)}
          >
            📥 Inbox
          </div>
          <div
            id="read"
            onClick={this.onSetCategory}
            className={this.getHighlightFilter("read", category)}
          >
            Read Messages
          </div>
          <div
            id="unRead"
            onClick={this.onSetCategory}
            className={this.getHighlightFilter("unRead", category)}
          >
            Unread Messages({this.state.unReadCount})
          </div>
          <div
            id="sentMail"
            onClick={this.onSetCategory}
            className={this.getHighlightFilter("sentMail", category)}
          >
            Sent Messages
          </div>
        </div>
      </section>
    );
  }
}

export const EmailNav = withRouter(_EmailNav);
