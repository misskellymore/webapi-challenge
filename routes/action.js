const express = require('express');

const router = express.Router();

const Actionsdb = require('../data/helpers/actionModel.js');



// /actions

router.get('/', (req, res) => {

    Actionsdb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ err: 'error getting actions' });
    })
})


// /actions/id
router.get('/:id', validateActionId, (req, res) => {
    const action = req.action;

    Actionsdb.get(action.id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: 'Action data could not be retrieved from the server.' });
    })
})


// delete

router.delete('/:id', validateActionId, (req, res) => {
    const action = req.action;

    Actionsdb.remove(action.id)
    .then(deleted => {
        res.status(200).json(deleted);
    })
    .catch(err => {
        res.status(500).json({ error: 'error deleting action' });
    })
})

// put

router.put('/:id', validateActionId, (req, res) => {
    const action = req.action;
    const changes = req.body;

    if (!changes.description && !changes.notes) {
        res.status(400).json({ message: 'Update notes or description' })
    } else {
        Actionsdb.update(action.id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            res.status(500).json({ error: 'error deleting' });
        })
    }
})


router.post('/', validateAction, (req, res) => {
    
    const action = req.action;

    Actionsdb.insert(action)
    .then(added => {
        res.status(200).json(added);
    })
    .catch(err => {
        res.status(500).json({ err: 'error adding action' });
        console.log(action);
    })
})


// middleware

function validateActionId (req, res, next) {
    const { id } = req.params;

    Actionsdb.get(id)
    .then(action => {
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: 'cannot find this action id' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'cannot find this action' });
    })
}


function validateAction(req, res, next) {
    const actionBody = req.body;

    if (!actionBody.description || !actionBody.notes) {
        res.status(400).json({ message: 'Description and notes required.' });
    } else {
        req.action = actionBody;
        next();
    }
}



module.exports = router;