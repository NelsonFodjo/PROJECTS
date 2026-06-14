export default function Card(props){
    return(
        <div className={
            `card ${props.card.isFlipped ? "flipped" : ""}`
        } onClick={() => props.onClick(props.card)}>
            
            <div className="card-front"> ? </div>
            <div className="card-back">
                {props.card.value}
            </div>
        </div>
    )
}