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


// Post /projects
router.post('/', validateProject, (req, res) => {
    const project = req.project;

    Projects.insert(project)
    .then(added => {
        res.status(201).json(added);
    })
    .catch(err => {
        res.status(500).json({ err: 'error adding project' })
    })

})


// Delete /projects/id

router.delete('/:id', validateProjectId, (req, res) => {
    const project = req.project;

    Projects.remove(project.id)
    .then(deleted => {
        res.status(200).json(deleted);
    })
    .catch(err => {
        res.status(500).json({ err: 'error deleting' });
    })
})


// Put /projects/id

router.put('/:id', validateProjectId, (req, res) => {
    const project = req.project;
    const changes = req.body;

    if(!changes.name && !changes.description) {
        res.status(400).json({ message: 'Update name or description' })
    } else {

        Projects.update(project.id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            res.status(500).json({ error: 'error updating' });
        })
    }



})

// get project actions
router.get('/:id/actions', validateProjectId, (req, res) => {
    const project = req.project;

    Projects.getProjectActions(project.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ error: 'Project data could not be retrieved from the server' })
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


function validateProject(req, res, next) {
    const projectBody = req.body;

    if(!projectBody.name || !projectBody.description) {
        res.status(400).json({ message: 'missing fields' })
    } else {
        req.project = projectBody;
        next();
    }
}


module.exports = router;