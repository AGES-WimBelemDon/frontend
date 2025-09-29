import { Typography } from "@mui/material";

import { useUsersHook } from "./hook";
import { PageTitle } from "../../components/PageTitle";
import { pt } from "../../constants";

export default function Users() {
  const { users, isLoadingUsers, usersError } = useUsersHook();

  if (isLoadingUsers) {
    return <Typography>{pt.users.loadingUsers}</Typography>;
  }

  if (usersError) {
    return <Typography>{pt.users.usersError}</Typography>;
  }

  return (
    <>
      <PageTitle title={pt.users.title} dataCy="users-page-title" />
      {users?.map((user) => (
        <Typography key={user.id}>{user.full_name} ({user.email})</Typography>
      ))}
    </>
  );
}
