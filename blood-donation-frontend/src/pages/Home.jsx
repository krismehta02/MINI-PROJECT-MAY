import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../Home.css';

function Home() {
  return (
    <>
      <div className="video-container">
        <video
          src="/Videos/blood-donation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        />
      </div>

      <div className="bg-light py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <Card className="welcome-card p-4 border-0">
                <Card.Body>
                  <h1 className="text-danger fw-bold mb-4">
                    Be the Lifeline Someone Needs
                  </h1>
                  <p className="lead text-muted mb-3">
                    Join our mission to create a healthier, more compassionate world through blood donation.
                  </p>
                  <p className="text-secondary">
                    Our platform bridges the gap between patients and life-saving blood donors.
                    Whether you're here to give or to receive, you're part of something extraordinary.
                  </p>
                  <div className="mt-4">
                    <Button href="/register" variant="danger" size="lg" className="shadow-sm">
                      Become a Donor
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Did You Know Section */}
          <Row className="justify-content-center mt-4">
            <Col md={10} lg={8}>
              <Card className="did-you-know-card p-3 border-0">
                <Card.Body>
                  <h5 className="text-danger fw-bold mb-3 text-center">Did You Know?</h5>
                  <ul className="text-start">
                    <li><i className="bi bi-droplet-fill text-danger me-2"></i> Every 2 seconds, someone in India needs blood.</li>
                    <li><i className="bi bi-heart-fill text-danger me-2"></i> Just one pint of blood can save up to 3 lives.</li>
                    <li><i className="bi bi-people-fill text-danger me-2"></i> Less than 1% of healthy Indians donate blood regularly.</li>
                    <li><i className="bi bi-check-circle-fill text-danger me-2"></i> There’s no synthetic alternative to human blood.</li>
                    <li><i className="bi bi-shield-check text-danger me-2"></i> Regular donation can improve your heart health.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Videos Section */}
      <section className="videos-section py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">VIDEOS</h2>
          <Row className="justify-content-center">
            <Col md={6} className="mb-4 text-center">
              <div className="video-wrapper">
                <video controls width="100%" poster="/Videos/poster1.jpg" autoPlay loop muted>
                  <source src="/Videos/video_1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-2 fw-medium">The Benefits of Donating Blood</p>
              </div>
            </Col>
            <Col md={6} className="mb-4 text-center">
              <div className="video-wrapper">
                <video controls width="100%" poster="/Videos/poster2.jpg" autoPlay loop muted>
                  <source src="/Videos/video_2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-2 fw-medium">Why Should You Donate Blood?</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
