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
            <form>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <select value={this.state.daysAgo}
                                    onChange={event => this.setState({daysAgo: event.target.value})}>
                                <option value="0">Today</option>
                                <option value="1">1 day ago</option>
                                <option value="2">2 days ago</option>
                                <option value="3">3 days ago</option>
                                <option value="4">4 days ago</option>
                                <option value="5">5 days ago</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" value={this.state.name}
                                   onChange={event => this.setState({name: event.target.value})}/>
                        </td>
                        <td>
                            <input type="button" value="Add bread" onClick={this.submitForm}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        );
    }

    componentDidMount() {
        setInterval(() => this.setState({timestamp: new Date()}), 1000)
    }
}

export default AddBread;