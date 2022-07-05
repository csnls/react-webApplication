import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Footer from './components/Footer'
import Error from './components/Error'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyle from './utils/style/GlobalStyle'
import { ThemeProvider } from './utils/context'
import { SurveyProvider } from './utils/context'
import Everest from './pages/Everest'

var PageStyle = styled.div`
  max-width: 1000px;
  margin: 100px auto;
  padding: 0 5%;
  min-height: 220px;
`

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
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
              <Route path="/everest">
                <Everest />
              </Route>
              <Route>
                <Error />
              </Route>
            </Switch>
          </PageStyle>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
