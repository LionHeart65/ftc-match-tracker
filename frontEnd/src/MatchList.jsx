import network from "./network"
import { useEffect, useState } from "react"
import Match from "./Match"

const MatchList = ({ teams }) => {

    const [matches, setMatches] = useState([])
    const [requestedMatches, setRequestedMatches] = useState([])
    const [showComplete, setShowComplete] = useState(false)

    const getMatches = async () => {
        const divisions = ["FTCCMP1FRAN", "FTCCMP1OCHO", "FTCCMP1EDIS", "FTCCMP1JEMI"];
        const results = await Promise.all(divisions.map(division => network.getMatches(division)));
        const allMatches = results.flatMap(result => result.schedule);
        setMatches(allMatches);
    }

    const completeHandler = () => {
        setShowComplete(!showComplete)
    }

    useEffect(() => {
        getMatches()
    }, [])

    useEffect(() => {
        setRequested()
    }, [teams, matches, showComplete])


    const setRequested = () => {

        let matchList = matches.filter((match) => {
            const teamList = match.teams.map((team) => team.teamNumber);

            let matchFound = false;

            teams.forEach((team) => {
                if (teamList.includes(team)) {
                    matchFound = true;
                }
            })
            return matchFound
        })

        matchList.sort((a, b) => a.matchNumber - b.matchNumber);

        if (showComplete) {
            return setRequestedMatches(matchList)
        }
        matchList = matchList.filter(match => (
            match.scoreRedFinal === null || match.scoreBlueFinal === null
        ))
        setRequestedMatches(matchList)
    }


    if (!matches) {
        return (<>
            <p>Loading...</p>
        </>)
    }

    if (showComplete) {
        return (
            <>
                <h3>Matches</h3>
                <button onClick={completeHandler}>Hide Complete Matches</button>
                <ul>
                    {requestedMatches.map(match => <li key={match.matchNumber + match.teams[0].teamNumber}><Match match={match} teams={teams} /> </li>)}
                </ul>

            </>
        )
    } else {

        return (
            <>
                <h3>Matches</h3>
                <button onClick={completeHandler}>Show Complete Matches</button>
                <ul>
                    {requestedMatches.map(match => <li key={match.matchNumber + match.teams[0].teamNumber}><Match match={match} teams={teams} /> </li>)}
                </ul>

            </>
        )

    }
}

export default MatchList;