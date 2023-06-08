const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, configFunc, headers }) {
    this._baseUrl = baseUrl;
    this._configFunc = configFunc;
    this._headers = headers;
  }

  getCalls(startDate, endDate, inOut = '') {
    return fetch(
      `${this._baseUrl}/getList?date_start=${startDate}&date_end=${endDate}&in_out=${inOut}`,
      {
        headers: this._headers,
        method: 'POST',
      }
    ).then(onResponse);
  }

  getRecord(recordId, partnershipId) {
    return fetch(
      `${this._baseUrl}/getRecord?record=${recordId}&partnership_id=${partnershipId}`,
      {
        headers: {
          'Content-type':
            'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
          'Content-Transfer-Encoding': 'binary',
          'Content-Disposition': 'filename="record.mp3"',
          Authorization: `Bearer testtoken`,
        },
        method: 'POST',
      }
    ).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.skilla.ru/mango',

  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer testtoken`,
  },
};

export const api = new Api(config);
