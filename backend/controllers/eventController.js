const asyncHandler = require("express-async-handler")
const Event = require("../models/eventModel")
const User = require("../models/userModel")

const createEvent = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(404)
    throw new Error("Please provide event title")
  }
  if (!req.body.date) {
    res.status(404)
    throw new Error("Please provide event date")
  }
  if (!req.body.event || req.body.event.length < 1) {
    res.status(404)
    throw new Error("Please provide event details")
  }

  // const eventExist = await Event.findOne({date: req.body.date})

  // if(eventExist) {
  //     res.status(404)
  //     throw new Error('Already have an event on this day')
  // }

  const newEvent = await Event.create({
    title: req.body.title,
    date: req.body.date,
    event: req.body.event,
    user: req.user.id,
  })
  res.status(200)
  res.json(newEvent)
})

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.status(404)
    throw new Error("Invalid Informations")
  }

  const eventExist = await Event.findById(id)

  if (!eventExist) {
    res.status(404)
    throw new Error("Requested event not founded")
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, req.body)

  if (updatedEvent) {
    const event = await Event.findOne({ id })
    res.status(200)
    res.json({
      title: event.title,
      date: event.date,
      events: event.event,
    })
  }
})

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find()

  const sortedEvents = events.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  let perPage = parseInt(req.query.perPage) || 1000;
  let page = parseInt(req.query.page) || 1;

  let paginatedData = sortedEvents.slice((page - 1) * perPage, page * perPage);

  res.status(200)
  res.json({
    events: paginatedData,
  })
})

const getSingleEvent = asyncHandler(async (req, res) => {
  let response
  if (req.params.id) {
    response = await Event.find({ id: req.body.id })
  } else {
    response = await Event.find({ date: req.body.date })
  }

  if (response) {
    res.status(200)
    res.json(response)
  }
})

const getEventByDate = asyncHandler(async (req, res) => {
  let response = await Event.find({ date: req.body.date })

  if (response) {
    res.status(200)
    res.json(response)
  }
})

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(401)
    throw new Error("Event not found")
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  await Event.findByIdAndDelete(req.params.id)

  const events = await Event.find()
  if (events) {
    res.status(200)
    res.json(events)
  }
})

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  deleteEvent,
  getSingleEvent,
  deleteEvent,
  getEventByDate,
}
