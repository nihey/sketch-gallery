import Ember from 'ember';
import SketchUtils from '../utils/sketch';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    controller.set('sketches', []);

    SketchUtils.ajax({
      type: 'GET',
      url: SketchENV.APP.host + '/sketches',
      success: function(sketches) {
        for (var i = 0; i < sketches.length; i++) {
            var sketch = sketches[i];
            SketchUtils.ajax({
              type: 'GET',
              url: SketchENV.APP.host + '/sketches/' + sketch.url,
              success: function(sketch) {
                sketch.initialized = false;
                controller.get('sketches').pushObject(sketch);
              },
            });
        }
      },
    });
  },

  resetController: function(controller) {
    controller.set('sketches', []);
  }
});
