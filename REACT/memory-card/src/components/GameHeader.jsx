


export default function GameHeader(props){
    return(
        <div className="game-header">
            <h1>Memory Card Game</h1>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-label"> Score:</span>
                    <span className="stat-value"> {props.score}</span>
                    </div>

                    <div className="stat-item">
                    <span className="stat-label"> Moves:</span>
                    <span className="stat-value"> {props.moves}</span>
                    </div>
            </div>
        <button className="reset-button" onClick={props.onClick}>New Game</button>
    </div>
    );
}
    
    