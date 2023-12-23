import { http } from '@/axios/index';

const uploadFile = async (formData) => {
  return await http.post(`upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { uploadFile };
