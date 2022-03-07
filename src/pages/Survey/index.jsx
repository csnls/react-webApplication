import { useParams } from 'react-router-dom' // hook mis à disposition par react router
import { Link } from 'react-router-dom'

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
      <h1>Questionnaire</h1>
      <h3>Question {questionNumber}</h3>
      {parseInt(questionNumber) === 1 ? (
        <Link to={`/survey/${questionNumberPrev}`}></Link>
      ) : (
        <Link to={`/survey/${questionNumberPrev}`}>Prev</Link>
      )}
      {parseInt(questionNumber) === 10 ? (
        <Link to={`/results`}>Résultats</Link>
      ) : (
        <Link to={`/survey/${questionNumberNext}`}>Next</Link>
      )}
    </div>
  )
}

export default Survey
