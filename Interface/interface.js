import readline from 'readline-sync';
import Consultorio from '../Consultorio/consultorio.js';

export default class Interface {
    #consultorio

    constructor() {
        this.#consultorio = new Consultorio();
    }

    menuPrincipal() {
        while(true) {
            console.log('\nMenu Principal');
            console.log('1-Cadastro de pacientes');
            console.log('2-Agenda');
            console.log('3-Fim');

            let opcao = readline.question('');

            if(opcao == '1')
                this.cadastroDePacientes();
            else if(opcao == '2')
                this.agenda();
            else if(opcao == '3')
                break;
            else
                console.log('comando inválido');
        }
    }

    cadastroDePacientes() {
        console.clear();

        while(true) {
            console.log('\nMenu do Cadastro de Pacientes');
            console.log('1-Cadastrar novo paciente');
            console.log('2-Excluir paciente');
            console.log('3-Listar pacientes (ordenado por CPF)');
            console.log('4-Listar pacientes (ordenado por nome)');
            console.log('5-Voltar p/ menu principal');

            let opcao = readline.question('');
            
            if(opcao == '1')
                this.cadastrarNovoPaciente();
            else if(opcao == '2')
                this.excluirPaciente();
            else if(opcao == '3')
                this.listarPacientesCPF();
            else if(opcao == '4')
                this.listarPacientesNome();
            else if(opcao == '5')
                break;
            else
                console.log('comando inválido');
        }
    }

    agenda() {
        console.clear();

        while(true) {
            console.log('\nAgenda');
            console.log('1-Agendar consulta');
            console.log('2-Cancelar agendamento');
            console.log('3-Listar agenda');
            console.log('4-Voltar p/ menu principal');

            let opcao = readline.question('');

            if(opcao == '1')
                this.agendarConsulta();   
            else if(opcao == '2')
                this.cancelarAgendamento();
            else if(opcao == '3')
                this.listarAgenda();
            else if(opcao == '4')
                break;
            else
                console.log('comando inválido');
        }
    }

    cadastrarNovoPaciente() {
        console.clear();

        while(true) {
            try {
                let cpf = readline.question('\nCPF: ');
                let nome = readline.question('Nome: ');
                let data_nascimento = readline.question('data_nascimento: ');
                this.#consultorio.cadastrarPaciente(cpf, nome, data_nascimento);
                console.log('\nPaciente cadastrado com sucesso!');
                break;
            } catch(e) {
                console.error(`\nErro: ${e.message}`);
            }
        }
    }

    excluirPaciente() {
        console.clear();

        while(true) {
            try {
                let cpf = readline.question('\nCPF: ');
                this.#consultorio.removerPaciente(cpf);
                console.log('\nPaciente excluído com sucesso!');
                break;
            } catch(e) {
                console.error(`\nErro: ${e.message}`);
            }
        }
    }

    listarPacientesCPF() {
        console.clear();

        let pacientes = this.#consultorio.listaPacientes();

        pacientes.sort((a, b) => {
            if(a.cpf < b.cpf) return -1;
            else if(a.cpf > b.cpf) return 1;
            return 0;
        });

        console.log('---------------------------------------------------------------');

        let maxNomeLength = pacientes.reduce((a, b) => a.nome.length < b.nome.length ? b : a, pacientes[0])?.nome?.length ?? 0;
     
        console.log('CPF        ', 'Nome'.padEnd(maxNomeLength), ' Dt.Nasc.', 'Idade');

        for(const paciente of pacientes) {
            const consulta = this.#consultorio.agenda.consultaDoPaciente(paciente.cpf);

            console.log(`${paciente.cpf} ${paciente.nome.padEnd(maxNomeLength)} ${paciente.data_nascimento.toLocaleDateString()} ${paciente.idade.toString().padEnd(4)}`);

            if(consulta != undefined) {
                let data_consulta = consulta.data_inicial;
                console.log(`            agendada para: ${data_consulta.toLocaleDateString()}`);
                console.log(`            ${data_consulta.toLocaleTimeString().substr(0, 5)}`);
            }
        }
    }

    listarPacientesNome() {
        console.clear();

        let pacientes = this.#consultorio.listaPacientes();

        pacientes.sort((a, b) => {
            if(a.nome < b.nome) return -1;
            else if(a.nome > b.nome) return 1;
            return 0;
        });

        console.log('---------------------------------------------------------------------------------------------------------');

        let maxNomeLength = pacientes.reduce((a, b) => a.nome.length < b.nome.length ? b : a, pacientes[0])?.nome?.length ?? 0;
     
        console.log('CPF        ', 'Nome'.padEnd(maxNomeLength), ' Dt.Nasc.', 'Idade');

        for(const paciente of pacientes) {
            const consulta = this.#consultorio.agenda.consultaDoPaciente(paciente.cpf);

            console.log(`${paciente.cpf} ${paciente.nome.padEnd(maxNomeLength)} ${paciente.data_nascimento.toLocaleDateString()} ${paciente.idade.toString().padEnd(4)}`);

            if(consulta != undefined) {
                let data_consulta = consulta.data_inicial;
                console.log(`            agendada para: ${data_consulta.toLocaleDateString()}`);
                console.log(`            ${data_consulta.toLocaleTimeString().substr(0, 5)}`);
            }
        }
    }

