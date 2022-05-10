import React from 'react';
import { loadData } from '../store/features/movieSlice'
import { useAppDispatch } from '../hooks';
function Register() {
 const dispatch = useAppDispatch();
 return (
    <div>
        <button onClick={()=>dispatch(loadData())}>查询</button>
    </div>
  );
}
export default Register;