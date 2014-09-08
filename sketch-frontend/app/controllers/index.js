import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    setupSketches: function() {
      var sketches = this.get('sketches');
      Ember.$(sketches).each(function (index, sketch) {
        var strokes = JSON.parse(sketch.json_data).strokes;

        var sketchpad = new Sketchpad({
          element: '#' + sketch.url,
          strokes: strokes,
          readOnly: true,
        });
        sketchpad.animate(7, true, 1500);
      });
    },
  },
});
