const router = require('express').Router();
const db = require('../models/');

// get previous workouts
router.get('/api/workouts', (req, res) => {
    db.workout.find({})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// add new workout
router.post('/api/workouts', ({ body }, res) => {
    db.workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// update excercise by id
router.put('/api/workouts/:id', (req, res) => {
    db.workout.updateOne(
        { _id: req.params.id },
        { $push: { exercises: req.body } }
    )
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});
// request last 7 workouts
router.get('/api/workouts/range', (req, res) => {
    db.workout.find({})
        .sort({ _id: -1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;