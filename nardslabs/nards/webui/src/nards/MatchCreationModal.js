
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import PlayerSelectionModal from './PlayerSelectionModal';


function MatchCreationModal(props) {
    const [selectionShow, setSelectionShow] = useState(false);
    const [firstPlayer, setFirstPlayer] = useState(null);
    const [secondPlayer, setSecondPlayer] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectPlayerCallback, setSelectPlayerCallback] = useState(null);

    const createPlayerEntry = (player, setPlayer) => {
        if (player === null) {
            return (
                <Button variant = "danger" onClick={() => {
                    setSelectionShow(true);
                    setSelectPlayerCallback(() => setPlayer);
                }}>Выбрать</Button >
            );
        } else {
            return (
                <>
                    <span>{player.firstName + " " + player.secondName}</span>
                    <Button variant="secondary" onClick={() => setPlayer(null)}>Убрать</Button>
                </>
            )
        }
    }

    const reset = () => {
        setFirstPlayer(null);
        setSecondPlayer(null);
        setErrorMessage(null);
    }

    const onSuccess = () => {
        reset();
        props.onHide();
    }

    const onSubmit = match => {
        props.postMatches([match])
            .then(() => onSuccess())
            
    }

    const handleSubmit = (onSubmit) => {
        return ev => { 
            ev.preventDefault();
            if (firstPlayer === null || secondPlayer === null) {
                
                return;
            }
            onSubmit({ firstPlayerId: firstPlayer.id, secondPlayerId: secondPlayer.id });
        }

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >   
            <PlayerSelectionModal show={selectionShow} onHide={() => setSelectionShow(false)} selectPlayer={selectPlayerCallback}
                filter={player => player.id !== firstPlayer?.id && player.id !== secondPlayer?.id} />
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Зарегистрировать матч
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Первый игрок</Form.Label>
                        <br />
                        {createPlayerEntry(firstPlayer, setFirstPlayer)}
                    </Form.Group>
                    <hr />
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Второй игрок</Form.Label>
                        <br />
                        {createPlayerEntry(secondPlayer, setSecondPlayer)}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Зарегистрировать</Button>
                    <Button variant='danger' onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}


export default MatchCreationModal;