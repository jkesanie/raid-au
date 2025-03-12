import { useSnackbar } from "@/components/snackbar";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@/contexts/keycloak-context";
import { sendInvite } from "@/services/invite";

export default function InviteDialog({
  title,
  open,
  setOpen,
}: {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { prefix, suffix } = useParams();
  const { token } = useKeycloak();
  const snackbar = useSnackbar();

  const [inviteMethod, setInviteMethod] = useState("orcid");

  const [orcid, setOrcid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidOrcid = (orcid: string) =>
    /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(orcid);

  const isValidForm = useMemo(() => {
    if (inviteMethod === "orcid") {
      return isValidOrcid(orcid);
    }
    return false;
  }, [inviteMethod, orcid]);

  const sendInviteMutation = useMutation({
    mutationFn: sendInvite,
    onSuccess: () => {
      snackbar.openSnackbar("✅ Thank you, invite has been sent.");
      setIsLoading(false);
      handleClose();
    },
    onError: () => {
      snackbar.openSnackbar("❌ An error occurred.");
      setIsLoading(false);
      handleClose();
    },
  });

  const handleClose = useCallback(() => {
    setOpen(false);
    setOrcid("");
  }, [setOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    sendInviteMutation.mutate({
      title,
      email: "",
      orcid: orcid,
      handle: `${prefix}/${suffix}`,
      token: token!,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="invite-dialog-title"
      maxWidth="md"
      PaperProps={{ style: { width: "600px", maxWidth: "90vw" } }}
    >
      <DialogTitle id="invite-dialog-title">Invite user to RAiD</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Stack gap={2} alignItems="center">
            <CircularProgress />
            <Typography variant="body2">Sending invite...</Typography>
          </Stack>
        ) : (
          <>
            <FormControl>
              <FormLabel>Invite using</FormLabel>
              <RadioGroup
                row
                value={inviteMethod}
                onChange={(e) => {
                  setInviteMethod(e.target.value);
                  setOrcid("");
                }}
              >
                <FormControlLabel
                  value="orcid"
                  control={<Radio />}
                  label="ORCID"
                />
              </RadioGroup>
            </FormControl>

            <form onSubmit={handleSubmit}>
              <Stack gap={2}>
                {inviteMethod === "orcid" && (
                  <TextField
                    label="Invitee's ORCID ID"
                    size="small"
                    variant="filled"
                    type="text"
                    required={inviteMethod === "orcid"}
                    fullWidth
                    value={orcid}
                    onChange={(e) => setOrcid(e.target.value)}
                    disabled={inviteMethod !== "orcid"}
                    error={inviteMethod === "orcid" && !isValidOrcid(orcid)}
                    helperText={
                      inviteMethod === "orcid"
                        ? "Format: 0000-0000-0000-0000"
                        : ""
                    }
                  />
                )}
              </Stack>
              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  disabled={!isValidForm}
                  autoFocus
                >
                  Invite now
                </Button>
              </DialogActions>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
