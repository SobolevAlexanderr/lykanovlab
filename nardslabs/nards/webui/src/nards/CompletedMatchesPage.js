

import MatchList from './MatchList';
import useCompletedMatches from './api/completedMatches';


function MatchView(props) {
    if (props.isLoading) {
        return (
            <>
                <span>Загрузка</span>
            </>
        )
    } else if (props.matches !== null) {
        return (
            <>
                <MatchList matches={props.matches} />
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


function CompletedMatchesPage() {

    const [matches, , matchesError, isLoading] = useCompletedMatches();

    return (
        <div style={{ backgroundColor: "#FFDEAD", width: '1920px', minHeight: '1080px' }} >
            <header>
                <h1>
                    победители матчей
                </h1>
            </header>

            <MatchView matches={matches} matchesError={matchesError} isLoading={isLoading} />

        </div>
    );
}


export default CompletedMatchesPage;