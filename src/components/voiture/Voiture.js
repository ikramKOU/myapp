import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import MyToast from '../MyToast'; // Import du composant Toast

export default class Voiture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      annee: '',
      prix: '',
      show: false,          // pour le Toast
      toastMessage: '',     // message à afficher
      toastType: 'success'  // "success" ou "danger"
    };

    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: parseInt(this.state.annee),
      prix: parseInt(this.state.prix)
    };

    // Envoi au backend
    axios.post("http://localhost:8080/api/voitures", voiture)
      .then(response => {
        console.log("Voiture ajoutée :", response.data);

        // Afficher le toast vert et réinitialiser le formulaire
        this.setState(prevState => ({
          marque: '',
          modele: '',
          couleur: '',
          immatricule: '',
          annee: '',
          prix: '',
          show: true,
          toastMessage: "Voiture ajoutée avec succès !",
          toastType: 'success'
        }));

        // Masquer le toast après 3 secondes
        setTimeout(() => this.setState({ show: false }), 3000);

      })
      .catch(error => {
        console.error("Erreur lors de l'ajout :", error);

        // Toast rouge pour erreur
        this.setState({
          show: true,
          toastMessage: "Erreur lors de l'ajout de la voiture !",
          toastType: 'danger'
        });

        setTimeout(() => this.setState({ show: false }), 3000);
      });
  }

  render() {
    return (
      <>
        {/* Toast en dehors du formulaire */}
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <MyToast
            show={this.state.show}
            message={this.state.toastMessage}
            type={this.state.toastType}
          />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Ajouter Voiture</Card.Header>

          <Form onSubmit={this.submitVoiture}>
            <Card.Body>

              {/* Ligne 1 */}
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="marque"
                    value={this.state.marque}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Modèle</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="modele"
                    value={this.state.modele}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                  />
                </Form.Group>
              </Row>

              {/* Ligne 2 */}
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="couleur"
                    value={this.state.couleur}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="immatricule"
                    value={this.state.immatricule}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                  />
                </Form.Group>
              </Row>

              {/* Ligne 3 */}
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Année</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="annee"
                    value={this.state.annee}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="prix"
                    value={this.state.prix}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                  />
                </Form.Group>
              </Row>

            </Card.Body>

            <Card.Footer className="text-end">
              <Button variant="success" type="submit">
                Enregistrer
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </>
    );
  }
}
