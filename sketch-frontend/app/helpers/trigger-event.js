import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(controller) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args[i-1] = arguments[i];
  }
  controller.send.apply(controller, args);
});
