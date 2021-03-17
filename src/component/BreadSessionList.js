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

    state = this.initialState

    sessionAdded = (data) => {
        this.setState(data);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="container">
                <SessionInfo session={this.state}/>
                <AddBreadSession sessionAdded={this.sessionAdded} />
                <JoinBreadSession sessionAdded={this.sessionAdded} />
                <Table session={this.state} sessionAdded={this.sessionAdded} />
                <AddBread session={this.state} sessionAdded={this.sessionAdded} />
            </div>
        );
    }
}

const SessionInfo = (props) => {
    return <p>{props.session.pass}</p>

}

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Since</th>
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
    return (
        <table>
            <TableHeader />
            <TableBody session={props.session} sessionAdded={props.sessionAdded}/>
        </table>
    )
}
export default BreadSessionList;