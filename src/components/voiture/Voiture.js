import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = { marque: '', modele: '', couleur: '', annee: '', prix: '' };

    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  voitureChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitVoiture(event) {
    alert(`Marque: ${this.state.marque}, Modèle: ${this.state.modele}`);
    event.preventDefault();
  }

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Ajouter Voiture</Card.Header>
        <Form onSubmit={this.submitVoiture} id="VoitureFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="marque"
                  value={this.state.marque}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez Marque Voiture"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridModele">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="modele"
                  value={this.state.modele}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez Modèle Voiture"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCouleur">
                <Form.Label>Couleur</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="couleur"
                  value={this.state.couleur}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez Couleur Voiture"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAnnee">
                <Form.Label>Année</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="annee"
                  value={this.state.annee}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez Année Voiture"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrix">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="prix"
                  value={this.state.prix}
                  onChange={this.voitureChange}
                  className="bg-dark text-white"
                  placeholder="Entrez Prix Voiture"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: 'right' }}>
            <Button size="sm" variant="success" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
