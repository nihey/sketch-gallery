import Ember from 'ember';
import SketchUtils from '../utils/sketch';

export default Ember.Route.extend({

  setupController: function(controller, model) {

    SketchUtils.ajax({
      type: 'GET',
      url: SketchENV.APP.host + '/sketches',
      success: function(sketches) {
        controller.set('sketches', sketches);
      },
    });
  },

  resetController: function(controller) {
    controller.set('sketches', []);
  }
});
