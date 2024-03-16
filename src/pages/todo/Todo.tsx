import { useCallback, useEffect, useState } from 'react';

import { IListagemTarefa, TarefasService } from '../../shared/services/tarefas/TarefasService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const Todo: React.FC = () => {
  const [lista, setLista] = useState<IListagemTarefa[]>([]);

  useEffect(() => {
    TarefasService.getAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(`Erro: ${result.message}`);
          return;
        } else {
          setLista(result.data);
        }
      });
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      e.currentTarget.value = '';
      if (lista.some((listItem) => listItem.title === value)) return;

      TarefasService.create({ title: value, isCompleted: false, })
        .then((result) => {
          if (result instanceof Error) {
            alert(`Erro: ${result.message}`);
          } else {
            setLista((oldList) => {
              return [
                ...oldList,
                {
                  id: result,
                  title: value,
                  isCompleted: false,
                }
              ];
            });
          }
        });
    }
  }, [lista]);

  const handleDelete = useCallback((id: number) => {

    TarefasService.deleteById(id)
      .then((result) => {
        if (result instanceof Error) {
          alert(`Erro: ${result.message}`);
        } else {
          setLista(oldLista => {
            return oldLista.filter(oldListItem => oldListItem.id !== id);
          });
        }
      });
  }, []);

  const handleToggleComplete = useCallback((id: number) => {
    const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id);
    if (!tarefaToUpdate) return;

    TarefasService.updateById(id, {
      ...tarefaToUpdate,
      isCompleted: !tarefaToUpdate.isCompleted
    })
      .then((result) => {
        if (result instanceof Error) {
          alert(`Erro: ${result.message}`);
        } else {
          setLista(oldLista => {
            return oldLista.map(oldListItem => {
              const newIsCompleted = oldListItem.id === id ? !oldListItem.isCompleted : oldListItem.isCompleted;

              return {
                ...oldListItem,
                isCompleted: newIsCompleted,
              };
            });
          });
        }
      });
  }, [lista]);


  const completedItems = lista.filter((listItem) => listItem.isCompleted);
  return (
    <LayoutBaseDePagina
      titulo='Tarefas'
    >
      <FerramentasDaListagem
      />
      <div style={{ marginLeft: '20px' }}>
        <p>Lista</p>
        <input onKeyDown={handleInputKeyDown} />
        <ul>
          {lista.map((listItem) => {
            return <li key={listItem.id}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(listItem.id)}
              >
                <DeleteIcon />
              </IconButton>

              <input
                type='checkbox'
                checked={listItem.isCompleted}
                onChange={() => handleToggleComplete(listItem.id)}
              />

              <span style={{ marginLeft: '10px' }}>{listItem.title}</span>



            </li>;
          })}
        </ul>
        {completedItems.length > 0 && <p>{completedItems.length}</p>}
      </div>
    </LayoutBaseDePagina>
  );
};
