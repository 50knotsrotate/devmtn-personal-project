module.exports = {
  getStore: async (req, res) => {
    const db = req.app.get("db");
    const store = await db.get_store();
    res.status(200).send(store);
  }
};
