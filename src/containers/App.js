import React, { Component } from 'react';
import ErrorBoundry from '../components/ErrorBoundry';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }

    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots:users}))

    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })   
    }

    render() {
        const filteredRobots = this.state.robots.filter(
            robot => {
                return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
            }
        )
        if (this.state.robots.length === 0 )    {
            return <h1>Loading</h1>
        } else {
            return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={ this.onSearchChange } />
                <ErrorBoundry>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </ErrorBoundry>    
            </div>
            );
        }
    }
    
}

export default App;