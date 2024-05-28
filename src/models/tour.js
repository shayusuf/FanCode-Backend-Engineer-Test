const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    /**
     * Problem 1: 
     * 
     * Primary key `id` and foreign key `tourId` of `matches` table and 
     * primary key `id` of `tours` table are indexed by default by a SQL engine,
     * so joins will be fast when these columns are used for join criterion. 
     * 
     * `name` column of `tours` table is not indexed; to quickly fetch the `id` of a tour
     * given the tour name we may have to index `name` of a tour.
     * 
     * this way we can fetch tour `id` from `name` in O(1) time and with tour `id` 
     * whose corresponding value in `matches` table is `tourId` which is also indexed so we can
     * fetch matches in O(1) time. This can be achieved through a sub-query to get tour id from 
     * `tours` table and then querying the matched table.
     * 
     * As per my understanding the systems seems to be a Read heavy than Write,
     * so event though writes (update/add/delete) to `tours` table might increase write latency
     * due to increased index management but it won't affect the user experience to a big extent.
     * 
     */
    const statement = 'select * from matches where tourId = (select id from tours where name = ?)';
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}