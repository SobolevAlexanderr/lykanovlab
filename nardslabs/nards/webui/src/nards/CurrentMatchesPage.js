
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import MatchList from './MatchList';
import useCurrentMatches from './api/currentMatches';
import SettingResultModal from './SettingResultModal';
import MatchCreationModal from './MatchCreationModal'


function MatchView(props) {
    const [modalShow, setModalShow] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);

    if (props.isLoading) {
        return (
            <>
                <span>Загрузка</span>
            </>
        )
    } else if (props.matches !== null) {
        return (
            <>
                <Button variant="danger" onClick={() => setModalShow(true)}>Зарегистрировать матч</Button>
                <MatchList matches={props.matches} setResult={(match) => setSelectedMatch(match)} />
                <SettingResultModal
                    show={selectedMatch !== null}
                    onHide={() => setSelectedMatch(null)}
                    selectedMatch={selectedMatch}
                    postResults={props.matchesMethods.postResults}
                />
                <MatchCreationModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    postMatches={props.matchesMethods.post}
                />
            </>
        )
    } else {
        return (
            <>
                <span>Ошибка: {props.matchesError.message}</span>
            </>
        )
    }
}


function MatchesPage() {

    const [matches, matchesMethods, matchesError, isLoading] = useCurrentMatches();

    return (
        <div style={{ backgroundColor: "#FFDEAD", width: '1920px', minHeight: '1080px' }}>
            <header>
                <h1>
                   Матчи
                </h1>
            </header>

            <MatchView matches={matches} matchesMethods={matchesMethods} matchesError={matchesError} isLoading={isLoading} />

        </div>
    );
}


export default MatchesPage;