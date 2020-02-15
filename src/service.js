export function cleanUpUrl(whereAreYou) {
  let location = whereAreYou.replace(/\//gi, ' ');
  location = location.replace(/_/gi, " ");
  return location;
}
