import axios from 'axios';
const baseUrl = '/api/persons';

  const getAll = () => {
      return axios.get(baseUrl);
  }
    
  const create = (newObject) => {
      return axios
        .post(baseUrl, newObject)
        .then(response => response.data);
  }

  const updateContact = (updatedContact) => {
    return axios
        .put(baseUrl + '/' + updatedContact.id, updatedContact)
        .then(response => response.data);
  }

  const deleteContact = (id) => {
    return axios
        .delete(baseUrl + '/' +id)
        .then(response => response.data);
  }

  export default {getAll, create, deleteContact, updateContact};

