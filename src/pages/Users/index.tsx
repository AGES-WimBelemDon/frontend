import { Typography } from "@mui/material";

import { PageTitle } from "../../components/PageTitle";
import { pt } from "../../constants";

export default function Users() {
  
  return (
    <>
      <PageTitle title={pt.users.title} dataCy="users-page-title" />
      <Typography>{pt.users.description}</Typography>
    </>
  );
}
