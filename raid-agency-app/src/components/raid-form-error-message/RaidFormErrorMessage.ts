import { Failure } from "./";

/**
 * Utility for processing and displaying form validation errors
 * 
 * This component handles parsing error messages from various sources
 * and displaying them through the application's error dialog system.
 * It supports both API validation errors (with failure objects) and
 * client-side validation errors.
 * 
 * The component attempts to parse the error message as JSON, and then
 * extracts relevant failure information from common error response formats.
 * If parsing fails, it treats the message as a plain string error.
 * 
 * @param {Error} error - The error object containing validation messages
 * @param {Function} openErrorDialog - Function to display errors in UI dialog
 *                   This parameter should ideally be typed with the proper interface
 *                   for the error dialog component
 * @returns {void}
 * @throws {Error} Rethrows the error after displaying it with concatenated messages
 */
export const RaidFormErrorMessage = (
  error: Error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openErrorDialog: any
): void => {
  const message: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let messageParsed: any;

  try {
    messageParsed = JSON.parse(error.message);
  } catch (parseError) {
    // If parsing fails, handle the error message as a plain string
    message.push(error.message);
    console.log("error.message", JSON.stringify(error.message));
    messageParsed = null;
  }

  if (messageParsed) {
    if (messageParsed.failures) {
      messageParsed.failures.forEach((failure: Failure) => {
        message.push(`${failure.fieldId}: ${failure.message}`);
      });
    } else if (messageParsed.title) {
      message.push(messageParsed.title);
    } else {
      message.push("An error occurred.");
    }
  }
  openErrorDialog(message);
  throw new Error(message.join(", "));
};

RaidFormErrorMessage.displayName = "RaidFormErrorMessage";
