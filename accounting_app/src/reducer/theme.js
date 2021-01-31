const initialTheme = {
   theme: "basic"
}

const ThemeReducer = (state = initialTheme, action) => { 
   console.log(state, action);
   switch (action.payload) {
      case "basic":
         state.theme = action.payload
         return {
            theme:state.theme
         }
      case "darcula":
         state.theme = action.payload
         return {
            theme:state.theme
         }
     
      case "light":
         
         break;
      case "green":
         
         break;
      case "blue":
         
         break;
      case "grey":
         
         break;
      case "yellow":
         
         break;
      case "red":
         
         break;
   
         default:
            return state
   }
}

export default ThemeReducer