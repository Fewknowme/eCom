import userTypes from './user.types';

const INTIAL_STATE = {
    currentUser: null,
    resetPasswordSuccess: false,
    userErr: []
};

const userReducer = (state=INTIAL_STATE, action)=>{
    switch (action.type) {
       case userTypes.SIGN_IN_SUCCESS:
      return{
        ...state,
        currentUser: action.payload,
        userErr: []
      }
       case userTypes.USER_ERROR:
          return{
            ...state,
            userErr: action.payload
          }
       case userTypes.RESET_PASSWORD_SUCCESS:
            return{
              ...state,
              resetPasswordSuccess: action.payload
            }
       case userTypes.RESET_USER_STATE:
       case userTypes.SIGN_OUT_USER_SUCCESS:
                return{
                  ...state,
                  ...INTIAL_STATE
                }  
       default:
            return state;
    }
};

export default userReducer;