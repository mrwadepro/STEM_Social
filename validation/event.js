const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.start = !isEmpty(data.start) ? data.start : "";
  data.end = !isEmpty(data.end) ? data.end : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.textcolor = !isEmpty(data.textcolor) ? data.textcolor : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.start)) {
    errors.start = "Start field is required";
  }

  if (Validator.isEmpty(data.end)) {
    errors.end = "End field is required";
  }

  if (Validator.isEmpty(data.color)) {
    errors.color = "Color field is required";
  }
  if (Validator.isEmpty(data.textcolor)) {
    errors.textcolor = "Text color field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
