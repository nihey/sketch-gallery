import Ember from 'ember';

export default {
  ajax: function(object) {
    var ajaxConfig = Ember.$.extend({
      xhrFields: {withCredentials: true},
      crossDomain: true,
    }, object);
    Ember.$.ajax(ajaxConfig);
  },
};
