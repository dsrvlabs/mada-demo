module.exports = {
  autofillHide: {
    ".autofill-hide": {
      "&:-webkit-autofill": {
        "-webkit-box-shadow": "0 0 0 30px #FFF8F4 inset",
        "-webkit-text-fill-color": "#555555",
      },
      "&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
        transition: "background-color 5000s ease-in-out 0s",
      },
    },
  },
}
