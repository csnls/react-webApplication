import { useState, createContext } from 'react'

export var ThemeContext = createContext()

export var ThemeProvider = ({ children }) => {
  var [theme, setTheme] = useState('light')
  var toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Tous les composants enfants qui se retrouvent englobés par le provider 'ThemeContext'
// vont pouvoir accéder à theme et setTheme

export var SurveyContext = createContext()

export var SurveyProvider = ({ children }) => {
  var [answers, setAnswers] = useState({})
  var saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers })
  }
  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  )
}

// Tous les composants enfants qui se retrouvent englobés par le provider 'SurveyContext'
// vont pouvoir accéder à answers et setAnswers
