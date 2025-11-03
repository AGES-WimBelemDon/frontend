import {
  Block as BlockIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
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
} from "@mui/material";

import { useUsersPage } from "./hook";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import type { UserResponse } from "../../types/users";
import { getUserStatusDisplay, isUserActive } from "../../types/users";

export default function Users() {
  const {
    users,
    isLoadingUsers,
    usersError,
    registerUser,
    toggleUser,
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
      
      <Box
        component="form"
        onSubmit={registerUser}
        width="100%"
        gap={3}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h6" component="h2">
          {strings.users.registerNew}
        </Typography>

        <FormControl fullWidth required variant="outlined">
          <InputLabel htmlFor="name">{strings.users.inputs.name}</InputLabel>
          <OutlinedInput
            id="name"
            name="name"
            label={strings.users.inputs.name}
            placeholder={strings.users.inputs.namePlaceholder}
            inputProps={{
              "data-cy": "create-user-name",
              "aria-required": true,
            }}
          />
        </FormControl>

        <FormControl fullWidth required variant="outlined">
          <InputLabel htmlFor="email">{strings.users.inputs.email}</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            label={strings.users.inputs.email}
            placeholder={strings.users.inputs.emailPlaceholder}
            inputProps={{
              inputMode: "email",
              "data-cy": "create-user-email",
              "aria-required": true,
            }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-cy="create-user-submit"
          sx={{ alignSelf: "flex-start" }}
        >
          {strings.users.inputs.register}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="users table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                }}
              >
                {strings.users.table.name}
              </TableCell>
              <TableCell>{strings.users.table.email}</TableCell>
              <TableCell>{strings.users.table.status}</TableCell>
              <TableCell>{strings.users.table.role}</TableCell>
              <TableCell
                sx={{
                  position: "sticky",
                  right: 0,
                  zIndex: 2,
                }}
                align="right"
              >
                {strings.users.table.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user: UserResponse) => (
              <TableRow key={user.id} hover>
                <TableCell
                  sx={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    backgroundColor: "background.paper",
                  }}
                >
                  {user.fullName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={strings.users.status[getUserStatusDisplay(user.status)]}
                    color={isUserActive(user.status) ? "success" : "default"}
                    variant={isUserActive(user.status) ? "filled" : "outlined"}
                  />
                </TableCell>
                <TableCell>{user.role ?? "-"}</TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    right: 0,
                    zIndex: 2,
                  }}
                  align="right"
                >
                  <Box sx={{ display: "inline-flex", gap: 0.5 }}>
                    <Tooltip title={strings.personCard.editButton} placement="top" arrow>
                      <span>
                        <IconButton size="small" aria-label={strings.personCard.editButton} disabled>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    {isUserActive(user.status) ? (
                      <Tooltip title={strings.users.actions.deactivate} placement="top" arrow>
                        <IconButton size="small" color="warning" aria-label={strings.users.actions.deactivate} onClick={() => toggleUser(user)}>
                          <BlockIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title={strings.users.actions.activate} placement="top" arrow>
                        <IconButton size="small" color="success" aria-label={strings.users.actions.activate} onClick={() => toggleUser(user)}>
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
              <TableCell colSpan={5} align="right" sx={{ fontSize: 12, color: "text.secondary" }}>
                {(() => {
                  const total = (users?.length ?? 0).toLocaleString();
                  const now = new Date();
                  const updatedAt = now.toLocaleString();
                  return `${strings.users.footer.showing({ count: total, total })} • ${strings.users.footer.updatedAt({ when: updatedAt })}`;
                })()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
