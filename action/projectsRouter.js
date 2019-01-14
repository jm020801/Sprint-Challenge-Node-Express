const express = require('express');
const projectDB = require('../data/helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    projectDB.get()
        .then( projects => {
            res.status(200).json({ projects });
        })
        .catch(err => {
            res.status(500).json({ error: 'Projects retrival could not be performed '});
        });
});

// get action by id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    projectDB.get(id)
        .then(action => {
            if(!action) {
                res.status(200).json({ action });
            } else {
                res.status(404).json({ error: 'Specified Action ID could not be found' });
            }

        })
        .catch(err => {
            res.status(404).json({ error: 'Error performing that action' });
        });
});

router.post('/', (req, res) => {
    const { project_id, description, notes, completed } = req.body;

    if(project_id && description.length <= 128 && description.length >= 1 && notes) {
        projectDB.insert(req.body)
            .then(result => {
                res.status(201).json({ result });
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not add new action. Provide projectID, notes, description and try again.' });
            });
    } else {
        res.status(401).json({ message: 'Please provide ProjectID of an existing project, Description and Notes.' });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { description, notes, completed } = req.body;

    if(id && description && notes && completed) {
        projectDB.update(id, {description, notes, completed})
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ error: 'Action Update operation failed, try again' });
            });
    } else {
        res.status(404).json({error: 'Please provide projectID, description, notes.' });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(id) {
        projectDB.remove(id)
            .then(result => {
                if (result !== 0) {
                    res.status(200).json({ result });
                } else {
                    res.status(404).json({ error: 'Action ID does not exist' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Deleting Action could not be performed, try again' });
            });
    } else {
        res.status(404).json({ error: 'Provide Action ID for removal' });
    }
});

module.exports = router;