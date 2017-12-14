var router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/', (req, res) => {
    // izvuci objekt iz req.body
    res.send('Post!')
})

router.get('/:filter', (req, res) => {
    res.send(req.params.filter)
})

router.delete('/', (req, res) => {
    res.send('Delete!')
})

module.exports = router
