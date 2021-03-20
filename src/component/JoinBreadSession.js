import React, {Component} from 'react'
import BreadSessionList from "./BreadSessionList";

class JoinBreadSession extends Component {

    state = {hash: '', error: ''};

    submitForm = () => {
        const url = BreadSessionList.BACKEND_URL + '/api/latest/bread-session/' + this.state.hash;
        const requestOptions = {method: 'GET'};

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    this.setState({error: ''});
                    response.json().then(data => this.props.sessionAdded(data));
                } else {
                    response.json().then(data => this.setState({error: data.message}));

                }
            });
    }

    render() {
        return (
            <div>
                <p>{this.state.error}</p>
                <form>
                    <div className="input-group mb-2">
                        <input type="text" value={this.state.hash}
                               onChange={event => this.setState({hash: event.target.value})} className="form-control"
                               placeholder="Session hash"
                               aria-label="Session hash" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <input type="button" value="Join session" onClick={this.submitForm}
                                   className="btn btn-outline-secondary"/>
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

export default JoinBreadSession;