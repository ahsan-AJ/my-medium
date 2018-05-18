const initialState = {
    appName: '',
    modalMode: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...initialState,
                modalMode: action.modalMode
            }
        default:
            return state;
    }
}