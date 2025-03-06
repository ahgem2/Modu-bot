
import { type ToastProps, type ToastActionElement } from "@/components/ui/toast"

type ToastOptions = Omit<ToastProps, "id"> & {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Track toasts locally since this is just a wrapper
const toasts: { [id: string]: ToastOptions } = {}

export function useToast() {
  function toast(options: ToastOptions) {
    const id = options.id || crypto.randomUUID()
    toasts[id] = { ...options, id }
    // This would normally trigger a toast, but we're using a simplified version
    console.log(`Toast shown: ${options.title}`)
    return id
  }

  return {
    toast,
    toasts: Object.values(toasts),
    dismiss: (toastId: string) => {
      delete toasts[toastId]
    },
  }
}

// Standalone toast function for use outside of components
export const toast = (options: ToastOptions) => {
  const id = options.id || crypto.randomUUID()
  toasts[id] = { ...options, id }
  console.log(`Toast shown: ${options.title}`)
  return id
}
