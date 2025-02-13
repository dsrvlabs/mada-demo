const plugin = require("tailwindcss/plugin")
const { scrollbarHide } = require("./scrollbar-hide")
const { autofillHide } = require("./autofill-hide")

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ...scrollbarHide,
    ...autofillHide,
  })
})
