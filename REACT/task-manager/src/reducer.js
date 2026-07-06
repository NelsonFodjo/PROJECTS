export default function taskReducer(state, action){
    switch(action.type){
        case "ADD_TASK": {

            return {
                tasks: [...state.tasks, action.payload]
            }
        }
            
        default:
            return state;
    }
}