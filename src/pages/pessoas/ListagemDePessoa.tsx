import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PessoasService } from '../../shared/services/pessoas/PessoasService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';



export const ListagemDePessoa: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { deBounce } =  useDebounce(3000);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    deBounce(() => {
      PessoasService.getAll( 1, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
            return;
          }
          console.log(result);
        });
    });

  }, [busca]);

  
  return (
    <LayoutBaseDePagina
      titulo='Listagem de Pessoas'
    >
      <FerramentasDaListagem
        mostrarInputBusca
        textoDaBusca={busca}
        textoBotaoNovo='Nova'
        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto}, {replace: true})}
      />
    </LayoutBaseDePagina>
  );
};
