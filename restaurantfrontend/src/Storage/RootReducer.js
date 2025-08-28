/**
 * RootReducer.js
 *
 * Combines all Redux reducers for application state management.
 * Handles order data actions: ADD_ORDER, DEL_ORDER, EDIT_ORDER.
 */
const initialState={
   orderData:{}
}

export default function RootReducer(state=initialState,action)
{  
   switch(action.type)
   {
      case "ADD_ORDER":
         state.orderData[action.payload[0]]=action.payload[1]
         console.log("REDUX",state.orderData)
         return {orderData:state.orderData}
      case "DEL_ORDER":
         delete state.orderData[action.payload[0]] 
         return {orderData:state.orderData}
      case "EDIT_ORDER":
            state.orderData[action.payload[0]]=action.payload[1]
            console.log(state.orderData)
            return {orderData:state.orderData}
      default:
         return {orderData:state.orderData}
   }
}