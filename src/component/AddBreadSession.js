import React, {Component} from 'react'
import BreadSessionList from "./BreadSessionList";

class AddBreadSession extends Component {

    submitForm = () => {
        const url = BreadSessionList.BACKEND_URL + '/api/latest/bread-session'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.props.sessionAdded(data));
    }

    render() {
        return (
            <form>
                <input type="button" value="Create session" onClick={this.submitForm} class="btn btn-primary" />
            </form>
        );
    }
}

export default AddBreadSession;