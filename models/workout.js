const mongoose = require('mongoose');
const { Schema } = mongoose;
const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now,
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: 'Type of exercise',
                },
                name: {
                    type: String,
                    trim: true,
                    required: 'Name of exercise',
                },
                duration: {
                    type: Number,
                    required: 'Duration of exercise',
                },
                weight: {
                    type: Number,
                },
                reps: {
                    type: Number,
                },
                sets: {
                    type: Number,
                },
                distance: {
                    type: Number,
                },
            },
        ],
    },
    {
        toJSON: {
            // include virtual properties
            virtuals: true,
        },
    }
);

// add new property
workoutSchema.virtual('totalDuration').get(function () {
    // reduce array
    return this.exercises.reduce(
        (total, exercise) => total + exercise.duration,
        0
    );
});

const workout = mongoose.model('workout', workoutSchema);

module.exports = workout;