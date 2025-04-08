import { ErrorDialogContext } from "@/components/error-dialog";
import { Alert, AlertTitle, Dialog } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";

interface ErrorDialogStateInterface {
  open: boolean;
  content: string[];
  duration?: number;
}

/**
 * Context provider for displaying application-wide error dialogs
 * 
 * Provides methods to show error messages in a standardized dialog format
 * throughout the application using React Context.
 * 
 * @param {React.ReactNode} children - Child components that will have access to error dialog context
 * @returns {JSX.Element} Provider component with dialog UI and context
 */
export const ErrorDialogProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [errorDialogState, setErrorDialogState] =
    useState<ErrorDialogStateInterface>({
      open: false,
      content: [],
      duration: 0,
    });

  const openErrorDialog = React.useCallback(
    (content: string[], duration: number = 3000) => {
      setErrorDialogState({ open: true, content, duration });
    },
    []
  );

  const closeErrorDialog = React.useCallback(() => {
    setErrorDialogState((prev) => ({ ...prev, open: false }));
  }, []);

  const contextValue = React.useMemo(
    () => ({ openErrorDialog, closeErrorDialog }),
    [openErrorDialog, closeErrorDialog]
  );

  return (
    <ErrorDialogContext.Provider value={contextValue}>
      <Dialog onClose={closeErrorDialog} open={errorDialogState.open}>
        <Alert variant="outlined" severity="error">
          <AlertTitle>Error</AlertTitle>
          <ul>
            {errorDialogState.content.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </Alert>
      </Dialog>
      {children}
    </ErrorDialogContext.Provider>
  );
};
