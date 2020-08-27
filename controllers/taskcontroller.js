const router = require("express").Router();
const { Task } = require('../models');

router.get('/test', function(req, res){
    res.send('Hey!! This is the task route!')
});

router.post('/create/:listId', (req, res) => {
    const task = {
        description: req.body.description,
        listId: Number(req.params.listId)
    }
    Task.create(task)
    .then(task => res.status(200).json(task))
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
});

router.put('/update/:id', (req, res) => {
    const task = {
        description: req.body.description
    };

    const query = { where: { id: req.params.id }}

    Task.update(task, query)
    .then(list => res.status(200).json(list))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;