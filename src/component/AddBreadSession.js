import React, {Component} from 'react'

class AddBreadSession extends Component {

    submitForm = () => {
        const url = '/api/latest/bread-session'
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
                <input type="button" value="Add session" onClick={this.submitForm} />
            </form>
        );
    }
}

export default AddBreadSession;