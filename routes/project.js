const express = require('express');

const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();


// Get /projects

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({ err: 'error getting projects' })
    })
})


// Get /projects/id

router.get('/:id', validateProjectId, (req, res) => {
    const project = req.project;

    Projects.get(project.id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        res.status(500).json({ err: 'error getting project data' })
    })
})


// middleware

function validateProjectId(req, res, next) {
    const { id } = req.params;

    Projects.get(id)
    .then(project => {
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: 'no project with this id' });        }
    })
    .catch(err => {
        res.status(500).json({ message: 'error accessing project data' });
    })
}


module.exports = router;