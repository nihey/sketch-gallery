import Ember from 'ember';
import SketchUtils from '../utils/sketch';

export default Ember.Controller.extend({

  actions: {

    redo: function() {
      this.get('sketchpad').redo();
    },

    undo: function() {
      this.get('sketchpad').undo();
    },

    animate: function() {
      this.get('sketchpad').animate(7);
    },

    submitSketch: function() {
      this.set('formFailed', false);

      var data = {
        url: this.get('model').sketch_url,
        email: this.get('email'),
        json: this.get('sketchpad').toJSON(),
      };
      console.log(data);

      SketchUtils.ajax({
        type: 'POST',
        url: SketchENV.APP.host + '/sketches',
        data: data,
        success: function() {
            this.transitionToRoute('/');
        },
        error: function(xhr) {
          this.set('formFailed', true);
          this.set('error', xhr.responseJSON);
        },
        context: this,
      });
    },
  },
});
