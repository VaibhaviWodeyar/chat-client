import AxioInstance from "../../api/AxiosInstance";

//get request
let UsersBatchList = async (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await AxioInstance.get("users/batches", config);
  return data;
};

const userBatchListService = {
  UsersBatchList,
};

export default userBatchListService;
