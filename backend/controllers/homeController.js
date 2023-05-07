const asyncHandler = require("express-async-handler")
const Timeline = require("../models/timelineModel")
const Activity = require("../models/activityModel")

const getTimeline = asyncHandler(async (req, res) => {
  const { id } = req.params
  const timelineExist = await Timeline.findById(id)

  if (!timelineExist) {
    throw new Error("Please provide another timeline")
  }

  res.status(200).json(timelineExist)
})
const getAllTimeline = asyncHandler(async (req, res) => {
  const timelines = await Timeline.find()
  res.status(200).json(timelines)
})
const createTimeline = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  if (!title) {
    throw new Error("Please provide a title")
  }
  if (!description) {
    throw new Error("Please provide description")
  }

  const timeline = await Timeline.create({
    title: title,
    description: description,
  })

  res.status(200).json(timeline)
})
const updateTimeline = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const timelineExist = await Timeline.findById(id)

  if (!timelineExist) {
    throw new Error("Please provide another timeline")
  }
  if (!title) {
    throw new Error("Please provide a title")
  }
  if (!description) {
    throw new Error("Please provide description")
  }

  const updatedTimeline = await Timeline.findByIdAndUpdate(id, {
    title,
    description,
  })

  res.status(200).json(updatedTimeline)
})
const deleteTimeline = asyncHandler(async (req, res) => {
  const { id } = req.params
  const timelineExist = await Timeline.findById(id)

  if (!timelineExist) {
    throw new Error("Please provide another timeline")
  }

  await Timeline.findByIdAndDelete(id)

  res.status(200).json({
    message: "Timeline deleted successfully",
  })
})

const getActivity = asyncHandler(async (req, res) => {
    const { id } = req.params
    const activityExist = await Activity.findById(id)
  
    if (!activityExist) {
      throw new Error("Please provide another activity")
    }
  
    res.status(200).json(activityExist)
})
const getAllActivity = asyncHandler(async (req, res) => {
    const activities = await Activity.find()
    res.status(200).json(activities)
})
const createActivity = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    if (!title) {
      throw new Error("Please provide a title")
    }
    if (!description) {
      throw new Error("Please provide description")
    }
  
    const activity = await Activity.create({
      title: title,
      description: description,
    })
  
    res.status(200).json(activity)
})
const updateActivity = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
  
    const ActivityExist = await Activity.findById(id)
  
    if (!ActivityExist) {
      throw new Error("Please provide another Activity")
    }
    if (!title) {
      throw new Error("Please provide a title")
    }
    if (!description) {
      throw new Error("Please provide description")
    }
  
    const updatedActivity = await Activity.findByIdAndUpdate(id, {
      title,
      description,
    })
  
    res.status(200).json(updatedActivity)
})
const deleteActivity = asyncHandler(async (req, res) => {
    const { id } = req.params
    const activityExist = await Activity.findById(id)
  
    if (!activityExist) {
      throw new Error("Please provide another Activity")
    }
  
    await Activity.findByIdAndDelete(id)
  
    res.status(200).json({
      message: "Activity deleted successfully",
    })
})

module.exports = {
  getTimeline,
  getAllTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
  getActivity,
  getAllActivity,
  createActivity,
  updateActivity,
  deleteActivity,
}
