import { Button, Paper, Stack, Typography } from '@mui/material';

import { pt } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { loginWithGoogle, logout } from '../../services/auth.firebase';

export default function UserProfile() {
  const { user, isLoadingAuth } = useAuth();

  async function handleSignIn() {
    try {
      await loginWithGoogle();
    } catch {
      // TODO: Handle sign in error visually
    }
  };

  if (isLoadingAuth) {
    return <Typography>{pt.techDemo.children.profile.loading}</Typography>;
  }

  if (!user) {
    return (
      <Stack spacing={1}>
        <Typography>{pt.techDemo.children.profile.noUser}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
        >
          {pt.techDemo.children.profile.signInGoogle}
        </Button>
      </Stack>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="h6">{pt.techDemo.children.profile.title}</Typography>
        <Typography>{ user.email ? pt.techDemo.children.profile.email({ email: user.email }) : pt.techDemo.children.profile.noEmail }</Typography>
        <Typography>{ user.displayName ? pt.techDemo.children.profile.name({ name: user.displayName }) : pt.techDemo.children.profile.noName }</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={logout}
        >
          {pt.techDemo.children.profile.signOut}
        </Button>
      </Stack>
    </Paper>
  );
}
