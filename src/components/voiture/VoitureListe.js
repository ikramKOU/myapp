import React, { Component } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import MyToast from '../MyToast';  

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      editVoitureId: null,
      editForm: {},
      show: false,           // pour le Toast
      toastMessage: "",      // message à afficher
      toastType: "success"   // "success" ou "danger"
    };
  }

  componentDidMount() {
    this.loadVoitures();
  }

  loadVoitures() {
    axios.get("http://localhost:8080/api/voitures")
      .then(response => {
        const voitures = response.data._embedded ? response.data._embedded.voitures.map((v, index) => ({ ...v, id: index + 1 })) : [];
        this.setState({ voitures });
      })
      .catch(error => console.error("Erreur chargement voitures :", error));
  }

  deleteVoiture(id) {
    if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
      axios.delete(`http://localhost:8080/api/voitures/${id}`)
        .then(() => {
          // Supprime la voiture du tableau et affiche le toast
          this.setState({
            voitures: this.state.voitures.filter(v => v.id !== id),
            show: true,
            toastMessage: "Voiture supprimée avec succès.",
            toastType: "danger"   // rouge pour suppression
          });

          // Masquer le toast après 3 secondes
          setTimeout(() => this.setState({ show: false }), 3000);
        })
        .catch(error => {
          console.error("Erreur lors de la suppression :", error);
          this.setState({
            show: true,
            toastMessage: "Erreur lors de la suppression !",
            toastType: "danger"
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        });
    }
  }

  startEdit(voiture) {
    this.setState({
      editVoitureId: voiture.id,
      editForm: { ...voiture }
    });
  }

  cancelEdit() {
    this.setState({ editVoitureId: null, editForm: {} });
  }

  handleEditChange = (e) => {
    this.setState({
      editForm: { ...this.state.editForm, [e.target.name]: e.target.value }
    });
  }

  submitEdit = (id) => {
    axios.put(`http://localhost:8080/api/voitures/${id}`, this.state.editForm)
      .then(() => {
        this.setState({
          editVoitureId: null,
          editForm: {},
          show: true,
          toastMessage: "Voiture mise à jour avec succès.",
          toastType: "success"   // vert pour ajout/mise à jour
        });
        this.loadVoitures();
        setTimeout(() => this.setState({ show: false }), 3000);
      })
      .catch(error => {
        console.error("Erreur mise à jour :", error);
        this.setState({
          show: true,
          toastMessage: "Erreur lors de la mise à jour !",
          toastType: "danger"
        });
        setTimeout(() => this.setState({ show: false }), 3000);
      });
  }

  render() {
    return (
      <>
        {/* Toast */}
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast
            show={this.state.show}
            message={this.state.toastMessage}
            type={this.state.toastType}
          />
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>Liste Voitures</Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modèle</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Année</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Aucune voiture n’est disponible</td>
                  </tr>
                ) : (
                  this.state.voitures.map((voiture) => {
                    const isEditing = this.state.editVoitureId === voiture.id;
                    return (
                      <tr key={voiture.id}>
                        <td>{isEditing ? <Form.Control name="marque" value={this.state.editForm.marque} onChange={this.handleEditChange} /> : voiture.marque}</td>
                        <td>{isEditing ? <Form.Control name="modele" value={this.state.editForm.modele} onChange={this.handleEditChange} /> : voiture.modele}</td>
                        <td>{isEditing ? <Form.Control name="couleur" value={this.state.editForm.couleur} onChange={this.handleEditChange} /> : voiture.couleur}</td>
                        <td>{isEditing ? <Form.Control name="immatricule" value={this.state.editForm.immatricule} onChange={this.handleEditChange} /> : voiture.immatricule}</td>
                        <td>{isEditing ? <Form.Control name="annee" type="number" value={this.state.editForm.annee} onChange={this.handleEditChange} /> : voiture.annee}</td>
                        <td>{isEditing ? <Form.Control name="prix" type="number" value={this.state.editForm.prix} onChange={this.handleEditChange} /> : voiture.prix}</td>
                        <td>
                          {isEditing ? (
                            <>
                              <Button variant="success" size="sm" className="me-2" onClick={() => this.submitEdit(voiture.id)}>✔</Button>
                              <Button variant="secondary" size="sm" onClick={() => this.cancelEdit()}>✖</Button>
                            </>
                          ) : (
                            <>
                              <Button variant="warning" size="sm" className="me-2" onClick={() => this.startEdit(voiture)}>Éditer</Button>
                              <Button variant="danger" size="sm" onClick={() => this.deleteVoiture(voiture.id)}>Supprimer</Button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }
}
