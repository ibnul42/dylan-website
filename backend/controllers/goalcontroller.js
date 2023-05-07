const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.find({user: req.user.id})
    res.status(200).send(goal)
})

const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(404)
        throw new Error('Please provide a body')
    }
    const newGoal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).send(newGoal)
})

const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    // check for user
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user update
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goal._id, req.body, {
        new: true
    })

    res.status(200).send(updatedGoal)
})

const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(404)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user update
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }

    await Goal.remove()
    res.status(200).send({ message: `Delete Goal ${req.params.id}` })
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}