import { useState } from 'react';

const AddTeams = ({ submitHandler, teams, backHandler, removeHandler }) => {

    // eslint-disable-next-line no-unused-vars
    const [newTeamNumber, setNewTeamNumber] = useState(12345)


    const numberHandler = (event) => {
        setNewTeamNumber(event.target.value)
    }


    return (
        <div onSubmit={submitHandler} >
            <h2>Add Teams</h2>
            <form>
                <label>
                    Team Number:
                    <input type="text" name="teamNumber" value={newTeamNumber} onChange={numberHandler} />
                </label>
                <br />

                <button type="submit">Add Team</button>
            </form>

            <h3>Current Teams</h3>
            {teams.map(team => (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <p style={{ margin: 0 }} key={team}>{team}</p>
                    <button onClick={() => removeHandler(team)}>Remove</button>
                </div>

            ))}

            <button onClick={backHandler}>Back</button>
        </div >
    )
}

export default AddTeams;