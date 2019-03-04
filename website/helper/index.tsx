function getJSON(url: string, callback: Function) {
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('get', url, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.response);
    } else {
      throw new Error(xhr.statusText);
    }
  };
  xhr.send();
}

export {
  getJSON, // eslint-disable-line
};
