
import { type ToastProps, type ToastActionElement } from "@/components/ui/toast"
import { 
  useToast as useToastPrimitive,
  toast as toastPrimitive
} from "@radix-ui/react-toast"

type ToastOptions = Omit<ToastProps, "id"> & {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export function useToast() {
  const { toast: show, ...rest } = useToastPrimitive()

  function toast(options: ToastOptions) {
    show({
      ...options,
      id: options.id || crypto.randomUUID(),
    })
  }

  return {
    toast,
    ...rest,
  }
}

export { toastPrimitive as toast }
