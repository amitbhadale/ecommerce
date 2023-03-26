export const addToCartAction = (cart) => (dispatch) => {
  dispatch({
    type: "addToCart",
    payload: cart,
  });
};
