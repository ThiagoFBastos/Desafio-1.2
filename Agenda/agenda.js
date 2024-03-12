import Paciente from '../Paciente/paciente.js';

export default class Agenda {
    #consultas

    constructor() {
        this.#consultas = [];
    }

    consultaDoPaciente(cpf) {
        const now = Date.now();
        return this.#consultas.find(c => c.cpf == cpf && c.data_inicial > now);
    }

    existeConsultaSobreposta(data_inicial, data_final) {
        return this.#consultas.find(c => Math.max(data_inicial, c.data_inicial) < Math.min(data_final, c.data_final)) != undefined;
    }

    removeConsultasDoPaciente(cpf) {
        if(this.consultaDoPaciente(cpf) != undefined)
            throw new Error("O paciente possui consulta marcada e por isso não pode ser excluído");
        this.#consultas = this.#consultas.filter(c => c.cpf != cpf);
    }

    incluiConsulta(cpf, data_inicial, data_final) {
        if(this.consultaDoPaciente(cpf) != undefined)
            throw new Error("O paciente já possui uma consulta no futuro");
        
        if(this.existeConsultaSobreposta(data_inicial, data_final))
            throw new Error("A consulta se sobrepõe a outra consulta já marcada");

        this.#consultas.push({
            cpf: cpf,
            data_inicial: data_inicial,
            data_final: data_final
        });
    }

    cancelaConsulta(cpf, data_inicial) {
        this.#consultas = this.#consultas.filter(c => !(c.cpf == cpf && c.data_inicial.getTime() == data_inicial.getTime()));
    }

    get consultas() {
        return this.#consultas;
    }
}
