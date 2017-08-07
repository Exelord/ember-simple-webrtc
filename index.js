/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-simple-webrtc',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-simple-webrtc/simplewebrtc-with-adapter.bundle.js', {
      using: [{ transformation: 'amd', as: 'simplewebrtc' }]
    });
  },

  simpleWebRTCPath() {
    return path.join(this.app.project.nodeModulesPath, 'simplewebrtc', 'out');
  },

  treeForVendor: function(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.simpleWebRTCPath(), {
      destDir: 'ember-simple-webrtc',
      files: ['simplewebrtc-with-adapter.bundle.js']
    }));

    return mergeTrees(trees);
  },
};
