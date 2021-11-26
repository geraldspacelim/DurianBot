const router = require('express').Router();

router.route('/api/login').post(async (req, res) => {
    try {
        sql.query(
        `select * from admins where username = '${req.body.username}'`,
        async (error, results) => {
            if (error) throw error;
            if (results.length === 0) {
            res.status(400).send()
            } else {
            if (await bcrypt.compare(req.body.password, results[0].userPassword )) {
                res.status(201).send()
            } else {
                res.status(400).send()
            }
            }
        }
        )
    } catch {
        res.status(500).send()
    }
})

module.exports = router;
