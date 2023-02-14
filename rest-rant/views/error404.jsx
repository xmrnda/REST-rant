const React = require('react')
const Def = require('./default')

function error404 () {
    return (
      <Def>
          <main>
          <link rel="stylesheet" href="/css/style.css" />
              <h1>404: PAGE NOT FOUND</h1>
              <p>Oops, sorry, we can't find this page!</p>
              <div>
                <img src="/images/sweet-puppy.jpg" alt="Sweet Puppy" />
                <div>
                  Photo by <a href="AUTHOR_LINK">T.R Photography</a> on <a href="UNSPLASH_LINK">Unsplash</a>
                </div>
              </div>
          </main>
      </Def>
    )
  }
  

module.exports = error404
