export function getObjectFromB64(b64: string) {
  const buffer = Buffer.from(b64, 'base64').toString();
  return JSON.parse(buffer);
}
export function getB64FromObject(target: object) {
  const stringified = JSON.stringify(target);
  return Buffer.from(stringified).toString('base64');
}
