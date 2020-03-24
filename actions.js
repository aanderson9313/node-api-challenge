const express = require('express');
const actionDb = require('./data/helpers/actionModel');
const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const actions = await actionDb.get()
        res.status(200).json(actions)
    }
    catch{
        res.status(500).json({ error: 'error' })
    }
});

// POST
router.post('/', (req, res) => {
    const newPost = req.body;
    actionDb.insert(newPost)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(400).json({
                message: "error posting on action, type in a note, project_id, and description."
            });
        });
});

// PUT
router.put('/:id', (req, res) => {
    if (
        !req.body ||
        !req.body.notes ||
        !req.body.description ||
        !req.body.project_id
    ) {
        res.status(500).json({
            message: "type in a name, description, note and project_id for the action."
        });

        return;
    }
    actionDb.get(req.params.id)
        .then(res => {
            if (res) {
                console.log(res.id);
                actionDb.update(req.params.id, req.body);
                res.status(201).json(req.body);
            } else {
                res.status(404).json({
                    message: "project id does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "an error occurred while trying to update this project, please try again. "
            });
        });
});

// DELETE
router.delete('/:id', async (req, res) => {
    try{
        const result = await actionDb.remove(req.params.id)
        res.status(200).json({ status: `User Id: ${result} has been successfully deleted.`})
    }
    catch {
        res.status(500).json({ error: "error, could not delete user" })
    }
});

module.exports = router;