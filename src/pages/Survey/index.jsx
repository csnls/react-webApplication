import { useParams } from 'react-router-dom' // hook mis à disposition par react router
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import { useState, useEffect } from 'react' // useEffect pour déclencer fetch et useState pour stocker le retour de l'API dans le state
import { Loader } from '../../utils/style/atoms.jsx'

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

  var [surveyData, setSurveyData] = useState({}) // les données de l'API
  var [isDataLoading, setDataLoading] = useState(false) // les données de l'API
  var [error, setError] = useState(false)

  useEffect(() => {
    setDataLoading(true)
    fetch(`http://localhost:8000/survey`)
      .then((response) => response.json())
      .then(({ surveyData }) => {
        setSurveyData(surveyData)
        setDataLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError(true)
      })
  }, [])

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle>Question {questionNumber}</PageTitle>

      <SurveyQuestion>
        <div>
          {isDataLoading ? (
            <Loader />
          ) : (
            <PageSubTitle>{surveyData[questionNumber]}</PageSubTitle>
          )}
          <button type="button" class="survey--btn">
            Oui
          </button>
          <button type="button" class="survey--btn">
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
