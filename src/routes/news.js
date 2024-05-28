const News = require('../controllers/news');

module.exports = function (app) {
    // Problem3: endpoint to create news either on matchId or tourId
    app.route('/news/add').post(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.addNews(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    // Problem3: endpoint to get news on matchId
    app.route('/news/match').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByMatchId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    // Problem3: endpoint to get news on tourId 
    app.route('/news/tour').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsByTourId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    // Problem3: endpoint to get news on sportId
    app.route('/news/sport').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await News.getNewsBySportId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}