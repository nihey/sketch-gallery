import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(dateint) {
  return new Date(dateint).toLocaleDateString('en-US');
});
