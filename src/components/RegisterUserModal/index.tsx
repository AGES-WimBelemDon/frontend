import { useRef, useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  type AutocompleteRenderInputParams,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import type { RegisterUserModalProps } from "./interface";
import { strings } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { registerUser as apiRegisterUser, updateUser as apiUpdateUser } from "../../services/users";
import type { Role } from "../../types/filters";
import type { UserEdit, UserRegister } from "../../types/users";

const SUGGESTED_DOMAIN = "wimbelemdon.com.br";

export function RegisterUserModal({ isOpen, closeModal, initialValues }: RegisterUserModalProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { roleOptions } = useFilters();
  const [emailInput, setEmailInput] = useState(initialValues?.email ?? "");
  const editingId = initialValues?.id;

  useEffect(() => {
    if (isOpen) {
      setEmailInput(initialValues?.email ?? "");
    }
  }, [isOpen, initialValues]);

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!formRef.current) return;
    setIsSaving(true);
    try {
      const data = new FormData(formRef.current);
      const name = data.get("name");
      const email = data.get("email");
      const role = data.get("role");

      if (!name || !role || (!editingId && !email)) {
        throw new Error("All fields are required");
      }

      if (editingId !== undefined) {
        const payload: UserEdit = {
          fullName: name as string,
          role: role as Role,
        };
        await apiUpdateUser(editingId, payload);
      } else {
        const payload: UserRegister = {
          name: name as string,
          email: email as string,
          role: role as Role,
        };
        await apiRegisterUser(payload);
      }

      await queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    } catch (err) {
      console.error("Failed to save user", err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: 2,
          backgroundColor: "grey.50",
          width: "100%",
        },
      }}
    >
      <DialogTitle display="flex" alignItems="center" justifyContent="center" position="relative">
        {initialValues ? strings.genericActions.edit : strings.users.registerNew}

        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 2,
            top: "50%",
            transform: "translateY(-90%)",
            color: "primary.main",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" id="registerUserForm" ref={formRef} onSubmit={handleSave} sx={{ mt: 1, display: "grid", gap: 2 }}>
          <TextField
            required
            name="name"
            label={strings.users.inputs.name}
            defaultValue={initialValues?.name ?? ""}
            fullWidth
          />

          {!editingId && (
            <Autocomplete
              freeSolo
              inputValue={emailInput.replaceAll(" ", "")}
              onInputChange={(_, newInput) => setEmailInput(newInput.replaceAll(" ", ""))}
              options={(() => {
                const val = emailInput ?? "";
                if (!val || val.includes("@")) {
                  return [];
                }
                const email = val.replaceAll(" ", "");
                return [`${email}@${SUGGESTED_DOMAIN}`];
              })()}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  required
                  label={strings.users.inputs.email}
                  type="email"
                  name="email"
                  fullWidth
                />
              )}
            />
          )}

          <FormControl fullWidth>
            <InputLabel id="role-label" required>{strings.filters.role.title}</InputLabel>
            <Select
              native={false}
              labelId="role-label"
              id="role"
              name="role"
              required
              defaultValue={initialValues?.role ?? ""}
              label={strings.filters.role.title}
            >
              {roleOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ paddingX: 3 }}>
        <Button variant="contained" type="submit" form="registerUserForm" disabled={isSaving}>
          {initialValues ? strings.genericActions.edit : strings.users.inputs.register}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
