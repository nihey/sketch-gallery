import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    startArtwork: function() {
      this.set('formError', false);
      var sketches = this.get('sketches');
      var artwork = this.get('artwork');
      // FIXME Find a better solution later
      artwork = artwork.replace(/\W/g, '');
      for (var i = 0; i < sketches.length; i++) {
        if (artwork === sketches[i].url) {
          this.set('formError', true);
          return;
        }
      }
      this.transitionToRoute('/' + artwork);
    },

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
