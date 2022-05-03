import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context'

var FooterContainer = styled.div`
  height: 200px;
  max-width: 1000px;
  margin: auto;
  padding: 0 5%;
  background-color: ${colors.db};
`
var NightModeButton = styled.div`
  top: 50px;
  position: relative;
  color: black;
  background-color: red;
`

function Footer() {
  const { toggleTheme, theme } = useContext(ThemeContext)
  return (
    <FooterContainer>
      {/* Je remplace Link par StyledLink */}
      <NightModeButton onClick={() => toggleTheme()}>
        Changer de mode : {theme === 'light' ? 'jour' : 'nuit'}{' '}
      </NightModeButton>
    </FooterContainer>
  )
}

export default Footer
