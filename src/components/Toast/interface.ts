import type { AlertProps, SnackbarProps } from "@mui/material";

export type ToastState = {  
  isOpen: SnackbarProps["open"],  
  message: string,  
  severity: NonNullable<AlertProps["severity"]>,  
  closable?: boolean  
};
