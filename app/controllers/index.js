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

    setupSketch: function(sketch) {
      if (Ember.$('#' + sketch.url).length == 0) {
        setTimeout(function() {
          this.send('setupSketch', sketch);
        }.bind(this), 1000);
        return;
      }
      if (sketch.initialized) {
        return;
      }
      sketch.initialized = true;

      var strokes = JSON.parse(sketch.json_data).strokes;

      var sketchpad = new Sketchpad({
        element: '#' + sketch.url,
        strokes: strokes,
        readOnly: true,
      });
      sketchpad.animate(10);
    },
  },
});
