module.exports = {
    updateNotifications: (req, res) => {
        const user = req.session.user;
        const db = req.app.get('db');
        const { id } = user
        db.update_notifications(id)
            .then(_ => { 
                res.status(200).send('Success')
            })
    },

    getNotifications: async (req, res) => { 
        const user = req.session.user;
        const db = req.app.get('db');
        const { id } = user
        const notifications = await db.get_notifications(id);
        res.status(200).send(notifications)
    }

}
