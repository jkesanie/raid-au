import { isValidNumber } from "@/utils/string-utils/string-utils";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { memo, useCallback } from "react";

interface AnchorButtonProps {
  itemKey: string;
  label: string;
  count?: number | null;
  hasError?: boolean;
}

export const AnchorButton = memo(
  ({ itemKey, label, count, hasError }: AnchorButtonProps) => {
    const handleClick = useCallback(() => {
      const element = document.getElementById(itemKey);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }, [itemKey]);

    return (
      <Grid item xs={4} sm={6} md={3}>
        <Button
          onClick={handleClick}
          size="small"
          variant="outlined"
          fullWidth
          sx={{
            width: "100%",
            borderLeftStyle: "solid",
            borderLeftColor: hasError ? "error.main" : "secondary.main",
            borderLeftWidth: 3,
            overflow: "hidden",
            textTransform: "none",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 32,
            "&:hover": {
              borderLeftWidth: 3,
            },
          }}
        >
          <Typography variant="caption" noWrap>
            {label}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {count !== undefined && isValidNumber(count) && (
              <Chip
                label={count || 0}
                size="small"
                color="primary"
                sx={{ fontSize: 10, height: 20, minWidth: 20 }}
              />
            )}
          </Box>
        </Button>
      </Grid>
    );
  }
);

AnchorButton.displayName = "AnchorButton";
