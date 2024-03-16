import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListagemPessoa, PessoasService } from '../../shared/services/pessoas/PessoasService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import { useDebounce } from '../../shared/hooks';

export const ListagemDePessoa: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { deBounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || 1);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    deBounce(() => {
      PessoasService.getAll(pagina, busca.trim())
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
            return;
          }
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        });
    });

  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    PessoasService.deleteById(id)
      .then((result) => {
        if (result instanceof Error) {
          alert(`Erro: ${result.message}`);
        } else {
          setRows(oldRows => [
            ...oldRows.filter(oldRow => oldRow.id !== id),
          ]);
          alert('Registro excluído com sucesso!');
        }
      });
  };


  return (
    <LayoutBaseDePagina
      titulo='Listagem de Pessoas'
    >
      <FerramentasDaListagem
        mostrarInputBusca
        textoDaBusca={busca}
        textoBotaoNovo='Nova'
        aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1'}, { replace: true })}
      />

      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}
          <TableFooter>
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(event, newPage) => setSearchParams({ busca, pagina: newPage.toString()}, { replace: true })}
                  />  
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
