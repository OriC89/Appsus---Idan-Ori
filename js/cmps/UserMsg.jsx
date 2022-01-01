import { eventBusService } from '../services/event-bus-service.js'

export class UserMsg extends React.Component {

  state = {
    msg: null
  }
  removeEventBus
  timeoutId

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.onCloseMsg, msg.time)
      })
    })
  }

  componentWillUnmount() {
    this.removeEventBus()
  }

  onCloseMsg = () => {
    this.setState({ msg: null })
    clearTimeout(this.timeoutId)
  }

  render() {
    const { msg } = this.state
    if (!msg) return <React.Fragment></React.Fragment>
    if (msg.type === 'Deleted' || 'Pinned' || 'Duplicated') return (
      <React.Fragment>
        <section className={`user-msg message`}>
          <button className="close-msg-btn" onClick={this.onCloseMsg}>X</button>
          <h1>{msg.txt}</h1>
        </section>
        <div className="user-msg-screen"></div>
      </React.Fragment>
    )
  }
}