const mysql = require('../lib/mysql');

// Problem2
const getAllSportsToursAndMatches = async () => {
    const statement = 'select s.name as sportName, t.name as tourName, m.name as matchName, ' +
        'm.id as matchId, m.startTime as matchStartTime, m.format as matchFormat ' +
        'from matches m inner join tours t on m.tourId = t.id ' +
        'inner join sports s on t.sportId = s.id';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches
}