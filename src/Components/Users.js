import React from 'react';
import {List} from './List';
import './User.scss'
import {Link} from 'react-router-dom';
import {deleteData, fetchData} from "../actions";
import {connect} from "react-redux";


class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialItems: props.users || [],
            items: props.users || [],
            filter: ''
        };
    }

    filterList(event) {
        const {initialItems} = this.state;
        let updatedList = initialItems.filter((item) => {
            return item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.users === void 0) {
            let filteredUsers = this.props.users.filter((item) => {
                return item.name.toLowerCase().search(
                    this.state.filter.toLowerCase()) !== -1;
            });
            this.setState({items: filteredUsers, initialItems: filteredUsers})
        }

        if (prevProps.users !== void 0 && prevProps.users.length > this.props.users.length) {
            let filteredUsers = this.props.users.filter((item) => {
                return item.name.toLowerCase().search(
                    this.state.filter.toLowerCase()) !== -1;
            });
            this.setState({items: filteredUsers, initialItems: filteredUsers})
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.users !== void 0
    }

    render() {
        const {deleteData} = this.props;

        return (
            <div className="filter-list">
                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Search"
                               onChange={this.filterList.bind(this)}/>
                    </fieldset>
                </form>
                <List items={this.state.items} deleteData={deleteData}/>
                <Link className="plus" to={`/user/new`}>

                    +
                </Link>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {users: state.users.users};
};
const mapDispatchToProps = {deleteData, fetchData};

export default connect(mapStateToProps, mapDispatchToProps)(Users)