import {toast, ToastContainer, ToastPosition} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Theme, TypeOptions} from "react-toastify/dist/types";
import {ReactNode} from "react";

type NotificationProps = {
  message: string
  position?: ToastPosition
  type?: TypeOptions
  icon?: ReactNode
}
export const notification = (config: NotificationProps) => {
  const theme = localStorage.getItem('theme') as Theme
  const {position = 'top-right', message, type, icon} = config
  return toast(message, {position, type, theme: theme || 'dark', icon, autoClose: 2000})
}
export const Notification = () => {
  return <ToastContainer position={'bottom-center'} limit={3}/>
};
