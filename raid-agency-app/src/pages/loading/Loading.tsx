import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
} from "@mui/material";

import { AppNavBar } from "@/components/app-nav-bar";
export const Loading = ({
  cardTitle,
  cardSubheader,
}: {
  cardTitle?: string;
  cardSubheader?: string;
}) => {
  return (
    <>
      <AppNavBar authenticated={false} />
      <Container>
        <Card>
          <CardHeader
            title={cardTitle || "Loading..."}
            subheader={cardSubheader || "Please wait..."}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
