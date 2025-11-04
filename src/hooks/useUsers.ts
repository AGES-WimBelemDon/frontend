import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services/users";
import type { GetUsersParams } from "../types/users";

export function useUsers(params?: GetUsersParams) {
  const { isPending, error, data } = useQuery({
    queryKey: ["users", params ?? {}],
    queryFn: () => getUsers(params ?? {}),
  })

  return {
    isLoadingUsers: isPending,
    usersError: error,
    users: data
  }
}
