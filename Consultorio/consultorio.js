import Paciente from '../Paciente/paciente.js';
import Agenda from '../Agenda/agenda.js';

export default class Consultorio {
    #pacientes
    #agenda

    constructor() {
        this.#agenda = new Agenda();
        this.#pacientes = new Map();
    }

    cadastrarPaciente(cpf, nome, data_nascimento) {
        let paciente = new Paciente(cpf, nome, data_nascimento);

        if(this.#pacientes.has(cpf))
            throw new Error("Já existe um paciente com o CPF informado");

        this.#pacientes.set(cpf, paciente);
    }

    removerPaciente(cpf) {
        this.#agenda.removeConsultasDoPaciente(cpf);
        this.#pacientes.delete(cpf);
    }

    agendarConsulta(cpf, data, horario_inicial, horario_final) {
        if(!this.#pacientes.has(cpf))
            throw new Error("O paciente não está cadastrado");

        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(data))
            throw new Error("A data não está com o formato correto");

        if(!/^\d{4}$/.test(horario_inicial))
            throw new Error("A hora inicial está com o formato incorreto");

        if(!/^\d{4}$/.test(horario_final))
            throw new Error("A hora final está com o formato incorreto");

        const [dia, mes, ano] = data.split('/').map(v => parseInt(v));
        const hora_inicial = parseInt(horario_inicial.substr(0, 2)), minuto_inicial = parseInt(horario_inicial.substr(2, 4));
        const hora_final = parseInt(horario_final.substr(0, 2)), minuto_final = parseInt(horario_final.substr(2, 4));

        if(minuto_inicial % 15 != 0)
            throw new Error("O horário inicial não está de acordo com a regra dos 15 minutos");

        if(minuto_final % 15 != 0)
            throw new Error("O horário final não está de acordo com a regra dos 15 minutos");

        const horario_consultorio_inicial = new Date(ano, mes - 1, dia, 8, 0), horario_consultorio_final = new Date(ano, mes - 1, dia, 19, 0);

        const data_inicial = new Date(ano, mes - 1, dia, hora_inicial, minuto_inicial), data_final = new Date(ano, mes - 1, dia, hora_final, minuto_final);

        if(data_final <= data_inicial)
            throw new Error("O horário final não pode ser menor ou igual ao horário inicial");

        if(data_inicial <= Date.now())
            throw new Error("A data da consulta deve acontecer no futuro");

        if(data_inicial < horario_consultorio_inicial || data_final > horario_consultorio_final)
            throw new Error("O horário da consulta não está dentro do intervalo em que o consultório fica aberto");

        this.#agenda.incluiConsulta(cpf, data_inicial, data_final);
    }

    cancelarConsulta(cpf, data, horario_inicial) {
        if(!this.#pacientes.has(cpf))
            throw new Error("O paciente não está cadastrado");

        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(data))
            throw new Error("A data não está com o formato correto");

        if(!/^\d{4}$/.test(horario_inicial))
            throw new Error("A hora inicial está com o formato incorreto");

        const [dia, mes, ano] = data.split('/').map(v => parseInt(v));
        const hora_inicial = parseInt(horario_inicial.substr(0, 2)), minuto_inicial = parseInt(horario_inicial.substr(2, 4));
        const data_inicial = new Date(ano, mes - 1, dia, hora_inicial, minuto_inicial);

        if(data_inicial <= Date.now())
            throw new Error("A consulta para ser desmarcada deve acontecer no futuro");

        const consulta = this.#agenda.consultaDoPaciente(cpf);

        if(consulta == undefined || consulta.data_inicial.getTime() != data_inicial.getTime())
            throw new Error("Não existe consulta marcada para esse horário");

        this.#agenda.cancelaConsulta(cpf, data_inicial);
    }

    listaPacientes() {
        let resultado = [];
        for(let paciente of this.#pacientes.values())
            resultado.push(paciente);
        return resultado;
    }

    getPaciente(cpf) {
        return this.#pacientes.get(cpf);
    }

    get agenda() {
        return this.#agenda;
    }
}
