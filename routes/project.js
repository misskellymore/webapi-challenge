const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({ err: 'error getting projects' })
    })
})


module.exports = router;