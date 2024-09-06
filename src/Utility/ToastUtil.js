import { Toast } from "primereact/toast";
import { createContext, useContext, useRef } from "react";

const ToastContext = createContext(undefined);

export const ToastContextProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (options) => {
    if (!toastRef.current) return;
    toastRef.current.show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} className="custom-toast"/>
      <div>{children}</div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext have to be used within ToastContextProvider"
    );
  }

  return context;
};
