
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import PlayerList from './PlayerList';
import usePlayers from './api/players';
import PlayerCreationModal from './PlayerCreationModal';


function PlayersView(props) {
    const [modalShow, setModalShow] = useState(false);

    if (props.isLoading) {
        return (
            <>
                <span>Загрузка</span>
            </>
        )
    } else if (props.players !== null) {
        return (
            <>
                <Button variant="danger" onClick={() => setModalShow(true)}>Зарегистрировать участника</Button>
                <PlayerList players={props.players} />
                <PlayerCreationModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    postPlayers={props.playerMethods.post}
                />
            </>
        )
    } else {
        return (
            <>
                <span>Ошибка: {props.playersError.message}</span>
            </>
        )
    }
}


function PlayersPage() {

    const [players, playerMethods, playersError, isLoading] = usePlayers();

    return (
        <div style={{ backgroundColor: "#FFDEAD", width: '1000px', minHeight: '1080px' }}>
            <header>
                <h1>
                    Участники
                </h1>
            </header>

            <PlayersView players={players} playerMethods={playerMethods} playersError={playersError} isLoading={isLoading} />

        </div>
    );
}


export default PlayersPage;