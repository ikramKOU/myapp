import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    const marginTop = { marginTop: "20px" };
    const jumbotronStyle = {
      backgroundColor: "#373232ff", // noir
      color: "#fff",           // texte blanc
      padding: "30px",
      borderRadius: "10px"
    };

    return (
      <Container style={marginTop}>
        <Row>
          <Col lg={12}>
            <div style={jumbotronStyle}>
              <h1>Bienvenue au Magasin des Voitures</h1>
              <blockquote className="blockquote mb-0">
                <p>Le meilleur de nos voitures est exposé près de chez vous</p>
                <footer className="blockquote-footer">
                  En savoir plus
                </footer>
              </blockquote>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bienvenue;
