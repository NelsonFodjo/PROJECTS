export default function taskReducer(state, action){
    switch(action.type){
        case "ADD_TASK":
            return { ...state,
                . = [...state, action.payload]
            }
        default:
            return state;
    }
}
