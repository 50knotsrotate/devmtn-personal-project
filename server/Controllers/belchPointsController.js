module.exports = {
    updateBelchPoints: (req, res, next) => { 
        const db = req.app.get('db'); 
        const { username } = req.query;
        db.add_belch_points(username)
    }
}