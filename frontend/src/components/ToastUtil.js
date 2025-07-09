import React from 'react'
import toast from 'react-hot-toast';
export const showSuccess=(message="Operation Success")=>{
     toast.success(message);
}
export const showError=(message="Operation Failed")=>{
     toast.success(message);
}

