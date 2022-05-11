import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors.js'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col } from 'react-bootstrap'
import Freelance from '../../assets/freelance.PNG'

var HomeContainer = styled.div`
  background-color: ${colors.lb};
  padding: 10%;
  border-radius: 30px;
`
/* var Balloon = styled.div`
  background-color: ${colors.db};
  width: 30px;
  height: 30px;
  border-radius: 30%;
  transform: scale(${({ size }) => size});
  margin: auto;
` */
var StyledLink = styled(Link)`
  padding: 15px;
  font-size: 18px;
  color: white;
  border-radius: 30px;
  background-color: ${colors.db};
`
var StyledImg = styled.img`
  width: 100%;
`
var CatchPhrase = styled.h1`
  color: ${colors.db};
  font-size: 40px;
  padding-bottom: 30px;
  font-weight: 600;
`

function Home() {
  var [size, updateSize] = useState(1)
  return (
    <HomeContainer>
      <Container>
        <Row className="rows">
          <Col className="columns" sm={6}>
            <CatchPhrase onClick={() => updateSize(size + 1)}>
              Repérez vos besoins, on s'occupe du reste avec les meilleurs
              talents
            </CatchPhrase>
            <StyledLink to={`/survey/1`}>Faire le test</StyledLink>
          </Col>
          <Col className="columns" sm={6}>
            {/*             <Balloon size={size} /> */}
            <StyledImg
              src={Freelance}
              alt="Shiny-Agency"
              className="sa-freelance"
            />
          </Col>
        </Row>
      </Container>
    </HomeContainer>
  )
}

export default Home
