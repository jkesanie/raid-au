import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const searchAPI = async (query: string) => {
  const response = await fetch(
    `https://api.ror.org/organizations?query=${query}`
  );
  return response.json();
};

export default function OrganisationLookupDialog({
  open,
  setOpen,
  setSelectedValue,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedValue: (value: string | null) => void;
}) {
  const [query, setQuery] = useState("");
  const searchMutation = useMutation({
    mutationFn: searchAPI,
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    searchMutation.mutate(query);
  };

  const handleListItemClick = (item: any) => {
    setOpen(false);
    setSelectedValue(item.id);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      PaperProps={{
        style: {
          width: "600px",
          maxWidth: "90vw",
        },
      }}
    >
      <DialogTitle>Lookup ROR by name</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSearch}>
          <Stack gap={2} alignItems={"flex-start"} direction={"row"}>
            <TextField
              label="Search"
              placeholder="Search for an organisation / city"
              size="small"
              variant="filled"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" disabled={searchMutation.isPending}>
              {searchMutation.isPending ? "Searching..." : "Search"}
            </Button>
          </Stack>
        </form>
        <List>
          {searchMutation.data?.items
            ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
            .map((item: any, index: number) => {
              return (
                <ListItemButton
                  key={index}
                  onClick={() => handleListItemClick(item)}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.country.country_name} | ${
                      item?.links && item.links.length > 0 ? item.links[0] : ""
                    }`}
                  />
                </ListItemButton>
              );
            })}
        </List>
      </DialogContent>
    </Dialog>
  );
}
