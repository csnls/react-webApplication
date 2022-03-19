import ErrorImg from '../../assets/Error.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

var StyledImg = styled.img`
  width: 50%;
`
var ErrorContainer = styled.div`
  text-align: center;
`

var PageTitle = styled.h1`
  color: ${colors.db};
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  font-weight: 600;
`

function Error() {
  return (
    <ErrorContainer>
      <PageTitle>
        Oups 🙈<br></br>Cette page n'existe pas
      </PageTitle>
      <StyledImg src={ErrorImg} alt="Shiny-Agency" className="sa-freelance" />
    </ErrorContainer>
  )
}

export default Error
