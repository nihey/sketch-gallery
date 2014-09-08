import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(controller, action) {
  controller.send(action);
});
