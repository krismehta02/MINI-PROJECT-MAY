import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container className="mt-5">
      <h1>About Us</h1>
      <p>
        Welcome to the Blood Donation Management System. This platform aims to connect blood donors and patients, making it easier to donate and request blood when needed.
      </p>
      <h3>Our Team</h3>
      <Row>
        {/* Team member 1: Kris */}
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Kris Mehta</Card.Title>
              <Card.Text>
                Developer and team lead. Responsible for project structure and frontend.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Harshada Ghadge</Card.Title>
              <Card.Text>
                Backend developer. Works on database and API integration.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Kajal Palwe</Card.Title>
              <Card.Text>
                UI/UX designer. Focuses on creating an intuitive and user-friendly interface.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
