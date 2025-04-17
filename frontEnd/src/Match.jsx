const Match = ({ match, teams }) => {


    const includedTeams = match.teams.filter(team => {
        let value = false;
        teams.map(listTeam => {
            if (listTeam === team.teamNumber) {
                value = true;
            }
        })
        return value
    })

    const date = new Date(match.startTime)


    const formattedTime = `${date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })} at ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })}`;

    const teamStrings = includedTeams.map((team) => `${team.teamNumber} ${team.teamName}`)


    return (
        <>
            <p>{match.matchNumber} - {formattedTime} - {teamStrings.map(team => team + " ")}</p>
        </>
    )
}

export default Match