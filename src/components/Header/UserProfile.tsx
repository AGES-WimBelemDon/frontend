import { IconButton, Tooltip } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';
import { loginWithGoogle, logout } from '../../services/auth.firebase';
import { useNavigate } from 'react-router';

export function UserProfile() {
  const { user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const actionLabel = user ? 'Sign out' : 'Sign in with Google';

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
