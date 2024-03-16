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
        this.#data_nascimento = new Date(ano, mes - 1, dia);
        if(this.idade < 13)
            throw new Error("O paciente deve ter pelo menos 13 anos");
    }

    get idade() {
        let atualmente = new Date(Date.now());
        let nascimento = new Date(this.#data_nascimento);
        let anos = atualmente.getFullYear() - nascimento.getFullYear();
        nascimento.setFullYear(atualmente.getFullYear());
        if(nascimento > atualmente) --anos;
        return anos;
    }
}
