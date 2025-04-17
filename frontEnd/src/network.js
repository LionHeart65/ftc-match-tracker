import axios from "axios";

const getMatches = async (division) => {
    const response = await axios.get(`http://localhost:3001/api/matches/${division}`);

    return response.data;
};



export default { getMatches }
