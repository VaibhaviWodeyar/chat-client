import AxioInstance from "../../api/AxiosInstance";
const AllBatches = async token => {

    let config = { 
      headers  :  {
        Authorization: `Bearer ${token}`,
      }
     };
    const { data } = await AxioInstance.get("admin/batchList?", config);
    return data;
  };



  // const SelectedBatch = async (token) => {
  //   let config = { 
  //     headers  :  {
  //       Authorization: `Bearer ${token}`,
  //     }
  //    };
  //   let {data} =  await AxioInstance.get(`admin/batchList/${batchCode}}`,config);
  //   // const { data } = await AxioInstance.get("admin/batchList?", config);
  //    return data;
  // };


const CreateBatch = async (batchData , token) => {
    console.log(CreateBatch)
     let config = { 
      headers:{
        Authorization: `Bearer ${token}`,
      }
     };
    const { data } = await AxioInstance.post("admin/createbatch", batchData , config);
     return data;
  };

  const batchService = {
    AllBatches,
    CreateBatch,
   }

  export default batchService;