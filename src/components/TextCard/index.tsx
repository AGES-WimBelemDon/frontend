import HomeIcon from '@mui/icons-material/Home';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';  
import type { ThemeStyle, TextCard } from './interface';

const themeStyle: Record<ThemeStyle, object> = {
  light: { backgroundColor: 'primary.main', color: 'secondary.main' },  
  dark: { backgroundColor: 'secondary.main', color: 'primary.main' }, 
};

export function TextCard({ title, theme, onClick }: TextCard) {
  return (
    <Card
      sx={{
        ...themeStyle[theme],
        borderWidth: 2,  
        borderRadius: 2,  
        borderStyle: 'solid',  
        borderColor: 'secondary.main',  
        height: 125,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <CardActionArea sx={{height: '100%'}} onClick={onClick}>
        <CardContent >
          <HomeIcon fontSize="large" />
          <Typography
            sx={{fontWeight: 'bold' }}
            variant={'h5'}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
