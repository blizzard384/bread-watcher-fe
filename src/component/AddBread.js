import React, {Component} from 'react'
import moment from 'moment';
import BreadSessionList from "./BreadSessionList";

class AddBread extends Component {

    initialState = {name: '', daysAgo: 0}

    state = this.initialState

    submitForm = () => {
        const url = BreadSessionList.BACKEND_URL + '/api/latest/bread-session'
        const session = this.props.session;
        const timestamp = moment(new Date()).subtract(this.state.daysAgo, 'day');
        session.breads.push({id: session.breads.length, name: this.state.name, amount: 1, timestamp: timestamp})
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(session)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.props.sessionAdded(data))
            .then(() => this.setState(this.initialState));
    }

    render() {
        return (
            <form className="form-inline mb-5">
                <div className="form-group col-3 px-0 mr-1">
                    <select value={this.state.daysAgo}
                            onChange={event => this.setState({daysAgo: event.target.value})} className="form-control w-100">
                        <option value="0">Today</option>
                        <option value="1">1 day ago</option>
                        <option value="2">2 days ago</option>
                        <option value="3">3 days ago</option>
                        <option value="4">4 days ago</option>
                        <option value="5">5 days ago</option>
                    </select>
                </div>
                <div className="form-group col-6 px-0 mr-1">
                    <input type="text" value={this.state.name}
                           onChange={event => this.setState({name: event.target.value})} className="form-control w-100" placeholder="Name"/>
                </div>
                <input type="button" value="Add" onClick={this.submitForm} class="btn btn-primary col-auto form-group"/>
            </form>
        );
    }
}

export default AddBread;