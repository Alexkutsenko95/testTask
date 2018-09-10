import React, {PureComponent} from 'react';
import './App.scss';
import {fetchData} from './actions/sagasActions'
import {connect} from 'react-redux'

class App extends PureComponent {

    componentDidMount() {
        this.props.fetchData();
    }

    render() {

        return (
            <div className="App">
                {this.props.match.params.userId ? <h1>My Address Book {this.props.match.params.userId === 'user/new'
                    ? `/ New contact` : "/ Edit contact"}</h1> : <h1>My Address Book</h1>}
            </div>
        );
    }
}

const mapDispatchToProps = {fetchData};

export default connect(null, mapDispatchToProps)(App);
