import { useParams } from 'react-router-dom' // hook mis à disposition par react router
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

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

  return (
    <div>
      <PageTitle>Question {questionNumber}</PageTitle>
      <SurveyQuestion>
        {parseInt(questionNumber) === 1 ? (
          <div>
            <PageSubTitle>
              Votre application doit-elle apparaître en premier dans les
              résultats de recherche ?
            </PageSubTitle>
            <button type="button" class="survey--btn">
              Oui
            </button>
            <button type="button" class="survey--btn">
              Non
            </button>
          </div>
        ) : (
          ''
        )}
        {parseInt(questionNumber) === 1 ? (
          <StyledLink to={`/survey/${questionNumberPrev}`}></StyledLink>
        ) : (
          <StyledLink to={`/survey/${questionNumberPrev}`}>Prev</StyledLink>
        )}

        {parseInt(questionNumber) === 10 ? (
          <StyledLink to={`/results`}>Résultats</StyledLink>
        ) : (
          <StyledLink to={`/survey/${questionNumberNext}`}>Next</StyledLink>
        )}
      </SurveyQuestion>
    </div>
  )
}

export default Survey
