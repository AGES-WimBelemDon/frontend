import { Typography } from "@mui/material";

import { useUsersPage } from "./hook";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";

export default function Users() {
  const { users, isLoadingUsers, usersError } = useUsersPage();

  if (isLoadingUsers) {
    return <Typography>{strings.users.loadingUsers}</Typography>;
  }

  if (usersError) {
    return <Typography>{strings.users.usersError}</Typography>;
  }

  return (
    <>
      <PageTitle title={strings.users.title} dataCy="users-page-title" />
      {users?.map((user) => (
        <Typography key={user.id}>{user.full_name} ({user.email})</Typography>
      ))}
    </>
  );
}
