const { NavLink } = ReactRouterDOM;

export class EmailNav extends React.Component {
  state = {
    filterBy: {
      category: null,
      search: "",
    },
  };

  onSetSearch = ({ target }) => {
    const value = target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, search: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
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
      }
    );
  };

  render() {
    return (
      <section className="mail-nav">
        <div id="inbox" onClick={this.onSetCategory} className="nav-btn">
          Inbox
        </div>
        <div id="read" onClick={this.onSetCategory} className="nav-btn">
          Read Messages
        </div>
        <div id="unRead" onClick={this.onSetCategory} className="nav-btn">
          Unread Messages
        </div>
        <div id="sentMail" onClick={this.onSetCategory} className="nav-btn">
          Sent Messages
        </div>
      </section>
    );
  }
}
