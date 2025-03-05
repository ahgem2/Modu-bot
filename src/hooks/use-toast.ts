
// Re-export the toast from the UI components
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@radix-ui/react-toast";
import { createContext, useContext, useCallback } from "react";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const ToastContext = createContext<{
  toasts: ToasterToast[];
  addToast: (toast: Omit<ToasterToast, "id">) => void;
  updateToast: (toast: ToasterToast) => void;
  dismissToast: (toastId: string) => void;
} | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    const toasts: ToasterToast[] = [];
    
    const addToast = (toast: Omit<ToasterToast, "id">) => {
      console.log("Adding toast:", toast);
    };
    
    const updateToast = (toast: ToasterToast) => {
      console.log("Updating toast:", toast);
    };
    
    const dismissToast = (toastId: string) => {
      console.log("Dismissing toast:", toastId);
    };
    
    return {
      toasts,
      addToast,
      updateToast,
      dismissToast,
      toast: (props: Omit<ToasterToast, "id">) => {
        addToast(props);
      },
    };
  }

  const { toasts, addToast, updateToast, dismissToast } = context;

  return {
    toasts,
    addToast,
    updateToast,
    dismissToast,
    toast: useCallback(
      (props: Omit<ToasterToast, "id">) => {
        addToast(props);
      },
      [addToast]
    ),
  };
}

export const toast = (props: Omit<ToasterToast, "id">) => {
  // This is a fallback for when the hook isn't available
  console.log("Toast:", props);
};
