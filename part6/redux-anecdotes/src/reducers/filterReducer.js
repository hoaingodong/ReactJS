const filterReducer = (state = null, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'FILTER',
        payload: {filter},
    }
}

export default filterReducer