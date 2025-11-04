import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { strings } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { registerUser, enableUser, disableUser } from "../../services/users";
import type { UserResponse, GetUsersParams } from "../../types/users";


export function useUsersPage() {
  const [filters, setFilters] = useState<GetUsersParams>({});
  const { users, usersError, isLoadingUsers } = useUsers(filters);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { roleOptions, userStatusOptions } = useFilters();
  const { isMobile, isDesktop } = useScreenSize();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  function openCreateModal() {
    setEditingUser(null);
    setIsModalOpen(true);
  }

  function openEditModal(user: UserResponse) {
    setEditingUser(user);
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingUser(null);
    setIsModalOpen(false);
  }

  function isUserActive(user: UserResponse): boolean {
    return user.status === "ATIVO";
  }

  function userStatusToString(user: UserResponse): string {
    if (!isUserActive(user)) {
      return strings.filters.userStatus.inactive;
    }
    return strings.filters.userStatus.active;
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

  function setFilter(newFilters: Partial<GetUsersParams>) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }

  return {
    users,
    usersError,
    isLoadingUsers,
    registerUser,
    toggleUser,
    isUserActive,
    userStatusToString,
    openCreateModal,
    isModalOpen,
    closeModal,
    editingUser,
    openEditModal,
    isMobile,
    isDesktop,
    roleOptions,
    userStatusOptions,
    filters,
    setFilter,
  }
}
