import { Link } from 'react-router-dom' // à utiliser pr naviguer et éviter d'utiliser onclick

function Header() {
  var questionNumber = 1
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to={`/survey/${questionNumber}`}>Questionnaire</Link>
      <Link to="/results">Résultat</Link>
      <Link to="/freelances">Freelances</Link>
    </nav>
  )
}

export default Header
