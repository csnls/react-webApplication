import { useParams } from 'react-router-dom' // hook mis à disposition par react router
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import { Loader } from '../../utils/style/atoms.jsx'

import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

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
var SurveyQuestion = styled.div`
  text-align: center;
`
var StyledLink = styled(Link)`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.db};`}
`

function Survey() {
  var { questionNumber } = useParams()
  var questionNumberPrev =
    parseInt(questionNumber) === 1 // parseInt analyse une chaine de caractère et renvoie un entier
      ? parseInt(questionNumber)
      : parseInt(questionNumber) - 1
  var questionNumberNext =
    parseInt(questionNumber) === 10
      ? parseInt(questionNumber)
      : parseInt(questionNumber) + 1
  var { theme } = useTheme()

  var { answers, saveAnswers } = useContext(SurveyContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  var { data, isLoading, error } = useFetch('http://localhost:8000/survey')
  var { surveyData } = data
  // autre écriture : var surveyData = data?.surveyData

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Question {questionNumber}</PageTitle>

      <SurveyQuestion>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <PageSubTitle theme={theme}>
              {surveyData[questionNumber]}
            </PageSubTitle>
          )}
          <button
            type="button"
            class="survey--btn"
            onClick={() => saveReply(true)}
            isSelected={answers[questionNumber] === true}
            theme={theme}
          >
            Oui
          </button>
          <button
            type="button"
            class="survey--btn"
            onClick={() => saveReply(false)}
            isSelected={answers[questionNumber] === false}
            theme={theme}
          >
            Non
          </button>
        </div>

        {/* Pas de prev en quest 1, pas de next en quest 10 */}

        {parseInt(questionNumber) === 1 ? (
          <StyledLink to={`/survey/${questionNumberPrev}`}></StyledLink>
        ) : (
          <StyledLink to={`/survey/${questionNumberPrev}`}>Prev</StyledLink>
        )}

        {parseInt(questionNumber) === 6 ? (
          <StyledLink to={`/results`}>Résultats</StyledLink>
        ) : (
          <StyledLink to={`/survey/${questionNumberNext}`}>Next</StyledLink>
        )}
      </SurveyQuestion>
    </div>
  )
}

export default Survey
