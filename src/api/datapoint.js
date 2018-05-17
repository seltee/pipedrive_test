import Axios from 'axios';

const gate = 'https://hove.pipedrive.com/v1';
const token = '49dcf92d274eebceac003c30711a9285367c7afd';

export function getPersonsList(search, fieldToSort, page) {
  if (search && search.length > 0) {
    return Axios.get(`${gate}/persons/find`, {
      params: {
        api_token: token,
        term: search,
        start: page * 10,
        limit: 10,
        sort: fieldToSort
      }
    });
  }
  return Axios.get(`${gate}/persons`, {
    params: {
      api_token: token,
      start: page * 10,
      limit: 10,
      sort: fieldToSort
    }
  });
}

export function removePerson(id) {
  return Axios.delete(`${gate}/persons/${id}?api_token=${token}`);
}

export function addPerson(name, phone) {
  return Axios.post(`${gate}/persons?api_token=${token}`, {
    name,
    phone: [phone]
  });
}

export function setOrder(personId, field, order) {
  const req = {};
  req[field] = order;
  return Axios.put(`${gate}/persons/${personId}?api_token=${token}`, req);
}
