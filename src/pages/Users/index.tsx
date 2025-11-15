import {
  Block as BlockIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { useUsersPage } from "./hook";
import { PageTitle } from "../../components/PageTitle";
import { RegisterUserModal } from "../../components/RegisterUserModal";
import { strings } from "../../constants";
import type { UserResponse } from "../../types/users";

export default function Users() {
  const {
    users,
    isLoadingUsers,
    usersError,
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
  } = useUsersPage();

  if (isLoadingUsers) {
    return <Typography>{strings.users.loadingUsers}</Typography>;
  }

  if (usersError) {
    return <Typography>{strings.users.usersError}</Typography>;
  }

  return (
    <>
      <PageTitle title={strings.users.title} dataCy="users-page-title" />
      
      <Box gap={3} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h2">{strings.users.registerNew}</Typography>
          <Button variant="contained" color="primary" onClick={openCreateModal} data-cy="open-create-user">
            {strings.users.inputs.register}
          </Button>
        </Box>
        <Box gap={2} display="grid" gridTemplateColumns="6fr 4fr">
          <FormControl size="small">
            <InputLabel id="role-filter-label">{strings.filters.role.title}</InputLabel>
            <Select
              labelId="role-filter-label"
              id="role-filter"
              value={filters.role ?? ""}
              label={strings.filters.role.title}
              onChange={(e) => setFilter({ role: e.target.value ?? undefined })}
              inputProps={{ "data-cy": "role-filter" }}
            >
              <MenuItem value="">{strings.filters.all}</MenuItem>
              {roleOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="status-filter-label">{strings.filters.userStatus.title}</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={filters.status ?? ""}
              label={strings.filters.userStatus.title}
              onChange={(e) => setFilter({ status: e.target.value ?? undefined })}
              inputProps={{ "data-cy": "status-filter" }}
            >
              <MenuItem value="">{strings.filters.all}</MenuItem>
              {userStatusOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper} sx={{ backgroundColor: "background.default" }}>
          <Table size="small" aria-label="users table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: "sticky", left: 0, zIndex: 5, backgroundColor: "background.default" }}>
                  {strings.users.table.name}
                </TableCell>
                <TableCell>{strings.users.table.email}</TableCell>
                <TableCell>{strings.users.table.status}</TableCell>
                <TableCell>{strings.users.table.role}</TableCell>
                <TableCell sx={{ position: "sticky", right: 0, zIndex: 5, backgroundColor: "background.default" }} align="right">
                  {strings.users.table.actions}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: UserResponse) => (
                <TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "background.paper" } }}>
                  <TableCell sx={{ position: "sticky", left: 0, zIndex: 3, backgroundColor: "background.default", "tr:hover &": { backgroundColor: "background.paper" } }}>
                    {user.fullName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={userStatusToString(user)}
                      color={isUserActive(user) ? "success" : "default"}
                      variant={isUserActive(user) ? "filled" : "outlined"}
                    />
                  </TableCell>
                  <TableCell>{strings.filters.role[user.role]}</TableCell>
                  <TableCell sx={{ position: "sticky", right: 0, zIndex: 4, backgroundColor: "background.default", "tr:hover &": { backgroundColor: "background.paper" } }} align="right">
                    <Box sx={{ display: "inline-flex", gap: 0.5 }}>
                      <Tooltip title={strings.genericActions.edit} placement="top" arrow>
                        <span>
                          <IconButton size="small" aria-label={strings.genericActions.edit} onClick={() => openEditModal(user)} sx={{ bgcolor: "background.default" }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      {isUserActive(user) ? (
                        <Tooltip title={strings.users.actions.deactivate} placement="top" arrow>
                          <IconButton size="small" color="warning" aria-label={strings.users.actions.deactivate} onClick={() => toggleUser(user)} sx={{ bgcolor: "background.default" }}>
                            <BlockIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title={strings.users.actions.activate} placement="top" arrow>
                          <IconButton size="small" color="success" aria-label={strings.users.actions.activate} onClick={() => toggleUser(user)} sx={{ bgcolor: "background.default" }}>
                            <CheckCircleOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell colSpan={4} sx={{ position: "sticky", right: 0, zIndex: 7, backgroundColor: "background.default", whiteSpace: "nowrap", pr: 2 }} align={isMobile ? "center" : "right"}>
                  {(() => {
                    const total = (users?.length ?? 0).toLocaleString();
                    const showing = `${strings.users.footer.showing({ count: total, total })}`;
                    const now = new Date();
                    const updatedAt = `${strings.users.footer.updatedAt({ when: now.toLocaleString() })}`;
                    if (isDesktop) {
                      return `${showing} • ${updatedAt}`;
                    }
                    return showing;
                  })()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>

      <RegisterUserModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        initialValues={editingUser ? { name: editingUser.fullName, email: editingUser.email, role: editingUser.role } : undefined}
      />
    </>
  );
}
