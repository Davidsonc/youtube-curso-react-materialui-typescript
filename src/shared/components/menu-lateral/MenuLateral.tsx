import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
    children?: React.ReactNode;
}
// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
export const MenuLateral:React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent' } onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
            <Avatar src="https://avatars.githubusercontent.com/u/25840395?v=4" sx={{ width: theme.spacing(12), height: theme.spacing(12) }} />
          </Box>

          <Divider/>

          <Box flex={1}>
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary='Página Inicial'/>
              </ListItemButton>
            </List>

          </Box>



        </Box>
      </Drawer>
      <Box height='100mv' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
      
    </>
  );
};