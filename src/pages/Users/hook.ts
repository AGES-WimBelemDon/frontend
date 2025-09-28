import { useRoutes } from "../../hooks/useRoutes";
import { useUsers } from "../../hooks/useUsers";

export function useUsersHook() {
  const { goTo, getPathParamId } = useRoutes();
  const { users, usersError, isLoadtingUsers } = useUsers();

  const userId = getPathParamId("usuarios");
  const user = users?.find(user => user.id === userId);

  return {
    goTo,
    user,
    usersError,
    isLoadtingUsers,
  }

}