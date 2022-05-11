import React from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";

const Login: React.FC = () => <div> 这里是login页  点击跳转 <Button type="link"><Link to={'/BasicLayout/Home'}>
go home
</Link></Button> </div>;

export default Login;