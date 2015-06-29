var _ = require('lodash');

// @see https://github.com/maxkueng/node-musicbrainz
var mb = require('musicbrainz');

// @see https://www.npmjs.com/package/coverart
var CA = require('coverart');
// Initialize Cover Art
var ca = new CA({userAgent:'mbrz-test/0.0.1 ( http://mbrz-test.com )'});

// this will attempt to get a cover art, may get 404, may get many results per request
// cover art may be front art or back art, sometimes not specified by response:
var getCoverArt = function (mbid) {
  ca.release(mbid, function(err, response){
    if (err) {
      console.error(err);
    }else{
      _.forEach(response.images, function(img) {
        console.log({
          front: img.front,
          back: img.back,
          image: img.image,
          thumbnails: img.thumbnails
        });
      });
    }
  });
};

// this will yield many results, some without cover:
var mbQuery = 'Nevermind';
var mbFilter = { artist: 'Nirvana'};
mb.searchReleases(mbQuery, mbFilter, function(err, releases){
  // releases are musicbrainz albums, we need the ids:
  var releasesIds = _.map(releases, function(r) {
    return r.id;
  });
  _.forEach(releasesIds, getCoverArt);
});
