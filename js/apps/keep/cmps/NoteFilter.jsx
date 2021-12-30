export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            type: '',
            txt: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        this.setState({ filterBy: { type: '', txt: '' } })
    }

    render() {
        const { filterBy: { type, txt } } = this.state
        return (
            <form className="note-filter" onSubmit={this.onSubmitFilter}>
                <label
                    htmlFor="by-type">Type:</label>
                <input
                    placeholder="text/img/todos/video"
                    type="text"
                    min="0"
                    id="by-type"
                    name="type"
                    value={type}
                    onChange={this.handleChange} />
                <label
                    htmlFor="by-txt">Text:</label>
                <input
                    placeholder="Free Text"
                    type="text"
                    min="0"
                    id="by-txt"
                    name="txt"
                    value={txt}
                    onChange={this.handleChange} />
                <button className="primary-btn">Filter</button>
            </form>
        )
    }
}