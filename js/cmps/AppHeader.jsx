const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  render() {
    return (
      <section className="header main-layout">
        <div className="logo">
          <NavLink to="/"><img className="logo-img" src="assets/img/logo.png" /></NavLink>
        </div>
        <nav className="nav-bar">
          <NavLink activeClassName="my-active" exact to="/">
            <i title="homepage" className="">
              Home
            </i>
          </NavLink>
          <NavLink to="/email-app">
            <i title="email" className="">
              Email
            </i>
          </NavLink>
          <NavLink to="/notes">
            <i title="notes" className="">
              Notes
            </i>
          </NavLink>
          <NavLink to="/about">
            <i title="about" className="">
              About
            </i>
          </NavLink>
        </nav>
      </section>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
