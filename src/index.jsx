import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Error from './components/Error'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

var PageStyle = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 100px;
  padding: 0 5%;
`

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Header />
      {/* Je considère que le header fait partie intégrante de l'agencement de l'application */}
      <PageStyle>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/survey/:questionNumber">
            <Survey />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/freelances">
            <Freelances />
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </PageStyle>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
