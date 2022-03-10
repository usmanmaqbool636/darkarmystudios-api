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
  return response.data
}, function (error) {
    // TODO handle proper error
    if (error.response) {
      if (error.response.status === 401) {
        console.log("unauthorized")
        localStorage.clear()
        window.location.href = '/login'
        
      }
      console.log("error.response =>", error.response)
      return Promise.reject(error.response.data)
      // client received an error response (5xx, 4xx)
    } else if (error.request) {
      console.log("error.request =>", error.request)
      console.log("np responce from the server")
      return Promise.reject({    
          success: false,
          data: {},
          message: "No respoce from the server",
          status: 504
      })
      // client never received a response, or request never left
    } else {
      return Promise.reject({    
        success: false,
        data: {},
        message: "something went wronge",
        status: 504
    })
    }

  // return Promise.reject("error some erro from the server")
})

// axiosClient.defaults.withCredentials = true 

export default axiosClient