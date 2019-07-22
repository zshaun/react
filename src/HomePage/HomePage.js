import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './HomePage.css'

class HomePage extends React.Component {

    state = {
        parts: [],
        names: [],
        searchName: '',
        name: '',
        description: '',
        number: '',
        price: '', 
        focus: false
    }

    handleSubmit(event) {
        event.preventDefault();
        let parts = this.state.parts;
        let names = this.state.names;
        parts.push({ name: this.state.name, description: this.state.description, number: this.state.number, price: this.state.price })
        if (!names.includes(this.state.name)) names.push(this.state.name)
        this.setState({ parts: parts, names: names, focus: false, searchName: '' })
        console.log(this.state)
    }

    handleChange(e) {
        if (e.target.name === 'searchName') {
            this.setState({ searchName: e.target.value, focus: true })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    componentDidMount() {
        this.props.getUsers();
    }


    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>Hi {user.firstName}!</h1>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="name">Part Name</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Part Description</label>
                                <textarea className="form-control" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} row={2} required />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="number">Part Number</label>
                                <input type="number" step={1} className="form-control" name="number" value={this.state.number} onChange={(e) => this.handleChange(e)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Part Price</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                        <span className="input-group-text">0.00</span>
                                    </div>
                                    <input type="number" step="any" className="form-control" name="price" value={this.state.price} onChange={(e) => this.handleChange(e)} required />
                                </div>

                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br></br>
                {this.state.parts.length === 0 ? null :
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group search-group">
                                <label htmlFor="name">Part Name</label>
                                <input type="text" className="form-control search-control" name="searchName" value={this.state.searchName} onChange={(e) => this.handleChange(e)} />
                            </div>
                            {this.state.focus && this.state.searchName !== '' ?
                                <ul className="list-group ">
                                    {this.state.names.map(name => (
                                        name.includes(this.state.searchName) ?
                                            <li className="list-group-item" key={name}>
                                                {name}
                                                {/* <span className="badge badge-primary badge-pill">14</span> */}
                                            </li>
                                            : null
                                    ))}
                                </ul>
                                : null}
                        </div>
                        <div className="col-sm-9">
                            <label>Result Table</label>
                            <table className="table table-bordered table-striped table-sm">
                                <thead>
                                    <tr className="table-active"><th>Part Name</th><th>Part Description</th><th>Part Number</th><th>Part Price</th></tr>
                                </thead>
                                <tbody>
                                    {this.state.parts.map((part, id) => (
                                        part.name.includes(this.state.searchName) ?
                                            <tr key={id}>
                                                <td>{part.name}</td>
                                                <td>{part.description}</td>
                                                <td>{part.number}</td>
                                                <td>{part.price}</td>
                                            </tr> : null
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };