const React = require('react')
const Def = require('./default')

function home () {
    return (
      <Def>
          <main>
          <link rel="stylesheet" href="/css/style.css" />
              <h1>HOME</h1>
              <div>
                <img src="/images/pretty-cakes.jpg" alt="Pretty Cakes" />
                <div>
                  Photo by <a href="AUTHOR_LINK">Brooke Lark</a> on <a href="UNSPLASH_LINK">Unsplash</a>
                </div>
              </div>
              <a href="/places">
                 <button className="btn-primary">Places Page</button>
              </a>

          </main>
      </Def>
    )
  }  

module.exports = home
