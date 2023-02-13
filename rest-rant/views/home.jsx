const React = require('react')
const Def = require('./default')

function home () {
    return (
      <Def>
          <main>
          <link rel="stylesheet" href="/css/style.css" />
              <h1>HOME</h1>
              <a href="/places">
                 <button className="btn-primary">Places Page</button>
              </a>

          </main>
      </Def>
    )
  }  

module.exports = home
