const Biblioteca = require("../src/Trabalho01Turma02");

describe('Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    });

    test('Precisa adicionar um livro', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }

        biblioteca.adicionarLivro(livro);
        expect(biblioteca.livros).toContain(livro);
    });

    test('Precisa remover um livro', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }
        
        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);
        expect(biblioteca.livros).not.toContain(livro);
    });

    test('Precisa retornar um livro por ID', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }

        biblioteca.adicionarLivro(livro);
        const retorno = biblioteca.buscarLivroPorId(1);
        expect(retorno).toBe(livro);
    });

    test('Precisa retornar um livro por titulo', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }

        const livro2 = { 
            id: 2, 
            titulo: 'O mistério do 5 estrelas', 
            emprestado: false
        }

        biblioteca.adicionarLivro(livro);
        biblioteca.adicionarLivro(livro2);
        const retorno = biblioteca.buscarLivroPorTitulo('O mistério do 5 estrelas');
        expect(retorno).toContain(livro2);
    });

    test('Precisa retornar todos os livros', () => {
        const livros = [
            { 
                id: 1, 
                titulo: '50 Tons de cinza', 
                emprestado: false
            },
            { 
                id: 2, 
                titulo: 'O mistério do 5 estrelas', 
                emprestado: false
            }
        ]

        biblioteca.adicionarLivro(livros[0]);
        biblioteca.adicionarLivro(livros[1]);
        const retorno = biblioteca.listarLivros();
        expect(retorno).toStrictEqual(livros);
    });

    test('Precisa adicionar um membro', () => {
        const membro = { 
            id: 1, 
            nome: 'Leandro'
        }

        biblioteca.adicionarMembro(membro);
        expect(biblioteca.membros).toContain(membro);
    });

    test('Precisa remover um membro', () => {
        const membro = { 
            id: 1,
            nome: 'Leandro'
        }
        
        biblioteca.adicionarMembro(membro);
        biblioteca.removerMembro(1);
        expect(biblioteca.membros).not.toContain(membro);
    });

    test('Precisa retornar um membro por ID', () => {
        const membro = { 
            id: 1, 
            nome: 'Leandro'
        }

        const membro2 = { 
            id: 2, 
            nome: 'Bruno'
        }

        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarMembro(membro2);
        const retorno = biblioteca.buscarMembroPorId(2);
        expect(retorno).toBe(membro2);
    });

    test('Precisa retornar todos os membros', () => {
        const membros = [
            { 
                id: 1, 
                nome: 'Leandro',
            },
            { 
                id: 2, 
                nome: 'Bruno'
            }
        ]

        biblioteca.adicionarMembro(membros[0]);
        biblioteca.adicionarMembro(membros[1]);
        const retorno = biblioteca.listarMembros();
        expect(retorno).toStrictEqual(membros);
    });

    test('Precisa emprestar um livro', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }

        const membro = { 
            id: 1, 
            nome: 'Leandro'
        }

        biblioteca.adicionarLivro(livro);
        biblioteca.adicionarMembro(membro);
        const retornoMetodo = biblioteca.emprestarLivro(1, 1)
        const retornoLivro = biblioteca.buscarLivroPorId(1);

        expect(retornoMetodo).toBeTruthy();
        expect(retornoLivro.emprestado).toBeTruthy();
        expect(retornoLivro.idMembro).toBe(1);
    })

    test('Não pode emprestar um livro já emprestado', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false,
        }

        const membro = { 
            id: 1, 
            nome: 'Leandro'
        }

        const membro2 = { 
            id: 2, 
            nome: 'Bruno'
        }

        biblioteca.adicionarLivro(livro);
        biblioteca.adicionarMembro(membro);
        biblioteca.emprestarLivro(1, 1)
        biblioteca.buscarLivroPorId(1);

        const retornoMetodo = biblioteca.emprestarLivro(1, 1)
        const retornoLivro = biblioteca.buscarLivroPorId(1);
        expect(retornoMetodo).toBeFalsy();
        expect(retornoLivro.emprestado).toBeTruthy();
        expect(retornoLivro.idMembro).toBe(1);
    })

    test('Precisa devolver um livro', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }

        const membro = { 
            id: 1, 
            nome: 'Leandro'
        }

        biblioteca.adicionarLivro(livro);
        biblioteca.adicionarMembro(membro);
        biblioteca.emprestarLivro(1, 1)

        const retornoMetodo = biblioteca.devolverLivro(1);
        const retornoLivro = biblioteca.buscarLivroPorId(1);

        expect(retornoMetodo).toBeTruthy();
        expect(retornoLivro.emprestado).toBeFalsy();
        expect(retornoLivro.idMembro).toBe(undefined);
    })

    test('Não pode devolver um livro que não foi emprestado', () => {
        const livro = { 
            id: 1, 
            titulo: '50 Tons de cinza', 
            emprestado: false
        }

        const membro = { 
            id: 1, 
            nome: 'Leandro'
        }

        biblioteca.adicionarLivro(livro);
        biblioteca.adicionarMembro(membro);

        const retornoMetodo = biblioteca.devolverLivro(1);

        expect(retornoMetodo).toBeFalsy();
    })

    test('Precisa listar apenas os livros emprestados', () => {
        const livrosEmprestados = [
            {
                id: 1,
                titulo: '50 Tons de cinza',
                emprestado: true,
                idMembro:1
            },
            {
                id:2,
                titulo: 'Senhor dos Anéis - As duas torres',
                emprestado: true,
                idMembro:1
            }            
        ]

        const livroDisponivel = {
            id: 3,
            titulo: 'O mistério do 5 estrelas',
            emprestado: false
        }

        biblioteca.adicionarLivro(livrosEmprestados[0])
        biblioteca.adicionarLivro(livrosEmprestados[1])
        biblioteca.adicionarLivro(livroDisponivel)

        const retorno = biblioteca.listarLivrosEmprestados();
        expect(retorno).toStrictEqual(livrosEmprestados)
    })

    test('Precisa listar apenas os livros disponíveis', () => {
        const livrosEmprestados = [
            {
                id: 1,
                titulo: '50 Tons de cinza',
                emprestado: true,
                idMembro:1
            },
            {
                id:2,
                titulo: 'Senhor dos Anéis - As duas torres',
                emprestado: true,
                idMembro:1
            }            
        ]

        const livrosDisponiveis = [
            {
                id: 3,
                titulo: 'O mistério do 5 estrelas',
                emprestado: false
            }
        ]

        biblioteca.adicionarLivro(livrosEmprestados[0])
        biblioteca.adicionarLivro(livrosEmprestados[1])
        biblioteca.adicionarLivro(livrosDisponiveis[0])

        const retorno = biblioteca.listarLivrosDisponiveis();
        expect(retorno).toStrictEqual(livrosDisponiveis)
    })

    test('Precisa contar os livros adicionados', () => {
        const livros = [
            {
                id: 1,
                titulo: '50 Tons de cinza',
                emprestado: true,
                idMembro:1
            },
            {
                id:2,
                titulo: 'Senhor dos Anéis - As duas torres',
                emprestado: true,
                idMembro:1
            }            
        ]

        biblioteca.adicionarLivro(livros[0]);
        biblioteca.adicionarLivro(livros[1]);

        const retorno = biblioteca.contarLivros();
        expect(retorno).toBe(2);
    });

    test('Precisa contar os membros adicionados', () => {
        const membros = [
            { 
                id: 1, 
                nome: 'Leandro'
            },
            {
                id:2,
                nome:'Bruno'
            }
        ]

        biblioteca.adicionarMembro(membros[0]);
        biblioteca.adicionarMembro(membros[1]);

        const retorno = biblioteca.contarMembros();
        expect(retorno).toBe(2);
    });
});