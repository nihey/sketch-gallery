import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(controller) {
  controller.send.apply(controller, Array.slice(arguments, 1));
});
