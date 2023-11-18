"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = open;
exports.openDir = void 0;
exports.path = path;
exports.staticDir = staticDir;
require("source-map-support/register");
var _fs = _interopRequireDefault(require("./fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _constants = _interopRequireDefault(require("constants"));
var _logger = _interopRequireDefault(require("./logger"));
const RDWR_EXCL = _constants.default.O_CREAT | _constants.default.O_TRUNC | _constants.default.O_RDWR | _constants.default.O_EXCL;
async function tempDir() {
  const now = new Date();
  const filePath = _path.default.join(process.env.ARMOR_TMP_DIR || _os.default.tmpdir(), [now.getFullYear(), now.getMonth(), now.getDate(), '-', process.pid, '-', (Math.random() * 0x100000000 + 1).toString(36)].join(''));
  await _fs.default.mkdir(filePath);
  return filePath;
}
async function path(rawAffixes, defaultPrefix) {
  const affixes = parseAffixes(rawAffixes, defaultPrefix);
  const name = `${affixes.prefix || ''}${affixes.suffix || ''}`;
  const tempDirectory = await tempDir();
  return _path.default.join(tempDirectory, name);
}
async function open(affixes) {
  const filePath = await path(affixes, 'f-');
  try {
    let fd = await _fs.default.open(filePath, RDWR_EXCL, 0o600);
    return {
      path: filePath,
      fd
    };
  } catch (err) {
    return _logger.default.errorAndThrow(err);
  }
}
function parseAffixes(rawAffixes, defaultPrefix) {
  let affixes = {};
  if (rawAffixes) {
    switch (typeof rawAffixes) {
      case 'string':
        affixes.prefix = rawAffixes;
        break;
      case 'object':
        affixes = rawAffixes;
        break;
      default:
        throw new Error(`Unknown affix declaration: ${affixes}`);
    }
  } else {
    affixes.prefix = defaultPrefix;
  }
  return affixes;
}
const _static = tempDir();
const openDir = exports.openDir = tempDir;
async function staticDir() {
  return _static;
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliL3RlbXBkaXIuanMiLCJuYW1lcyI6WyJfZnMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9vcyIsIl9wYXRoIiwiX2NvbnN0YW50cyIsIl9sb2dnZXIiLCJSRFdSX0VYQ0wiLCJjbnN0IiwiT19DUkVBVCIsIk9fVFJVTkMiLCJPX1JEV1IiLCJPX0VYQ0wiLCJ0ZW1wRGlyIiwibm93IiwiRGF0ZSIsImZpbGVQYXRoIiwibm9kZVBhdGgiLCJqb2luIiwicHJvY2VzcyIsImVudiIsIkFSTU9SX1RNUF9ESVIiLCJvcyIsInRtcGRpciIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwicGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwiZnMiLCJta2RpciIsInBhdGgiLCJyYXdBZmZpeGVzIiwiZGVmYXVsdFByZWZpeCIsImFmZml4ZXMiLCJwYXJzZUFmZml4ZXMiLCJuYW1lIiwicHJlZml4Iiwic3VmZml4IiwidGVtcERpcmVjdG9yeSIsIm9wZW4iLCJmZCIsImVyciIsImxvZyIsImVycm9yQW5kVGhyb3ciLCJFcnJvciIsIl9zdGF0aWMiLCJvcGVuRGlyIiwiZXhwb3J0cyIsInN0YXRpY0RpciJdLCJzb3VyY2VSb290IjoiLi4vLi4iLCJzb3VyY2VzIjpbImxpYi90ZW1wZGlyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgbGlicmFyeSBpcyBvcmlnaW5hdGVkIGZyb20gdGVtcC5qcyBhdCBodHRwOi8vZ2l0aHViLmNvbS9icnVjZS9ub2RlLXRlbXAgKi9cbmltcG9ydCBmcyBmcm9tICcuL2ZzJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgbm9kZVBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY25zdCBmcm9tICdjb25zdGFudHMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5cbmNvbnN0IFJEV1JfRVhDTCA9IGNuc3QuT19DUkVBVCB8IGNuc3QuT19UUlVOQyB8IGNuc3QuT19SRFdSIHwgY25zdC5PX0VYQ0w7XG5cbi8qKlxuICogR2VuZXJhdGUgYSB0ZW1wb3JhcnkgZGlyZWN0b3J5IGluIG9zLnRlbXBkaXIoKSBvciBwcm9jZXNzLmVudi5BUk1PUl9UTVBfRElSLlxuICogZS5nLlxuICogLSBObyBgcHJvY2Vzcy5lbnYuQVJNT1JfVE1QX0RJUmA6IGAvdmFyL2ZvbGRlcnMvMzQvMjIyMnNoOG4yN2Q2cmNwN2pxbGt3OGttMDAwMGduL1QveHh4eHh4eHgueXl5eWBcbiAqIC0gV2l0aCBgcHJvY2Vzcy5lbnYuQVJNT1JfVE1QX0RJUiA9ICcvcGF0aC90by9yb290J2A6IGAvcGF0aC90by9yb290L3h4eHh4eHh4Lnl5eXlgXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwYXRoIHRvIHRoZSB0ZW1wb3JhcnkgZGlyZWN0b3J5XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHRlbXBEaXIgKCkge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBmaWxlUGF0aCA9IG5vZGVQYXRoLmpvaW4oXG4gICAgcHJvY2Vzcy5lbnYuQVJNT1JfVE1QX0RJUiB8fCBvcy50bXBkaXIoKSxcbiAgICBbXG4gICAgICBub3cuZ2V0RnVsbFllYXIoKSxcbiAgICAgIG5vdy5nZXRNb250aCgpLFxuICAgICAgbm93LmdldERhdGUoKSxcbiAgICAgICctJyxcbiAgICAgIHByb2Nlc3MucGlkLFxuICAgICAgJy0nLFxuICAgICAgKE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMCArIDEpLnRvU3RyaW5nKDM2KSxcbiAgICBdLmpvaW4oJycpXG4gICk7XG4gIC8vIGNyZWF0ZXMgYSB0ZW1wIGRpcmVjdG9yeSB1c2luZyB0aGUgZGF0ZSBhbmQgYSByYW5kb20gc3RyaW5nXG5cbiAgYXdhaXQgZnMubWtkaXIoZmlsZVBhdGgpO1xuXG4gIHJldHVybiBmaWxlUGF0aDtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiBBZmZpeGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ByZWZpeF0gLSBwcmVmaXggb2YgdGhlIHRlbXAgZGlyZWN0b3J5IG5hbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbc3VmZml4XSAtIHN1ZmZpeCBvZiB0aGUgdGVtcCBkaXJlY3RvcnkgbmFtZVxuICovXG5cbi8qKlxuICogR2VuZXJhdGUgYSB0ZW1wb3JhcnkgZGlyZWN0b3J5IGluIG9zLnRlbXBkaXIoKSBvciBwcm9jZXNzLmVudi5BUk1PUl9UTVBfRElSXG4gKiB3aXRoIGFyYml0cmFyeSBwcmVmaXgvc3VmZml4IGZvciB0aGUgZGlyZWN0b3J5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8QWZmaXhlc30gcmF3QWZmaXhlc1xuICogQHBhcmFtIHtzdHJpbmd9IFtkZWZhdWx0UHJlZml4XVxuICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gIEEgcGF0aCB0byB0aGUgdGVtcG9yYXJ5IGRpcmVjdG9yeSB3aXRoIHJhd0FmZml4ZXMgYW5kIGRlZmF1bHRQcmVmaXhcbiAqL1xuYXN5bmMgZnVuY3Rpb24gcGF0aCAocmF3QWZmaXhlcywgZGVmYXVsdFByZWZpeCkge1xuICBjb25zdCBhZmZpeGVzID0gcGFyc2VBZmZpeGVzKHJhd0FmZml4ZXMsIGRlZmF1bHRQcmVmaXgpO1xuICBjb25zdCBuYW1lID0gYCR7YWZmaXhlcy5wcmVmaXggfHwgJyd9JHthZmZpeGVzLnN1ZmZpeCB8fCAnJ31gO1xuICBjb25zdCB0ZW1wRGlyZWN0b3J5ID0gYXdhaXQgdGVtcERpcigpO1xuICByZXR1cm4gbm9kZVBhdGguam9pbih0ZW1wRGlyZWN0b3J5LCBuYW1lKTtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiBPcGVuZWRBZmZpeGVzXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIGZpbGVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmZCAtIFRoZSBmaWxlIGRlc2NyaXB0b3Igb3BlbmVkXG4gKi9cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHRlbXBvcmFyeSBkaXJlY3RvcnkgaW4gb3MudGVtcGRpcigpIG9yIHByb2Nlc3MuZW52LkFSTU9SX1RNUF9ESVJcbiAqIHdpdGggYXJiaXRyYXJ5IHByZWZpeC9zdWZmaXggZm9yIHRoZSBkaXJlY3RvcnkgbmFtZSBhbmQgcmV0dXJuIGl0IGFzIG9wZW4uXG4gKlxuICogQHBhcmFtIHtBZmZpeGVzfSBhZmZpeGVzXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPcGVuZWRBZmZpeGVzPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gb3BlbiAoYWZmaXhlcykge1xuICBjb25zdCBmaWxlUGF0aCA9IGF3YWl0IHBhdGgoYWZmaXhlcywgJ2YtJyk7XG4gIHRyeSB7XG4gICAgbGV0IGZkID0gYXdhaXQgZnMub3BlbihmaWxlUGF0aCwgUkRXUl9FWENMLCAwbzYwMCk7XG4gICAgLy8gb3BlbnMgdGhlIGZpbGUgaW4gbW9kZSAzODRcbiAgICByZXR1cm4ge3BhdGg6IGZpbGVQYXRoLCBmZH07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBsb2cuZXJyb3JBbmRUaHJvdyhlcnIpO1xuICB9XG59XG5cbi8qKlxuICpcbiAqIFJldHVybnMgcHJlZml4L3N1ZmZpeCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBZmZpeGVzfSByYXdBZmZpeGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gW2RlZmF1bHRQcmVmaXhdXG4gKiBAcmV0dXJucyB7QWZmaXhlc31cbiAqL1xuZnVuY3Rpb24gcGFyc2VBZmZpeGVzIChyYXdBZmZpeGVzLCBkZWZhdWx0UHJlZml4KSB7XG4gIC8qKiBAdHlwZSB7QWZmaXhlc30gKi9cbiAgbGV0IGFmZml4ZXMgPSB7fTtcbiAgaWYgKHJhd0FmZml4ZXMpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiByYXdBZmZpeGVzKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICBhZmZpeGVzLnByZWZpeCA9IHJhd0FmZml4ZXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgYWZmaXhlcyA9IHJhd0FmZml4ZXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGFmZml4IGRlY2xhcmF0aW9uOiAke2FmZml4ZXN9YCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFmZml4ZXMucHJlZml4ID0gZGVmYXVsdFByZWZpeDtcbiAgfVxuICByZXR1cm4gYWZmaXhlcztcbn1cblxuY29uc3QgX3N0YXRpYyA9IHRlbXBEaXIoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IHBhdGggdG8gYSB0ZW1wb3JhcnkgZGlyZWN0b3J5XG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBuZXcgdGVtcERpcigpIGlmIHRlbXBSb290RGlyZWN0b3J5IGlzIG5vdCBwcm92aWRlZFxuICovXG5jb25zdCBvcGVuRGlyID0gdGVtcERpcjtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGF0aCB0byBhIHRlbXBvcmFyeSBkaXJlY3Rvcnkgd2hjaWggaXMgZGVmaW5lZCBhcyBzdGF0aWMgaW4gdGhlIHNhbWUgcHJvY2Vzc1xuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgdGVtcCBkaXJlY3RvcnkgcGF0aCB3aGNpaCBpcyBkZWZpbmVkIGFzIHN0YXRpYyBpbiB0aGUgc2FtZSBwcm9jZXNzXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWF3YWl0XG5hc3luYyBmdW5jdGlvbiBzdGF0aWNEaXIgKCkge1xuICByZXR1cm4gX3N0YXRpYztcbn1cblxuZXhwb3J0IHtvcGVuLCBwYXRoLCBvcGVuRGlyLCBzdGF0aWNEaXJ9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLElBQUFBLEdBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEdBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLEtBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLFVBQUEsR0FBQUosc0JBQUEsQ0FB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