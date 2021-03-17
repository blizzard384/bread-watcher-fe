import React, {Component} from 'react'
import BreadSessionList from "./BreadSessionList";

class ChangeBreadAmount extends Component {

    state = this.props.bread;

    submitForm = (event) => {
        const url = BreadSessionList.BACKEND_URL + '/api/latest/bread-session'
        const session = this.props.session;
        const i = session.breads.findIndex(b => b.id === this.state.id);
        session.breads[i].amount = event.target.value;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.props.sessionAdded(data));
    }

    render() {
        return (
            <form>
                <input type="range" step="0.2" min="0.0" max="1" value={this.state.amount} onMouseUp={this.submitForm} onChange={event => this.setState({amount: event.target.value})}/>
            </form>
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(nextProps.bread);
    }
}

export default ChangeBreadAmount;