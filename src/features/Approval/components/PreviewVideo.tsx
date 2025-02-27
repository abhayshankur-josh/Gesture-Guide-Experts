
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_ROUTES } from '../../../constants/apiConstants';

interface PreviewVideoProps {
    show: boolean;
    handleClose: () => void;
    videoPath: string;
}
const PreviewVideoComponent: React.FC<PreviewVideoProps> = ({show, handleClose, videoPath}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Preview Video</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <video src={API_ROUTES.BASE_URL+videoPath}
                // poster='https://ik.imagekit.io/ikmedia/example_video.mp4/ik-thumbnail.jpg?tr=w-1200,h-680'
                width='100%'
                controls
                autoPlay
             />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => window.open(API_ROUTES.BASE_URL+videoPath) } >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PreviewVideoComponent;