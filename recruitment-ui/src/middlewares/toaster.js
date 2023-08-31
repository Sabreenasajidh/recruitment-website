import {  toast } from 'react-toastify';

const successToast = (message)=>{
    toast.success(`🦄${message}` , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
  });
}

const errorToast = (message)=>{
    toast.error(`🦄${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
export default {successToast,errorToast}