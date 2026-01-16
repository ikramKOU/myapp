import React, { Component } from 'react';
import { Card, Table } from 'react-bootstrap';

export default class VoitureListe extends Component {
  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Liste Voitures</Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Année</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr align="center">
                <td colSpan="5">Aucune voiture n’est disponible</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
