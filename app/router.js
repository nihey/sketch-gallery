import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('index', {path: '/'});
  this.resource('sketch', {path: '/:sketch_url'});
});

export default Router;
