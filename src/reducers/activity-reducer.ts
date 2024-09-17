import { Activity } from "../types"

export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity : Activity} }

type ActivityState = {
    activities: Activity[]
}

export const InitialState : ActivityState = {
    activities: []
}

export const ActivityReducer = (
        state: ActivityState = InitialState,
        action: ActivityActions
    ) => {
    
    if (action.type === 'save-activity') {
        //Aqui la logica para actualizar el state

        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    return state
}