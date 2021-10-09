const router = require('express').Router();
const db = require('../models/');

// get previous workouts
router.get('/api/workout', (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// add new workout
router.post('/api/workout', ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// update excercise by id
router.put('/api/workout/:id', (req, res) => {
    db.Workout.updateOne(
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
router.get('/api/workout/range', (req, res) => {
    db.Workout.find({})
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