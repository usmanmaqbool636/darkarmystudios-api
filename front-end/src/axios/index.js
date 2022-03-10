import axios from "axios"

// const axiosInstance = axios.create({
//   baseURL: "http://192.168.100.6:4050/api"
// }) 

// export default axiosInstance

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://192.168.100.6:4050/api'

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
} 
axiosClient.interceptors.response.use(function (response) {
  //Dispatch any action on success
  return response
}, function (error) {
    // TODO handle proper error
    console.log(error)
    if (error.response) {
      if (error.response.status === 401) {
        // TODO clear localstorage do something because token expired
        window.location.href = '/login'
        console.log("unauthorized")
        
      }
      console.log("error.response =>", error.response)
      return Promise.reject("error.response => message")
      // client received an error response (5xx, 4xx)
    } else if (error.request) {
      console.log("error.request =>", error.request)
      console.log("np responce from the erver")
      return Promise.reject("error.request => message")
      // client never received a response, or request never left
    } else {
      console.log("error Else =>", error)
      // anything else
    }

  return Promise.reject("error some erro from the server")
})

// axiosClient.defaults.withCredentials = true 

export default axiosClient