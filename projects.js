const express = require('express');
const projectDb = require('./data/helpers/projectModel');
const router = express.Router();

// GET
router.get('/', async (req, res) => {
    try {
        const projects = await projectDb.get()
        res.status(200).json(projects)
    }
    catch {
        res.status(500).json({ error: "error"})
    }
});

// POST
router.post('/', async (req, res) => {
    const newPost = { ...req.body, id: req.params.id}
    try {
        const success = await projectDb.insert(newPost)
        res.status(201).json(success)
    }
    catch{
        res.status(500).json({ error: "cannot add"})
    }
});

// PUT
router.put('/:id', (req, res) => {
    if (!req.body || !req.body.name || !req.body.description) {
        console.log('please fill out necessary information');
        res.status(500).json({
            message: "please provide a name and description for the project."
        });
        return;
    }
    projectDb.get(req.params.id)
        .then(res => {
            if( result ) {
                console.log(res.id);
                projectDb.update(req.params.id, req.body);
                res.status(201).json(req.body);
            } else {
                res.status(404).json({
                    message: "project id does not exist."
                });
            }
        })
        .catch (err => {
            res.status(500).json({
                message: "an error occurred while trying to update this project."
            });
        });
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await projectDb.remove(req.params.id)
        res.status(200).json({ status: `User Id: ${result} has been deleted.`})
    }
    catch {
        res.status(500).json({ error: " error, couldn't delete User ID."})
    }
});

module.exports = router;