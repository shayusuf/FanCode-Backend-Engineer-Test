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
}