import { http } from '@/axios/index';

const getDocument = async (pageNumber) => {
  return await http.get(`page/${pageNumber}`);
};
const getTopHits = async () => {
  return await http.get(`top-hit`);
};
export { getDocument, getTopHits };
