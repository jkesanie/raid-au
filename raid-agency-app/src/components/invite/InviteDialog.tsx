import { useSnackbar } from "@/components/snackbar";
import {
  Button,
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
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
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
  const [email, setEmail] = useState("john.doe@ardc-raid.testinator.com");
  const [orcid, setOrcid] = useState("0000-0000-0000-0000");
  const snackbar = useSnackbar();
  const { token } = useKeycloak();

  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
  };

  const sendInviteMutation = useMutation({
    mutationFn: sendInvite,
    onSuccess: (data) => {
      snackbar.openSnackbar(`✅ Thank you, invite has been sent.`);
    },
    onError: (error) => {
      snackbar.openSnackbar(`❌ An error occurred.`);
    },
  });

  const resetForm = useCallback(() => {
    setEmail("@ardc-raid.testinator.com");
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    resetForm();
  }, [setOpen, resetForm]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let emailFinalValue = email;
    let orcidFinalValue = orcid;

    if (value === "email") {
      orcidFinalValue = "";
    }

    if (value === "orcid") {
      emailFinalValue = "";
    }

    sendInviteMutation.mutate({
      title,
      email: emailFinalValue,
      orcid: orcidFinalValue,
      handle: `${prefix}/${suffix}`,
      token: token!,
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="invite-dialog-title"
        aria-describedby="invite-dialog-description"
        maxWidth="md"
        PaperProps={{
          style: {
            width: "600px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogTitle id="invite-dialog-title">Invite user to RAiD</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Invite using
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel
                value="orcid"
                control={<Radio />}
                label="ORCID"
              />
            </RadioGroup>
          </FormControl>
          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              <TextField
                label="Invitee's Email"
                size="small"
                variant="filled"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={value === "" || value === "orcid"}
              />
              <TextField
                label="Invitee's ORCID ID"
                size="small"
                variant="filled"
                type="text"
                helperText="Format: 0000-0000-0000-0000"
                required
                fullWidth
                value={orcid}
                onChange={(e) => setOrcid(e.target.value)}
                disabled={value === "" || value === "email"}
              />
            </Stack>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" autoFocus>
                Invite now
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
