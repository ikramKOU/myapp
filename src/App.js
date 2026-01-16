import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Bienvenue from './components/Bienvenue';
import Voiture from './components/voiture/Voiture';
import VoitureListe from './components/voiture/VoitureListe';



export default class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12}>
              <Routes>
                <Route path="/" element={<Bienvenue />} />
                <Route path="/add" element={<Voiture />} />
                <Route path="/list" element={<VoitureListe />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}
