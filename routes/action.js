const express = require('express');

const router = express.Router();

const Actionsdb = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {

    Actionsdb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({ err: 'error getting actions' });
    })
})


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



module.exports = router;