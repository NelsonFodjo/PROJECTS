import React from 'react'

export default function Fruits({fruits}){
    
    return (
        <div>
            {fruits.map(f => <p key={f.id}>{f.fruitName}</p>)}
        </div>
    )
}