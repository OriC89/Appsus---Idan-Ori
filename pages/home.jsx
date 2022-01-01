const { Link } = ReactRouterDOM;

export function Home() {
    return (

        <section className="home">
            <div className="home-container">
                <h1 className="welcome">Appsus</h1>
                <div className="home-info">
                    <h2 className="desc">Email & Notes</h2>
                    <h2 className="slogan">Keep everything importatnt</h2>
                    <h4>In one place</h4>
                    <Link to="/email-app"><button className="home-btn">Email</button></Link>
                    <Link to="/notes"><button className="home-btn">Notes</button></Link>
                </div>
            </div>
        </section>
    )
}