import React from 'react';
import { Modal, Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useAppSelector } from '../../../store/storeHooks';

const ProfileModal: React.FC<IProfileModalProps> = ({ show, onHide }) => {
  const profile = useAppSelector(state => state.profileSlice)
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center mb-3">
              <Image 
                src="/src/assets/profile-2.png" 
                roundedCircle 
                width={150} 
                height={150}
                className="border shadow-sm mb-3"
              />
              
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">{profile.username}</Card.Title>
                  
                  <Card.Subtitle className="mb-2 text-muted">
                    <i className="bi bi-envelope me-2"></i>
                    {profile.email}
                  </Card.Subtitle>
                  
                  <Card.Text className="mt-3">
                    <span className="fw-bold">Role: </span>
                    {profile.role}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;