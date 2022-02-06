import React, { useState, useEffect } from 'react';
import ErrorBoundry from '../components/ErrorBoundry';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
    },[])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value )   
    }

    const filteredRobots = robots.filter(
        robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        }
    )
    if (robots.length === 0 )    {
        return <h1>Loading</h1>
    } else {
        return (
        <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox searchChange={ onSearchChange } />
            <ErrorBoundry>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </ErrorBoundry>    
        </div>
        );
    }    
}

export default App;