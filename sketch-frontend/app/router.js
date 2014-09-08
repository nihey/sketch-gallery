import Ember from 'ember';

var Router = Ember.Router.extend({
  location: SketchENV.locationType
});

Router.map(function() {
  this.resource('sketch', {path: '/:sketch_url'});
});

export default Router;
