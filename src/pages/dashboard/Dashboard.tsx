import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
  
  return (
    <LayoutBaseDePagina
      titulo='Página Inicial'
      ferramentasDaListagem={(
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo='Novo'
        />
      )}
    >
      testando
    </LayoutBaseDePagina>
  );
};  