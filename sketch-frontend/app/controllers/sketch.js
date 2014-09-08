import Ember from 'ember';
import SketchUtils from '../utils/sketch';

export default Ember.Controller.extend({

  actions: {

    animate: function() {
      this.get('sketchpad').animate(10);
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
            location.reload();
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
