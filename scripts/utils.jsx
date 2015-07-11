var Utils = {
  getArtworkName: function() {
    return decodeURIComponent(location.hash.substring(3));
  },

  getArtworkURL: function() {
    return location.hash.substring(3);
  },

  encode: function(string) {
    return btoa(encodeURIComponent(string));
  },

  decode: function(string) {
    try {
      return atob(decodeURIComponent(string));
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};

module.exports = Utils;
