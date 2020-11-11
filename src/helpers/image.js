const helpers = {};

helpers.randomAlphanumeric = () => {
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 0;

  for (let i = 0; i < 6; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return result;
}

module.exports = helpers;