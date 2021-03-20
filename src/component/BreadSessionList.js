import React, {Component} from 'react'
import AddBreadSession from "./AddBreadSession";
import AddBread from "./AddBread";
import ChangeBreadAmount from "./ChangeBreadAmount";
import JoinBreadSession from "./JoinBreadSession";

class BreadSessionList extends Component {

    static BACKEND_URL = 'https://bread-watcher.herokuapp.com';

    initialState = {
        pass: '',
        breads: []
    }

    state = this.initialState;

    componentDidMount() {
        const hash = localStorage.getItem('session_pass');
        if (hash) {
            const url = BreadSessionList.BACKEND_URL + '/api/latest/bread-session/' + hash;
            const requestOptions = {method: 'GET'};

            fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => this.sessionAdded(data));
                    } else {
                        localStorage.removeItem('session_pass');
                    }
                });
        }
    }

    sessionAdded = (data) => {
        this.setState(data);
        localStorage.setItem('session_pass', this.state.pass);
    }

    reset = () => {
        localStorage.removeItem('session_pass');
        this.setState(this.initialState);
    }

    render() {
        if (this.state.pass) {
            return (
                <div className="container">
                    <Table session={this.state} sessionAdded={this.sessionAdded} />
                    <AddBread session={this.state} sessionAdded={this.sessionAdded} />
                    <SessionInfo session={this.state} reset={this.reset}/>
                </div>
            );
        }
        return (
            <div className="container">
                <AddBreadSession sessionAdded={this.sessionAdded} />
                <JoinBreadSession sessionAdded={this.sessionAdded} />
            </div>
        );
    }
}

const SessionInfo = (props) => {
    return (
        <p>{props.session.pass} <input type="button" value="Leave session" onClick={() => props.reset()}
                                          className="btn btn-danger"/></p>
    )

}

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Since</th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.session.breads.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td><ChangeBreadAmount session={props.session} bread={row} sessionAdded={props.sessionAdded} /></td>
                <td>{calculateAge(row.timestamp)}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

const calculateAge = (timestamp) => {
    const days = Math.round((new Date() - new Date(timestamp))/(1000*60*60*24));

    return days === 0 ? 'today' : days + ' days ago';
}

const Table = (props) => {
    if (props.session.breads.length > 0) {
        return (
            <table class="table">
                <TableHeader/>
                <TableBody session={props.session} sessionAdded={props.sessionAdded}/>
            </table>
        )
    }
    return null;
}
export default BreadSessionList;