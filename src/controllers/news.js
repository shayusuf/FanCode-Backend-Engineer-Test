const News = require('../models/news');

const addNews = async params => {
    const { matchId } = params;
    const { tourId } = params;
    if ( matchId ) {
        return await News.addNewsByMatchId(params);
    }
    else if (tourId) {
        return await News.addNewsByTourId(params);
    }
    else {
        throw new Error('Missing required parameter: id');
    }
}

const getNewsByMatchId = async params => {
    const { id } = params;
    if ( id ) {
        return await News.getNewsByMatchId(params);
    }
    else {
        throw new Error('Missing required parameter: id');
    }
}

module.exports = {
    addNews: addNews,
    getNewsByMatchId: getNewsByMatchId
}