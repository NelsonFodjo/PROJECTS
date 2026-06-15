export default function WinMessage(props){
    return(
        <div className="win-message">
            <h2>Congratulations!</h2>
            <p >You completed the game in {props.moves}</p>
        </div>
    )
}