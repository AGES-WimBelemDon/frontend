import BookIcon from '@mui/icons-material/Book';
import { Card, CardActionArea, CardContent, Typography, type SxProps, type Theme } from '@mui/material';
  
import type { ThemeStyle, TextCard } from './interface';
import { pt } from '../../constants';

const themeStyle: Record<ThemeStyle, SxProps<Theme>> = {
  light: { backgroundColor: 'background.paper', color: 'primary.main' },
  dark: { backgroundColor: 'primary.main', color: 'primary.contrastText' },
};

export function TextCard({ title, theme, onClick }: TextCard) {
  return (
    <Card
      sx={{
        ...themeStyle[theme],
        borderWidth: 2,
        borderRadius: 2,
        borderStyle: 'solid',
        borderColor: 'primary.main',
        height: 125,
        display: 'flex',
        width: { xs: '100%', sm: 300 },
      }}
    >

      <CardActionArea
        sx={{ height: '100%' }}
        onClick={onClick}
        aria-label={pt.textCard.exploreHome}
        data-cy="text-card-button"
      >
        <CardContent>
          <BookIcon fontSize="large" />
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h5"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
