const router = require('express').Router();
const { User, Blog } = require('../models');
// const withAuth = require('../utils/auth');

// GET all blogs for homepage and join with user data
router.get('/', async (req, res) => {
    try {
        // Get all blogs and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'], 
                    attributes: ['date_created'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', { 
            blogs, 
            logged_in: req.session.logged_in // This is the session flag that is set in the login route. 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single blog
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET profile page



module.exports = router;