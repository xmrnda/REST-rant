// const router = require('express').Router()
// const places = require('../models/places.js')

// router.get('/', (req, res) => {
//     res.render('places/index', {places})
// })

// router.get('/new', (req, res) => {
//     res.render('places/new')
// })

// router.get('/:id', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       res.render('places/show', {place: places[id], id})
//     }
//   })
  

// router.post('/', (req, res) => {
//     if (!req.body.pic) {
//       // Default image if one is not provided
//       req.body.pic = 'http://placekitten.com/400/400'
//     }
//     if (!req.body.city) {
//       req.body.city = 'Anytown'
//     }
//     if (!req.body.state) {
//       req.body.state = 'USA'
//     }
//     places.push(req.body)
//     res.redirect('/places')
//   })

//   router.put('/:id/edit', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       if (!req.body.pic) {
//         req.body.pic = 'http://placekitten.com/400/400'
//       }
//       if (!req.body.city) {
//         req.body.city = 'Anytown'
//       }
//       if (!req.body.state) {
//         req.body.state = 'USA'
//       }
//     res.redirect('places/edit', { place: places[id] })
//     }
//   })
  

// router.delete('/:id', (req, res) => {
//     let id = Number(req.params.id)
//     if (isNaN(id)) {
//       res.render('error404')
//     }
//     else if (!places[id]) {
//       res.render('error404')
//     }
//     else {
//       places.splice(id, 1)
//       res.redirect('/places')
//     }
//   })
  
  

// let places = [{
//     name: 'H-Thai-ML',
//     city: 'Seattle',
//     state: 'WA',
//     cuisines: 'Thai, Pan-Asian',
//     pic: '/images/thai-curry.jpg'
//   }, {
//       name: 'Coding Cat Cafe',
//       city: 'Phoenix',
//       state: 'AZ',
//       cuisines: 'Coffee, Bakery',
//       pic: '/images/coffee.jpg'
//   }]
  
const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
  db.Place.find()
    .then((places) => {
      res.render('places/index', {places})
    })
    .catch(err => {
      console.log(err)
      res.render('error404')
    })
})

router.post('/', (req, res) => { 
if (!req.body.pic) {
  req.body.pic = undefined
}
if (!req.body.city) {
  req.body.city = undefined
}
if (!req.body.state) {
  req.body.state = undefined
}

db.Place.create(req.body)
.then(() => {
  res.redirect('/places')
})
.catch(err => {
  if (err && err.name == 'ValidationError') {
    let message = 'ValidationError: '
    for (var field in err.errors) {
      message += `${field} was ${err.errors[field].value}.`
      message += `${err.errors[field].message}.`
    }
    console.log('Validation error message', message)
    res.render('places/new', {message})
  } else {
    res.render('error404')
  }  
})
})

router.get('/new', (req, res) => {
  res.render('places/new')
})

db.Place.findById({_id: req.params.id})
.populate('comments')
.then(place => {
  console.log(place.comments)
  res.render('places/show', {place})
})
.catch(err => {
  console.log('err', err)
  res.render('error404')
})

router.put('/:id', (req, res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
      res.redirect(`/places/${req.params.id}`)
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
})
})

router.get('/:id/edit', (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
      res.render('places/edit', { place })
  })
  .catch(err => {
      res.render('error404')
  })
})

router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/places')
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })
})

router.post('/:id/comment', (req, res) => {
  console.log(req.body)
  if (req.body.rant) {
    req.body.rant = true
  }
  else {
    req.body.rant = false
  } 
  if (!req.body.author) {
    req.body.author = undefined
  }
  if (!req.body.content) {
    req.body.content = undefined
}
    db.Place.findById(req.params.id)
      .then(place => {
        db.Comment.create(req.body)
        .then(comment => {
            place.comments.push(comment.id)
            place.save()
              .then(() => {
                res.redirect(`/places/${req.params.id}`)
            })
        })
        .catch(err => {
            res.render('error404')
        })
    })
    .catch(err => {
        res.render('error404')
    })
})

router.delete('/:id/comment/:commentId', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.commentId)
    .then(() => {
        console.log('Comment deleted')
        res.redirect(`/places/${req.params.id}`)
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })

})


module.exports = router
