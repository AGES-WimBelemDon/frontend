import { useRoutes } from "../../hooks/useRoutes";
import { useUsers } from "../../hooks/useUsers";

export function useUsersHook() {
  const { goTo } = useRoutes();
  const { users, usersError, isLoadingUsers } = useUsers();

  return {
    goTo,
    users,
    usersError,
    isLoadingUsers,
  }
}
