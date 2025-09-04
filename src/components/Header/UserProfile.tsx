import { AccountCircle } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';

import { pt } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { loginWithGoogle, logout } from '../../services/auth.firebase';

export function UserProfile() {
  const { user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const actionLabel = user ? pt.header.profileLogout : pt.header.profileLogin;

  async function handleSignIn() {
    try {
      await loginWithGoogle();
    } catch {
      // TODO: Handle sign in error visually
    }
  }

  async function handleSignOut() {
    try {
      await logout();
      navigate('/');
    } catch {
      // TODO: Handle sign out error visually
    }
  }

  return (
    <Tooltip title={actionLabel}>
      <IconButton
        aria-label={actionLabel}
        data-cy="header-profile-button"
        onClick={user ? handleSignOut : handleSignIn}
        loading={isLoadingAuth}
        disabled={isLoadingAuth}
      >
        <AccountCircle
          sx={{
            fontSize: { xs: 30, md: 40 },
          }}
          color="primary"
        />
      </IconButton>
    </Tooltip>
  );
}
