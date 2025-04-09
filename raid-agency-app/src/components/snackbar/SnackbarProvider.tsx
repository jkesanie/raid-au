import { SnackbarContext } from "@/components/snackbar";
import { Snackbar } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";

interface SnackbarStateInterface {
  open: boolean;
  content: string;
  duration?: number;
}

/**
 * Context provider for displaying toast notifications
 * 
 * Provides methods to show temporary notifications with customizable duration
 * throughout the application using React Context.
 * 
 * @param {React.ReactNode} children - Child components that will have access to snackbar context
 * @returns {JSX.Element} Provider component with snackbar UI and context
 */
export const SnackbarProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarStateInterface>({
    open: false,
    content: "",
    duration: 0,
  });

  const openSnackbar = React.useCallback(
    (content: string, duration: number = 3000) => {
      setSnackbarState({ open: true, content, duration });
    },
    []
  );

  const closeSnackbar = React.useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  const contextValue = React.useMemo(
    () => ({ openSnackbar, closeSnackbar }),
    [openSnackbar, closeSnackbar]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={snackbarState.duration}
        onClose={closeSnackbar}
        message={snackbarState.content}
        sx={{ opacity: 0.8 }}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
