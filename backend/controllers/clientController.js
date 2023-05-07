const asyncHandler = require("express-async-handler")
const Prayer = require("../models/prayerModel")
const Contact = require("../models/contactModel")
const User = require("../models/userModel")

const createContact = asyncHandler(async (req, res) => {
  const { name, email, address } = req.body

  if (!name) {
    res.status(404)
    throw new Error("Please enter name")
  }

  if (!address) {
    res.status(404)
    throw new Error("Please enter address")
  }

  if (!email) {
    res.status(404)
    throw new Error("Please enter email")
  }
  await Contact.create({
    name,
    address,
    email,
  })

  const allContacts = await Contact.find()

  res.status(200)
  res.json(allContacts)
})

const createPrayer = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body

  if (!firstName) {
    res.status(404)
    throw new Error("Please enter first name")
  }

  if (!lastName) {
    res.status(404)
    throw new Error("Please enter last name")
  }

  if (!email) {
    res.status(404)
    throw new Error("Please enter email")
  }

  if (!message) {
    res.status(404)
    throw new Error("Please enter message")
  }

  const newPrayer = await Prayer.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  })

  res.status(200)
  res.json({
    message: "Thank you for your prayer",
  })
})

const getPrayers = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const allPrayers = await Prayer.find()

  res.status(200)
  res.json(allPrayers)
})

const allContacts = asyncHandler(async (req, res) => {
  const allContacts = await Contact.find()

  res.status(200)
  res.json(allContacts)
})

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    res.status(401)
    throw new Error("contact not found")
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  await Contact.findByIdAndDelete(req.params.id)

  const allContacts = await Contact.find()

  res.status(200)
  res.json(allContacts)
})

const deletePrayer = asyncHandler(async (req, res) => {
  const prayer = await Prayer.findById(req.params.id)

  if (!prayer) {
    res.status(401)
    throw new Error("prayer not found")
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  await Prayer.findByIdAndDelete(req.params.id)

  const allPrayers = await Prayer.find()

  res.status(200)
  res.json(allPrayers)
})

module.exports = {
  createContact,
  createPrayer,
  getPrayers,
  allContacts,
  deleteContact,
  deletePrayer
}
