const router = require('express').Router();
const { User } = require('../../models');

// Post route for creating a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => { // This method is used to save the session data to the store. This method is called automatically when the response is sent.
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = router;