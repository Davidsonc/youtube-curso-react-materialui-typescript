import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { PessoasService } from '../../shared/services/pessoas/PessoasService';
import { VForm, VTextField, useVform } from '../../shared/forms';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose} = useVform();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            formRef.current?.setData(result);

          }
        });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: ''
      });
    }
  }, [id, navigate]);

  const handleSave = (dados: IFormData) => {
    if (id === 'nova') {
      setIsLoading(true);
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);
          
          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
          } else {
            //alert('Registro atualizado com sucesso!');
            if (isSaveAndClose()) {
              navigate('/pessoas');
            } else {
              navigate(`/pessoas/detalhe/${result}`);
            }
          }
        });
    } else {
      setIsLoading(true);
      PessoasService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);
          
          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
          } else {
            //alert('Registro atualizado com sucesso!');
            if (isSaveAndClose()) {
              navigate('/pessoas');
            }
          }
        });
    }
  };
  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir o registro?')) {
      PessoasService.deleteById(id)
        .then((result) => {
          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
          } else {
            alert('Registro excluído com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='nomeCompleto'
                  disabled={isLoading}
                  label='Nome completo'
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='email'
                  label='Email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Cidade'
                  name='cidadeId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};