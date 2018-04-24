const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
const nonprintables = /[^\x20-\x7E]+/g;
const getId = (url) => {
  const cleanUrl = url
  const match = cleanUrl.match(rx);

  if (match) {
    return match[1];
  }

  return null;
};

module.exports = getId;
