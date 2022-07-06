import PropTypes from 'prop-types' // pour sécuriser les props de Card
// import DefaultPicture from '../../assets/Chambord.JPG'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'

// J'ajoute du style à span
var CardName = styled.span`
  color: #5843e4;
  font-size: 22px;
  font-weight: bold;
`
// J'ajoute du style à img
var CardPicture = styled.img`
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

function Card({
  name,
  job,
  picture,
  date,
  nationality,
  causeOfDeath,
  generalLocation,
}) {
  // 3 props : label, title, picture
  //
  return (
    <CardWrapper>
      {/* Je remplace span par CardLabel et img par CardImage */}
      <CardName>{name}</CardName>
      {picture ? <CardPicture src={picture} alt="freelance" /> : null}
      {/* S'il y a une image, alors je l'affiche */}
      <span>{job}</span>
      <span>{date}</span>
      <span>{nationality}</span>
      <span>{causeOfDeath}</span>
      <span>{generalLocation}</span>
    </CardWrapper>
  )
}

// pour sécuriser les props de Card
Card.propTypes = {
  name: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired, // la prop title est requise pour le bon fonctionnement de l'app
  picture: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  causeOfDeath: PropTypes.string.isRequired,
  generalLocation: PropTypes.string.isRequired,
}

// pour définir une prop par défaut
Card.defaultProps = {
  name: '',
  job: '', // si on omet de déclarer la prop title
  picture: '', // ou DefaultPicture si on veut une image par défaut
  date: '',
  nationality: '',
  causeOfDeath: '',
  generalLocation: '',
}

export default Card
