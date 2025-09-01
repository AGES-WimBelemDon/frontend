import HomeIcon from '@mui/icons-material/Home';
import { CardActionArea, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import type { ThemeStyle, TextCard } from './interface';
import { theme } from '../../styles/theme';

const themeStyle: Record<ThemeStyle, object> = {
  light: { backgroundColor: theme.palette.primary.main, border: `2px solid ${theme.palette.secondary.main}`  },
  dark: { backgroundColor: theme.palette.secondary.main, border: `2px solid ${theme.palette.primary.main}` },
};

export function TextCard({ title, theme, onClick }: TextCard) {
  return theme === 'light' ? (
    <Card
      sx={{
        ...themeStyle[theme],
        maxWidth: 375,
        borderRadius: 2,
        height: 125,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <CardActionArea sx={{height: '100%'}}>
        <CardContent onClick={onClick}>
          <HomeIcon sx={{ color: '#0E6872' }} fontSize="large" />
          <Typography
            sx={{ color: '#0E6872', fontWeight: 'bold' }}
            variant={'h5'}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card
      sx={{
        ...themeStyle[theme],
        maxWidth: 375,
        borderRadius: 2,
        height: 125,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <CardActionArea sx={{height: '100%'}}>
        <CardContent onClick={onClick}>
          <HomeIcon sx={{ color: 'white' }} fontSize="large" />
          <Typography
            sx={{ color: 'white', fontWeight: 'bold' }}
            variant={'h5'}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
