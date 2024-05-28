const mysql = require('../lib/mysql');

const getSportIdByTourId = async params => {
    const { tourId } = params;
    const statement = 'select sportId from tours where id = ?';
    const parameters = [ tourId ];
    const result = await mysql.query(statement, parameters);
    const [ firstObject ] = result;
    const { sportId } = firstObject;
    return sportId;
}

const getTourIdByMatchId = async params => {
    const { matchId } = params;
    const statement = 'select tourId from matches where id = ?';
    const parameters = [ matchId ];
    const result = await mysql.query(statement, parameters);
    const [ firstObject ] = result;
    const { tourId } = firstObject;
    return tourId;
}

const addNewsByMatchId = async params => {
    let { matchId } = params;
    matchId = Number(matchId);
    const { title, description } = params;
    const tourId = await getTourIdByMatchId(
        {
            'matchId': matchId
        }
    )
    const sportId = await getSportIdByTourId(
        {
            'tourId': tourId
        }
    );
    const statement = 'insert into news (title, description, sportId, tourId, matchId) ' + 
    'values (?, ?, ?, ?, ?)';
    const parameters = [ title, description, sportId, tourId, matchId];
    return await mysql.query(statement, parameters);
}

const addNewsByTourId = async params => {
    let { tourId } = params;
    tourId = Number(tourId);
    const { title, description } = params;
    const sportId = await getSportIdByTourId(
        {
            'tourId': tourId 
        }
    );
    const statement = 'insert into news (title, description, sportId, tourId) ' + 
    'values (?, ?, ?, ?)';
    const parameters = [title, description, sportId, tourId];
    return await mysql.query(statement, parameters);
}

const getNewsByMatchId = async params => {
    const { id } = params;
    const statement = 'select * from news where matchId = ?';
    const parameters = [ id ];
    return await mysql.query(statement, parameters);
}

const getNewsByTourId = async params => {
    const { id } = params;
    const statement = 'select * from news where tourId = ?';
    const parameters = [ id ];
    return await mysql.query(statement, parameters);
}

const getNewsBySportId = async params => {
    const { id } = params;
    const statement = 'select * from news where sportId = ?';
    const parameters = [ id ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    addNewsByMatchId: addNewsByMatchId,
    addNewsByTourId: addNewsByTourId,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}