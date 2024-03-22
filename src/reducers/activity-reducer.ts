import { activity } from "../components/types";

export type ActivityActions = {
    type: 'save-activity',
    payload: {newActivity: activity}
}

type ActivityState = {
    activities: activity[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions    
    ) => { 
    if(action.type === 'save-activity'){
        // Este codigo maneja la logica para actualizar el state
        console.log('desde el save-activity');
        
    }
    return state;
        
    }   