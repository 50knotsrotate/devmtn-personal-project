module.exports = {
    getComments: async (req, res) => { 
        const db = req.app.get('db');
        const { id } = req.params
        const comments = await db.get_comments([id]);
        res.status(200).send(comments)
    },
    addComment: (req, res) => { 
        const db = req.app.get('db');
        const { content, brewery_id } = req.body;
        console.log(content, brewery_id)
    }
}