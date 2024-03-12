import ValidadorCPF from './validador_cpf.js';

export default class Paciente {
    #cpf
    #nome
    #data_nascimento

    constructor(cpf, nome, data_nascimento) {
        this.cpf = cpf;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
    }

    get cpf() {
        return this.#cpf
    }

    set cpf(cpf) {
        let test = new ValidadorCPF();
        if(!test.testaCPF(cpf))
            throw new Error("O cpf é inválido");
        this.#cpf = cpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(nome) {
        if(nome.length < 5)
            throw new Error("O nome deve conter pelo menos 5 caracteres");
        this.#nome = nome;
    }

    get data_nascimento() {
        return this.#data_nascimento;
    }

    set data_nascimento(data_nascimento) {
        const re = /^\d{2}\/\d{2}\/\d{4}/;
        if(!re.test(data_nascimento))
            throw new Error("A data de nascimento está com formato incorreto");
        const [dia, mes, ano] = data_nascimento.split('/').map(x => parseInt(x));
        return this.#data_nascimento = new Date(ano, mes - 1, dia);
    }

    get idade() {
        let atualmente = new Date(Date.now());
        let anos = Math.floor((atualmente - this.#data_nascimento) / (1000 * 60 * 60 * 24 * 365.25));
        return anos;
    }
}
