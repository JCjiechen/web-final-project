import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;
axios.defaults.withCredentials = true;
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findModulesForCourse = async (courseId: any) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};

export const createModule = async (courseId: any, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (moduleId: any) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (module: { _id: any }) => {
  const response = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return response.data;
};