    agendarConsulta() {
        console.clear();

        while(true) {
            try {
                let cpf = readline.question('\nCPF: ');
                let data = readline.question('Data da consulta: ');
                let horario_inicial = readline.question('Hora inicial: ');
                let horario_final = readline.question('Hora final: ');
                this.#consultorio.agendarConsulta(cpf, data, horario_inicial, horario_final);
                console.log('Agendamento realizado com sucesso!');
                break;
            } catch(e) {
                console.error(`\nErro: ${e.message}`);
            }
        }
    }

    cancelarAgendamento() {
        console.clear();

        while(true) {
            try {
                let cpf = readline.question('\nCPF: ');
                let data = readline.question('Data da consulta: ');
                let horario_inicial = readline.question('Hora inicial: ');
                this.#consultorio.cancelarConsulta(cpf, data, horario_inicial);
                console.log('Agendamento cancelado com sucesso!');
                break;
            } catch(e) {
                console.error(`\nErro: ${e.message}`);
            }
        }
    }

    listarAgenda() {
        console.clear();

        const getData = (data) => data.toLocaleDateString();

        const getHora = (data) => data.toLocaleTimeString().substr(0, 5);

        const getTempo = (data_inicial, data_final) => {
            let segundos = Math.floor((data_final - data_inicial) / 1000);
            let minutos = Math.floor(segundos % (60 * 60) / 60).toString();
            let horas = Math.floor(segundos / (60 * 60)).toString();
            if(minutos.length == 1) minutos = '0' + minutos;
            if(horas.length == 1) horas = '0' + horas;
            return `${horas}:${minutos}`;
        };

        while(true) {
            let opcao = readline.question('Apresentar a agenda T-Toda ou P-Periodo: ');

            let consultas = this.#consultorio.agenda.consultas;

            consultas.sort((a, b) => a.data_inicial - b.data_inicial);

            if(opcao == 'P') {
                let data_inicial = readline.question('Data inicial: ');
                let data_final = readline.question('Data final: ');

                if(!/\d{2}\/\d{2}\/\d{4}/.test(data_inicial)) {
                    console.log('a data inicial está com o formato incorreto');
                    continue;
                } else if(!/\d{2}\/\d{2}\/\d{4}/.test(data_final)) {
                    console.log('a data final está com o formato incorreto');
                    continue;
                }

                const [dia_ini, mes_ini, ano_ini] = data_inicial.split('/').map(x => parseInt(x));
                const [dia_fim, mes_fim, ano_fim] = data_final.split('/').map(x => parseInt(x));

                let dateInicial = new Date(ano_ini, mes_ini - 1, dia_ini);
                let dateFinal = new Date(ano_fim, mes_fim - 1, dia_fim);

                consultas = consultas.filter(consulta => {
                    let date = new Date(consulta.data_inicial.toDateString());
                    return date >= dateInicial && date <= dateFinal;
                });
            } else if (opcao != 'T'){
                console.log('opção inválida');
                continue;
            }

            let maxNomeLength = 0;
            for(let i = 0; i < consultas.length; ++i)
                maxNomeLength = Math.max(maxNomeLength, this.#consultorio.getPaciente(consultas[i].cpf).nome.length);

            console.log('---------------------------------------------------------------------------------------------------');
            console.log('Data       H.Ini H.Fim Tempo', 'Nome'.padEnd(maxNomeLength), ' Dt.Nasc.');
            
            for(let i = 0; i < consultas.length; ++i) {
                const {cpf, data_inicial, data_final} = consultas[i];

                const paciente = this.#consultorio.getPaciente(cpf);

                if(i == 0 || getData(data_inicial) != getData(consultas[i - 1].data_inicial))
                    console.log(getData(data_inicial), getHora(data_inicial), getHora(data_final), getTempo(data_inicial, data_final), paciente.nome.padEnd(maxNomeLength), getData(paciente.data_nascimento));
                else
                    console.log('          ', getHora(data_inicial), getHora(data_final), getTempo(data_inicial, data_final), paciente.nome.padEnd(maxNomeLength), getData(paciente.data_nascimento));
            }

            break;
        }
    }
}
