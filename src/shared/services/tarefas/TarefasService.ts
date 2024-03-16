import { Environment } from '../../environment';
import { Api } from '../axios-config';

export interface IListagemTarefa {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface IDetalheTarefa {
  id: number;
  title: string;
  isCompleted: boolean;
}

type TTarefa = {
  data: IListagemTarefa[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TTarefa | Error> => {
  try {
    const urlRelativa = `/tarefas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&title_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalheTarefa | Error> => {
  try {
    const { data } = await Api.get(`/tarefas/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheTarefa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheTarefa>('/tarefas', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheTarefa): Promise<void | Error> => {
  try {
    await Api.put(`/tarefas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/tarefas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const TarefasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};