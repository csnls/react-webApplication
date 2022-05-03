import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'

import { Loader } from '../../utils/style/atoms.jsx'
import { useFetch } from '../../utils/hooks'

import { useState } from 'react'

var ResultsTitle = styled.div`
  margin: auto;
`
var JobTitle = styled.h2`
  font-size: 20px;
  color: white;
  border-radius: 30px;
  background-color: ${colors.db};
  max-width: 200px;
  margin: 15px auto;
  padding: 15px;
`

var PageTitle = styled.h1`
  color: ${colors.db};
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 600;
`
var PageSubTitle = styled.h2`
  color: ${colors.db};
  font-size: 20px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 300;
`
var ResultsContent = styled.div`
  text-align: center;
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
  var { answers } = useContext(SurveyContext)
  var queryParams = formatQueryParams(answers)
  var { data, isLoading, error } = useFetch(
    `http://localhost:8000/results?${queryParams}`
  )
  console.log(answers)
  console.log(data)

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  var { resultsData } = data
  // autre écriture : var resultsData = data?.resultsData

  function ListItem({ result }) {
    var [toggle, setToggle] = useState(true)
    var ShowTitle = () => result.title
    var ShowDescription = () => result.description
    return (
      <span
        onClick={() => {
          setToggle(!toggle)
        }}
      >
        {toggle ? <ShowTitle /> : <ShowDescription />}
      </span>
    )
  }

  return (
    <div>
      <PageTitle>Résultats</PageTitle>

      <ResultsContent>
        <PageSubTitle>
          Voici les compétences dont vous avez besoin :
        </PageSubTitle>

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <ResultsTitle>
              {resultsData &&
                resultsData.map((result) => (
                  <JobTitle>
                    <ListItem result={result} />
                  </JobTitle>
                ))}
            </ResultsTitle>
          </div>
        )}
      </ResultsContent>
    </div>
  )
}

export default Results
