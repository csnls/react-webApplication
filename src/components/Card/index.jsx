import PropTypes from 'prop-types' // pour sécuriser les props de Card
import DefaultPicture from '../../assets/Chambord.JPG'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

// J'ajoute du style à span
var CardLabel = styled.span`
  color: #5843e4;
  font-size: 22px;
  font-weight: bold;
`
// J'ajoute du style à img
var CardImage = styled.img`
  width: 100px;
  width: 100px;
  border-radius: 30px;
`

var CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.lb};
  border-radius: 30px;
  padding: 10% 0;
  &:hover {
    cursor: pointer;
    margin-top: -10px;
    height: 100%;
  }
`

function Card({ label, title, picture }) {
  // 3 props : label, title, picture
  return (
    <CardWrapper>
      {/* Je remplace span par CardLabel et img par CardImage */}
      <CardLabel>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <span>{title}</span>
    </CardWrapper>
  )
}

// pour sécuriser les props de Card
Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired, // la prop title est requise pour le bon fonctionnement de l'app
  picture: PropTypes.string.isRequired,
}

// pour définir une prop par défaut
Card.defaultProps = {
  label: '',
  title: '', // si on omet de déclarer la prop title
  picture: DefaultPicture,
}

export default Card