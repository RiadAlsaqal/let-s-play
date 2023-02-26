function radiansToDegrees(angle: number) {
  return angle * (180 / Math.PI);
}

function degreesToRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function latitudesToKM(latitudes: number) {
  return latitudes * 110.574;
}

function kMToLatitudes(km: number) {
  return km / 110.574;
}

function longitudesToKM(longitudes: number, atLatitude: number) {
  return longitudes * 111.32 * Math.cos(degreesToRadians(atLatitude));
}

function kMToLongitudes(km: number, atLatitude: number) {
  return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
}

export {
  radiansToDegrees,
  degreesToRadians,
  latitudesToKM,
  kMToLatitudes,
  longitudesToKM,
  kMToLongitudes,
};
