const v_fs = require('v_file_system');

function V_Cache() {

  this.cache = {};

  this.get = async (key) => {
    return this.cache[key] || false;
  };

  this.set = async (key, value) => {
    return (this.cache[key] = value) || false;
  };

  this.remove = async (key) => {
    delete this.cache[key];
  };

  this.clear = async () => {
    this.cache = {};
  };

  this.size = async () => {
    return Object.keys(this.cache).length;
  };

  this.keys = async () => {
    return Object.keys(this.cache);
  };

  this.values = async () => {
    return Object.values(this.cache);
  };

  this.entries = async () => {
    return Object.entries(this.cache);
  };

  this.toJSON = async () => {
    return JSON.stringify(this.cache);
  };

  this.fromJSON = async (json) => {
    this.cache = JSON.parse(json);
  };

  this.toString = async () => {
    return this.toJSON();
  };

  this.fromString = async (string) => {
    this.fromJSON(string);
  };

  this.toFile = async (file) => {
    return v_fs.writeSy(file, this.toJSON());
  };

  this.fromFile = async (file) => {
    return this.fromJSON(v_fs.readSy(file));
  };

}

const vCache = new V_Cache();

module.exports = vCache;
