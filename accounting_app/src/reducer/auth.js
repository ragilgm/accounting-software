const initialState = {
    isLogin: false,
    user: "",
    company:""
}

const authReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "LOGIN":
            state.isLogin=action.isLogin
            state.user = action.payload
            state.company= action.company
            return {
                user: state.user,
                isLogin: state.isLogin,
                company:state.company
            }
        case "LOGOUT":
            state.isLogin=action.isLogin
            state.user=action.payload
            return {
                user: state.user,
                isLogin:state.isLogin
            }

        default:
            return state
    }
}

export default authReducer