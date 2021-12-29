const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    render() {
        return (
            <section className="header main-layout">
                <div className="logo">
                    <NavLink to="/" ></NavLink>
                </div>
                <nav className="nav-bar">
                    <NavLink activeClassName="my-active" exact to='/' ><i title="homepage" className=""></i></NavLink>
                    <NavLink to="/email" ><i title="email" className=""></i></NavLink>
                    <NavLink to="/notes" ><i title="notes" className=""></i></NavLink>
                    <NavLink to="/about" ><i title="about" className=""></i></NavLink>
                </nav>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)