import { utilService } from "../js/services/util.service.js"

export class About extends React.Component {

    render() {

        return (
            <div className="about-page main-layout">
                <div className="about-img-container">
                    <img className="about-img" src="./assets/img/about.jpg" />
                </div>
                <div className="about-info">
                    <h1>The power of teamwork</h1>
                    <p>Behin every great human achievement, there is a team.</p>
                    <p>We are Appsus, your email and personal notes go to place. We inspired by those who dare, and by those who seeze those opportunities of self-growth and learning. </p>
                    <p>Our mission is to help unleash the potential of every team.</p>
                </div>
                <div className="who-we-are main-layout">
                    <div className="who-we-are-imgs">
                        <img className="who-we-are-img" src="assets/img/idan.jpg" />
                        <img className="who-we-are-img" src="assets/img/Ori.jpg" />
                    </div>
                    <div className="who-we-are-info">
                        <h1 className="name">Idan Rofeh</h1>
                        <h1 className="name">Ori Cohen</h1>
                    </div>
                </div>
            </div>
        )
    }
}