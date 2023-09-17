const express = require("express")
const router = express.Router()
const Subscriber = require('../models/subscriber')
// Get all routes
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        // status 500 means server error, not user or client issue
        res.status(500).json({ message: err.message })
    }
})

// Get one route
router.get('/:id', (req, res) => {
    res.send(id)
})

// Create one route
router.post('/', (req, res) => {

})


// Update one route
router.patch('/:id', (req, res) => {

})

// Delete route
router.delete('/:id', (req, res) => {

})
module.exports = router