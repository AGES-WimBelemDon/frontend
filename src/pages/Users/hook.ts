import { useRoutes } from "../../hooks/useRoutes";
import { useUsers } from "../../hooks/useUsers";

export function useUsersPage() {
  const { goTo } = useRoutes();
  const { users, usersError, isLoadingUsers } = useUsers();

  return {
    goTo,
    users,
    usersError,
    isLoadingUsers,
  }
}
