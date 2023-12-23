import { http } from '@/axios';
import axios from 'axios';

const searchDocument = async (suggestTerm) => {
  return await axios.get(`${process.env.REACT_APP_API_URL2}/suggest?q=${suggestTerm}`);
};

const getDocumentBySearch = async (searchTerm) => {
  return await axios.get(`${process.env.REACT_APP_API_URL2}/search?q=${searchTerm}`);
};

const postSearchHistory = async (info) => {
  return await http.post('history-create', info);
};

const getHistory = async (info) => {
  return await http.post('history', info);
};

export { searchDocument, getDocumentBySearch, postSearchHistory, getHistory };
