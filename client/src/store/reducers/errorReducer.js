import { toast } from 'react-toastify';

const initState = {
    error: null,
  };
  
  export function errorReducer(state = initState, action) {
    const { error } = action;
  
    if (error || error==='') {
      if(error.length>0)
        toast.error(error);
      return {
        error: error,
      };
    }
  
    return state;
  }