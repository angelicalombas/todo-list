import { fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import App from './App';


describe('testando App.tsx, quando: ', () => {
  test('adiciono uma tarefa a mesma aparece no DOM e o input é limpo', () => {
    //Renderiza o que será testado
    render(<App />);

    //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
    const input = screen.getByPlaceholderText('Tarefa');

    //encontrar o botão
    const botao = screen.getByRole('button', { name: 'Adicionar' });

    //Digita a tarefa
    fireEvent.change(input, {
      target: {
        value: 'TarefaTeste'
      }
    });

    // clicar no botão de submeter
    fireEvent.click(botao);

    //Valida se a tarefa foi incluida
    expect(screen.getByText('TarefaTeste')).toBeInTheDocument();

    //valida se o input não não tem mais valor
    expect(input).toHaveValue("");

  });

  test('quando adiciono uma tarefa vazia e é apresentado um alerta', () => {

    //Renderiza o que será testado
    render(<App />);

    //Mock do alert (tirei esssa parte .mockImplementation(() => { });)
    jest.spyOn(window, 'alert');

    //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
    screen.getByPlaceholderText('Tarefa');

    //encontrar o botão
    const botao = screen.getByRole('button', { name: 'Adicionar' });

    // clicar no botão de submeter
    fireEvent.click(botao);

    //Valida se o alert mostra a mensagem correta
    expect(window.alert).toBeCalledWith("Por favor, digite algo no campo 'Tarefa'");

  });

  test('quando tento adicionar uma tarefa já existente e é apresentado um alerta', () => {

    //Renderiza o que será testado
    render(<App />);

    //Mock do alert (tirei esssa parte .mockImplementation(() => { });)
    jest.spyOn(window, 'alert');

    //encontrar no DOM o input - getByPlaceholderText busca nos Placeholder da pag o texto informado
    const input = screen.getByPlaceholderText('Tarefa');

    //encontrar o botão
    const botao = screen.getByRole('button', { name: 'Adicionar' });

    //Digita a tarefa
    fireEvent.change(input, {
      target: {
        value: 'TarefaTeste'
      }
    })
    // clicar no botão de submeter
    fireEvent.click(botao);

    //Digita a tarefa duplicada
    fireEvent.change(input, {
      target: {
        value: 'TarefaTeste'
      }
    })
    // clicar no botão de submeter
    fireEvent.click(botao);

    //Valida se o alert mostra a mensagem correta
    expect(window.alert).toBeCalledWith("Você já adicionou essa tarefa");

  });

  test('quando excluo uma tarefa e ela sai do DOM', () => {

    render(<App />);

    const input = screen.getByPlaceholderText('Tarefa');
    const botaoAdd = screen.getByRole('button', { name: 'Adicionar' });
    fireEvent.change(input, {
      target: {
        value: 'Tarefa1'
      }
    });
    fireEvent.click(botaoAdd);

    //encontra o botão e texto
    const botao = screen.getByRole('button', { name: 'Deletar' })
    const texto = screen.getByText('Tarefa1')

    // clicar no botão de deletar
    fireEvent.click(botao)

    //Verifica se o botão e o texto sumiram da tela
    expect(botao).not.toBeInTheDocument()
    expect(texto).not.toBeInTheDocument()

  });

})

