export interface Ilogin {
  username: string;
  password: string;
}
export interface Ipayload {
  [prop: string]: any
}
export interface IData {
  [propName: string]: any;
}
export interface HttpResponse {
  code?: number
  messageInfo?: string
  messageKey?: string
  data: {
    [prop: string]: any
  }
}
type Imeta = {
  [propName: string]: any;
}
export interface routesType {
  path: string,//路由路径
  exact?: boolean,
  component?: React.LazyExoticComponent,
  children?: any[]
  element?: any,
  redirect?: string,
  title?: string,
  render?: () => any,
  auth?: string | boolean,
  meta?: Imeta
}