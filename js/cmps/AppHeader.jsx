const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    render() {
        return (
            <section className="header main-layout">
                <div className="logo">
                    <NavLink to="/" ></NavLink>
                </div>
                <nav className="nav-bar">
                    <NavLink activeClassName="my-active" exact to='/' ><i title="homepage" className="">HomePage</i></NavLink>
                    <NavLink to="/email" ><i title="email" className="">Email</i></NavLink>
                    <NavLink to="/notes" ><i title="notes" className="">Notes</i></NavLink>
                    <NavLink to="/about" ><i title="about" className="">About</i></NavLink>
                </nav>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)