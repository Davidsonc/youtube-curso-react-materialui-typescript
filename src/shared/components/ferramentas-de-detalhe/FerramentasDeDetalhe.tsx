import { Box, Button, Icon, Paper, useTheme, Divider} from '@mui/material';

interface IFerramentasDeDetalheProps {

}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        gap={1}
        marginX={1}
        padding={1}
        paddingX={2}
        display='Flex'
        alignItems='center'
        height={theme.spacing(5)}
        component={Paper}
      >
        <Box flex={1} display='flex' gap={1}>

          {true && (
            <Button
              color='primary'
              disableElevation
              variant='contained'
              startIcon={<Icon>save</Icon>}
            >
              Salvar
            </Button>
          )}

          {true && (
            <Button
              color='primary'
              disableElevation
              variant='outlined'
              startIcon={<Icon>save</Icon>}
            >
              Salvar e Voltar
            </Button>
          )}

          {true && (
            <Button
              color='primary'
              disableElevation
              variant='outlined'
              startIcon={<Icon>delete</Icon>}
            >
              Apagar
            </Button>
          )}

          {true && (
            <Button
              color='primary'
              disableElevation
              variant='outlined'
              startIcon={<Icon>add</Icon>}
            >
              Novo
            </Button>
          )}

          <Divider variant='middle' orientation='vertical'/>

          {true && (
            <Button
              color='primary'
              disableElevation
              variant='outlined'
              startIcon={<Icon>arrow_back</Icon>}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};