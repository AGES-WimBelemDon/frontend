import type { FormEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { registerUser as apiRegisterUser, enableUser, disableUser } from "../../services/users";
import type { UserResponse } from "../../types/users";


export function useUsersPage() {
  const { users, usersError, isLoadingUsers } = useUsers();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  function isUserActive(user: UserResponse): boolean {
    return user.status === "ATIVO";
  }

  function userStatusToString(user: UserResponse): string {
    if (!isUserActive(user)) {
      return strings.filters.userStatus.inactive;
    }
    return strings.filters.userStatus.active;
  }

  async function registerUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    await apiRegisterUser({ email, name });
    await queryClient.invalidateQueries({ queryKey: ["users"] });
    (event.currentTarget as HTMLFormElement).reset();
  }

  async function toggleUser(user: UserResponse) {
    try {
      if (isUserActive(user)) {
        await disableUser(user.id);
        showToast(strings.users.toasts.disabled, "success");
      } else {
        await enableUser(user.id);
        showToast(strings.users.toasts.enabled, "success");
      }
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch {
      showToast(strings.users.toasts.toggleError, "error", true);
    }
  }

  return {
    users,
    usersError,
    isLoadingUsers,
    registerUser,
    toggleUser,
    isUserActive,
    userStatusToString,
  }
}
