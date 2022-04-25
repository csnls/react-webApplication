/* import Chambord from '../../assets/Chambord.JPG'
import Chinon from '../../assets/Chinon.JPG'
import Saumur from '../../assets/Ussé.JPG' */
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import { useState, useEffect } from 'react'
import { Loader } from '../../utils/style/atoms.jsx'

var CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
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

  var [freelancersList, setFreelancesList] = useState([]) // les données de l'API
  var [isDataLoading, setDataLoading] = useState(false) // les données de l'API
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

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubTitle>Trouvez votre prestataire</PageSubTitle>

      {isDataLoading ? (
        <Loader />
      ) : (
        <CardsContainer>
          {freelancersList.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.jobTitle}
              picture={profile.picture}
              title={profile.name}
              job={profile.job}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Freelances
