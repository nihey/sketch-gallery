import Ember from 'ember';
import SketchUtils from '../utils/sketch';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('readOnly', true);

    SketchUtils.ajax({
      type: 'GET',
      url: SketchENV.APP.host + '/sketches/' + model.sketch_url,
      success: function(sketch) {
        controller.set('readOnly', true);
        var strokes = JSON.parse(sketch.json_data).strokes;

        var sketchpad = new Sketchpad({
          element: '#sketchpad',
          width: 400,
          height: 400,
          strokes: strokes,
          readOnly: true,
        });
        sketchpad.animate(7, true, 1500);
        controller.set('sketchpad', sketchpad);
      },
      error: function(xhr) {
        if (xhr.status != 404) {
          return;
        }
        controller.set('readOnly', false);
        var sketchpad = new Sketchpad({
          element: '#sketchpad',
          width: 400,
          height: 400,
          readOnly: false,
        });
        controller.set('sketchpad', sketchpad);
      },
    });
  },
});
