import Toast, { ToastProps } from "react-native-toast-message";

export default function Toaster(props: ToastProps) {
  return <Toast position="bottom" {...props} />;
}
