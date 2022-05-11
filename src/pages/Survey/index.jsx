import { useParams } from 'react-router-dom' // hook mis à disposition par react router
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import { Loader } from '../../utils/style/atoms.jsx'

import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

import { Form } from 'react-bootstrap'

import React, { useState } from 'react'

var PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? 'white' : `${colors.db}`)};
`
var PageSubTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 300;
  color: ${({ theme }) => (theme === 'dark' ? 'white' : `${colors.db}`)};
`
var SurveyQuestion = styled.div`
  text-align: center;
  min-height: 140px;
`
var SurveyPrevNext = styled.div`
  text-align: center;
  margin: auto;
  max-width: 50%;
`
var StyledLink = styled(Link)`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  width: 150px;
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
  var { surveyData } = data // autre écriture : var surveyData = data?.surveyData

  // radio button unchecked onclick on button 'suivant'

  const [checked, setChecked] = useState({ oui: false, non: false })
  const changeRadio = (e) => {
    setChecked(() => {
      return {
        [e.target.value]: true,
      }
    })
  }

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
            <div>
              <PageSubTitle theme={theme}>
                {surveyData[questionNumber]}
              </PageSubTitle>
              <Form>
                {['radio'].map((type) => (
                  <div key={`${type}`}>
                    <Form.Check
                      label="Oui"
                      name="group1"
                      type={type}
                      id={`${type}-1`}
                      onClick={() => saveReply(true)}
                      isSelected={answers[questionNumber] === true}
                      theme={theme}
                      checked={checked.oui}
                      onChange={changeRadio}
                    />
                    <Form.Check
                      label="Non"
                      name="group1"
                      type={type}
                      id={`${type}-2`}
                      onClick={() => saveReply(false)}
                      isSelected={answers[questionNumber] === false}
                      theme={theme}
                      checked={checked.non}
                      onChange={changeRadio}
                    />
                  </div>
                ))}
              </Form>
            </div>
          )}
        </div>

        {/* Pas de prev en quest 1, pas de next en quest 10 */}
      </SurveyQuestion>
      <SurveyPrevNext>
        {parseInt(questionNumber) === 1 ? (
          <StyledLink
            $isFullLink
            to={`/survey/${questionNumberPrev}`}
            style={{ display: 'none' }}
          ></StyledLink>
        ) : (
          <StyledLink
            $isFullLink
            to={`/survey/${questionNumberPrev}`}
            style={{ float: 'left' }}
          >
            Précédent
          </StyledLink>
        )}

        {parseInt(questionNumber) === 6 ? (
          <StyledLink $isFullLink to={`/results`} style={{ float: 'right' }}>
            Résultats
          </StyledLink>
        ) : (
          <StyledLink
            $isFullLink
            to={`/survey/${questionNumberNext}`}
            style={{ float: 'right' }}
            onClick={() => setChecked(() => ({ oui: false, non: false }))}
          >
            Suivant
          </StyledLink>
        )}
      </SurveyPrevNext>
    </div>
  )
}

export default Survey
