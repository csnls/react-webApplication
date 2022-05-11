import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'

import { Loader, StyledLink } from '../../utils/style/atoms.jsx'
import { useFetch, useTheme } from '../../utils/hooks'

import { useState } from 'react'

var PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? 'white' : `${colors.db}`)};
`
var ResultsContent = styled.div`
  text-align: center;
`
var PageSubTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 300;
  color: ${({ theme }) => (theme === 'dark' ? 'white' : `${colors.db}`)};
`
var ResultsTitle = styled.div`
  margin: auto;
`
var JobContainer = styled.div`
  border-radius: 30px;
  background-color: ${colors.db};
  width: 250px;
  margin: 15px;
  padding: 15px;
  display: inline-block;
  height: 250px;
  vertical-align: bottom;
  color: white;
`

function formatQueryParams(answers) {
  var answerNumbers = Object.keys(answers)
  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    var isFirstAnswer = index === 0
    var separator = isFirstAnswer ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

function Results() {
  var { theme } = useTheme()

  var { answers } = useContext(SurveyContext)
  var queryParams = formatQueryParams(answers)
  var { data, isLoading, error } = useFetch(
    `http://localhost:8000/results?${queryParams}`
  )

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  var { resultsData } = data
  // autre écriture : var resultsData = data?.resultsData

  function ListItem({ result }) {
    var [toggle, setToggle] = useState(true)
    var JobTitle = styled.h2`
      position: relative;
      top: 50%;
      margin-top: -20px;
    `
    var JobDescription = styled.h2`
      font-size: 20px;
    `
    return (
      <JobContainer
        onClick={() => {
          setToggle(!toggle)
        }}
      >
        {toggle ? (
          <JobTitle>{result.title}</JobTitle>
        ) : (
          <JobDescription>{result.description}</JobDescription>
        )}
      </JobContainer>
    )
  }

  return (
    <div>
      <PageTitle theme={theme}>Résultats</PageTitle>

      <ResultsContent>
        <PageSubTitle theme={theme}>
          Voici les compétences dont vous avez besoin :
        </PageSubTitle>

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <ResultsTitle>
              {resultsData &&
                resultsData.map((result) => <ListItem result={result} />)}
            </ResultsTitle>
          </div>
        )}
        <StyledLink $isFullLink to="/freelances/result">
          Découvrez nos profils
        </StyledLink>
      </ResultsContent>
    </div>
  )
}

export default Results
