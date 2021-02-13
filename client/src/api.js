import Axios from 'axios'

const publicFetch=Axios.create({
    baseURL:process.env.REACT_APP_API_URL
})
publicFetch.interceptors.response.use(function (response) {
   
    return response;
  }, function (error) {
   if(401===error.response.status)
   {
       window.location('/')
   }
    return Promise.reject(error);
  });
export default publicFetch;