import { use, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import AddTeams from './AddTeams';
import MatchList from './MatchList';


//TODO order all matches by time, add team names, numbers and division, cookies store wanted teams, able to remove teams. adding teams doesnt work, fix it
const App = () => { // eslint-disable-next-line no-unused-vars
    const [teams, setTeams] = useState([11260, 19411])
    const [addTeams, setAddTeams] = useState(false)
    const [cookies, setCookie] = useCookies(null);

    useEffect(() => {
        if (cookies.teams) {
            setTeams(cookies.teams)
        } else {
            setTeams([11260, 19411])
        }
    }, [])

    const addTeamHandler = async (event) => {
        event.preventDefault();

        const updatedTeams = teams.concat(parseInt(event.target.teamNumber.value))
        setTeams(updatedTeams)
        setCookie('teams', updatedTeams, { path: '/' })
    };

    const backHandler = () => {
        setAddTeams(false)
    }

    const addTeamsHandler = () => {
        setAddTeams(true)
    }

    const removeTeam = (removeTeam) => {
        const updatedTeams = teams.filter(team => removeTeam !== team)
        setTeams(updatedTeams)
        setCookie('teams', updatedTeams, { path: '/' })

    }

    return (
        <>
            <h1>FTC Match Tracker</h1>

            {addTeams && <AddTeams submitHandler={addTeamHandler} teams={teams} backHandler={backHandler} removeHandler={removeTeam} />}
            {!addTeams && <button onClick={addTeamsHandler}>Add Teams</button>}
            <MatchList teams={teams} />
            <footer>
                <p>Created by Ari Yellin-Levine, FTC 4466</p>
                <p>Edit on Github <a href=""></a></p>
            </footer>
        </>
    )
}

export default App
