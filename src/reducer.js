//intial state of the app
import instance from "./axios";
export const initialState = {
    currentUser: {
      username: 'Login',
      userId: null,
    }, 
    basket: [],
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        return {
          ...state,
          currentUser: {
            username: action.user.username,
            userId: action.user.userId
          }
        };
      case 'LOGOUT':
          return {
            ...state,
            currentUser: {
              username: 'Login',
              userId: null
            },
            basket: [],
          };
       case 'ADD_TO_BASKET':
            instance.post(`/addtobasket/${action.payload.user.userId}`, action.payload.item)
              .then(response => {
               console.log('Item added to basket:', response.data);
              })
              .catch(error => {
                console.error('Error adding item to basket:', error);
                
              });
            return{
              ...state,
              basket: [...state.basket, action.payload.item]
            }
          
          
      case 'REMOVE_FROM_BASKET':
           
            const removeItemFromBasket = async () => {
              try {
                const response = await instance.post(`/removefrombasket/${action.payload.user.userId}`, action.payload.item);
                console.log('Item removed from basket:', response.data);
              } catch (error) {
                console.error('Error removing item from basket:', error);
              }
            };
            removeItemFromBasket();
            break;
           
      default:
        return state;
    }
  };
  
  export default reducer;
  