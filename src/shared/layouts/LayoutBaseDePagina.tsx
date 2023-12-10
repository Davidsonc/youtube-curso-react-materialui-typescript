import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';
import PropTypes from 'prop-types';

interface ILayoutBaseDePaginaProps {
   children: React.ReactNode;
   titulo: string;
   ferramentasDaListagem?: React.ReactNode | undefined;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ( {children, titulo, ferramentasDaListagem} ) => {
  
  LayoutBaseDePagina.propTypes = {
    children: PropTypes.node.isRequired,
    ferramentasDaListagem: PropTypes.node,
    titulo: PropTypes.string.isRequired,
  };
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1} >
      <Box padding={1} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}  >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {titulo}
        </Typography>
      </Box>

      {ferramentasDaListagem && (
        <Box>
          {ferramentasDaListagem}
        </Box>
      )}

      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};  
