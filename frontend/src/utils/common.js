exports.closeAlert = (dispatch) => {
  setTimeout(() => {
    console.log("after 5 sec");
    dispatch({ type: "clearMessage" });
  }, 5000);
};
