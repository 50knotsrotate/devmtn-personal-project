module.exports = {
    checkCredentials: (req, res, next) => { 
        const { username, password, number } = req.body;
        console.log(req.body)
        
        if (!username.length) {
            return res.status(404).send('Invalid Username')
        } else if (!password.length) {
            return res.status(404).send('Invalid password')
        } else if ((number && number.length != 10) && req.body.textNotifications) { //if they did send in a number, check if that numbers length is 10 and that they chose to opt in for text notifs
            return res.status(404).send('invalid phone')
        } else { 
            next()
        }
    }
}