import { utilService } from "../js/services/util.service.js"

export class About extends React.Component {

    render() {

        return (
            <div className="about-page">
                <div className="about-info">
                    <h1>About Us and our services</h1>
                    <p>{utilService.makeLorem()}</p>
                </div>
            </div>
        )
    }
}