const React = require('react')
const Def = require('../default')

function index (data) {
    let placesFormatted = data.places.map((place) => {
      return (
        <div>
          <h2>{place.name}</h2>
          <img src={place.pic} alt={place.name}/>
        </div>
      )
    })
    return (
      <Def>
          <main>
          <link rel="stylesheet" href="/css/style.css" />
              <h1>Places to RANT or RAVE About</h1>
              {placesFormatted}
          </main>
      </Def>
  )
  }
  

module.exports = index