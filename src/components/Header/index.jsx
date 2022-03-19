import { Link } from 'react-router-dom' // à utiliser pr naviguer et éviter d'utiliser onclick
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import colors from '../../utils/style/colors.js'

// J'ajoute du style à Link qui vient de la bibliothèque styled-components
var StyledLink = styled(Link)`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radius: 30px; background-color: ${colors.db};`}
`

var Logo = styled.div`
  display: inline-block;
  float: left;
  top: 50px;
  position: relative;
`

var LogoImage = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: sub;
`

var Menu = styled.div`
  float: right;
  top: 50px;
  position: relative;
`

var NavMenu = styled.nav`
  height: 100px;
  max-width: 1000px;
  margin: auto;
  padding: 0 5%;
  height: 100px;
`

function Header() {
  var questionNumber = 1
  return (
    <NavMenu>
      <Logo>
        <LogoImage src={logo} alt="Shiny-Agency" className="sa-logo" />
        <span>Shiny</span>
      </Logo>
      <Menu>
        {/* Je remplace Link par StyledLink */}
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/freelances">Freelances</StyledLink>
        <StyledLink to={`/survey/${questionNumber}`} $isFullLink>
          Faire le test
        </StyledLink>
      </Menu>
    </NavMenu>
  )
}

export default Header
