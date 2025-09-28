import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../services/users";

export function useUsers() {
  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  return {
    isLoadtingUsers: isPending,
    usersError: error,
    users: data
  }
}