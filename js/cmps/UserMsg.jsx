// import { eventBusService } from '../services/event-bus-service.js'

// export class UserMsg extends React.Component {
//     state = {
//         msg: null
//     }

//     removeEventBus
//     timeOutId


//     componentDidMount() {
//         this.removeEventBus = eventBusService.on('userMsg', (msg) => {
//             this.setState({ msg }, () => {
//                 if (this.timeOutId) clearTimeout(this.timeOutId)
//                 this.timeOutId = setTimeout(this.onCloseMsg, msg.time)
//             })
//         })
//     }

//     componentWillUnmount() {
//         this.removeEventBus()
//     }

//     onCloseMsg = () => {
//         this.setState({ msg: null })
//         clearTimeout(this.timeOutId)
//       }

//       userAnswer = (answer) => {
//         eventBusService.emit('userAnswer', answer);
//         this.onCloseMsg()
//       }
// }