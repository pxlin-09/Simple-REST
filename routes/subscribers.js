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
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

// Create one route
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()

        // status 200 means successful
        // status 201 is more detailed successful regarding creation
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Update one route
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ messgae: err.message })
    }
})

// Delete route
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: "Removed subscriber" })
    } catch (err) {
        res.status(500).json({ messgae: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            // status 404 = not found
            return res.status(404).json({ message: 'Cannot find subscriber '}) 
        }
    } catch (err) {
        return res.status(500).json({ messgae: res.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router