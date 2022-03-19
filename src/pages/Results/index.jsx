import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import { Link } from 'react-router-dom'

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
var StyledLink = styled(Link)`
  padding: 15px;
  font-size: 18px;
  color: white;
  border-radius: 30px;
  background-color: ${colors.db};
`

var ResultsContent = styled.div`
  text-align: center;
`

function Results() {
  return (
    <div>
      <PageTitle>Résultats</PageTitle>
      <ResultsContent>
        <PageSubTitle>
          Voici les compétences dont vous avez besoin :
        </PageSubTitle>
        <StyledLink to={`/freelances`}>Découvrir les profils</StyledLink>
      </ResultsContent>
    </div>
  )
}

export default Results
