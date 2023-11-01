import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoAlertCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const ConfirmeDeleteModal = (props) => {

    const handleDelete = async () => {
        axios.delete(props.url).then((response) => {
            props.handleModalDelete()
            toast.success(
                'Excluido com sucesso',
                { autoClose: 2000 }
            )
        })
    }

    return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><IoAlertCircle className='me-2 fs-2 mb-1 text-danger'/>Excluir item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            O item será excluido permanentemente. Deseja Continuar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ConfirmeDeleteModal;