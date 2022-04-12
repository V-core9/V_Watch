const v_fs = require('v_file_system');
const path = require("path");

function V_Cache() {

  this.cache = {};

  this.getAll = list = async () => {
    return this.cache;
  };


  this.get = get = async (key = null) => {
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


  this.toJSON = () => {
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


  this.toFile = (file) => {
    return v_fs.writeSy(path.join(__dirname, file), this.toJSON());
  };


  this.fromFile = (file) => {
    return this.fromJSON(v_fs.readSy(path.join(__dirname, file)));
  };

}

const vCache = new V_Cache();

module.exports = vCache;
