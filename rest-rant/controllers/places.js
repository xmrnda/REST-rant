const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('GET /places')
})

let places = [{
    name: 'H-Thai-ML',
    city: 'Seattle',
    state: 'WA',
    cuisines: 'Thai, Pan-Asian',
    pic: '/images/thai-curry.jpg'
  }, {
      name: 'Coding Cat Cafe',
      city: 'Phoenix',
      state: 'AZ',
      cuisines: 'Coffee, Bakery',
      pic: '/images/coffee.jpg'
  }]
  

module.exports = router
