/* import Chambord from '../../assets/Chambord.JPG'
import Chinon from '../../assets/Chinon.JPG'
import Saumur from '../../assets/Ussé.JPG' */
import Card from '../../components/Card'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Loader } from '../../utils/style/atoms.jsx'
import colors from '../../utils/style/colors.js'
import { useTheme } from '../../utils/hooks'

var CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  color: black;
`
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
function Freelances() {
  /*   Si je veux utiliser mes propres données -> remplacer dans le return 'freelancersList' par 'profiles' */
  /*   var profiles = [
    {
      name: 'Jean Pierre Chambord',
      jobTitle: 'Dev frontend',
      picture: Chambord,
    },
    {
      name: 'Jean François Chinon',
      jobTitle: 'Dev backend',
      picture: Chinon,
    },
    {
      name: 'Jean Marc Ussé',
      jobTitle: 'Dev fullstack',
      picture: Saumur,
    },
  ] */

  // GET FREELANCES

  var { theme } = useTheme()

  var [freelancersList, setFreelancesList] = useState([])
  var [isDataLoading, setDataLoading] = useState(false)
  var [error, setError] = useState(false)

  useEffect(() => {
    setDataLoading(true)

    fetch(`http://localhost:8000/freelances`)
      .then((response) => response.json())
      .then(({ freelancersList }) => {
        setFreelancesList(freelancersList)
        setDataLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError(true)
      })
  }, [])

  // FILTER FREELANCES

  var [activeCategory, setActiveCategory] = useState('')
  var categories = freelancersList.reduce(
    (accumulateur, valeurCourante) =>
      accumulateur.includes(valeurCourante.job.toLowerCase().split(' ').pop())
        ? accumulateur
        : accumulateur.concat(
            valeurCourante.job.toLowerCase().split(' ').pop()
          ),
    []
  )

  // SORT ALPHABETICALLY

  freelancersList.sort(function (a, b) {
    var nameA = a.job.toLowerCase().split(' ').pop().toUpperCase()
    var nameB = b.job.toLowerCase().split(' ').pop().toUpperCase()
    if (nameA < nameB) {
      return -1 //nameA comes first
    }
    if (nameA > nameB) {
      return 1 // nameB comes first
    }
    return 0 // names must be equal
  })

  function Categorie({ categories, setActiveCategory, activeCategory }) {
    return (
      <div>
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="">---</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={() => setActiveCategory('')}>Réinitialiser</button>
      </div>
    )
  }

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubTitle theme={theme}>Trouvez votre prestataire</PageSubTitle>
      <Categorie
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      {isDataLoading ? (
        <Loader />
      ) : (
        <CardsContainer>
          {freelancersList.map(({ id, name, job, picture }) =>
            !activeCategory ||
            activeCategory === job.toLowerCase().split(' ').pop() ? (
              <Card key={id} job={job} picture={picture} name={name} />
            ) : null
          )}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
