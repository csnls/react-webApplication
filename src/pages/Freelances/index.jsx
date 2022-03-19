import Chambord from '../../assets/Chambord.JPG'
import Chinon from '../../assets/Chinon.JPG'
import Saumur from '../../assets/Ussé.JPG'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

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
  var profiles = [
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
  ]

  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubTitle>Trouvez votre prestataire</PageSubTitle>
      <CardsContainer>
        {profiles.map((profile, index) => (
          <Card
            key={`${profile.name}-${index}`}
            label={profile.jobTitle}
            picture={profile.picture}
            title={profile.name}
          />
        ))}
      </CardsContainer>
    </div>
  )
}

export default Freelances
