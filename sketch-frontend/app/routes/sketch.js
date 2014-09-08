import Ember from 'ember';
import SketchUtils from '../utils/sketch';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    controller.set('model', model);

    SketchUtils.ajax({
      type: 'GET',
      data: {url: model.sketch_url},
      url: SketchENV.APP.host + '/sketches',
      success: function(sketch) {
        var readOnly = false;
        var strokes = [];
        if(sketch.length > 0) {
            readOnly = true;
            strokes = JSON.parse(sketch[0].json_data).strokes;
            controller.set('readOnly', true);
        }

        var sketchpad = new Sketchpad({
          element: '#sketchpad',
          width: 400,
          height: 400,
          strokes: strokes,
          readOnly: readOnly,
        });
        controller.set('sketchpad', sketchpad);
      },
    });
  },
});
