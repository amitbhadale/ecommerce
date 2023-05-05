exports.closeAlert = (dispatch) => {
  setTimeout(() => {
    dispatch({ type: "clearMessage" });
  }, 2000);
};
