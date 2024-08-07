const reducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return action.payload.text
        default:
            return state
    }
}

export const updateFilter = (text) => {
    return {
        type: 'UPDATE_FILTER',
        payload: {
            text
        }
    }
}

export default reducer