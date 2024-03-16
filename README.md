# Desafio 1.2
Desafio de Administração da Agenda de um Consultório Odontológico

## Instalação
- insira: npm install no terminal

## Execução
- insira no terminal: node index.js

## Descrição

Desenvolver uma aplicação console em Javascript para administrar a agenda de um consultório
odontológico. As funcionalidades da aplicação estão definidas a seguir e os layouts da interface
com o usuário estão definidos no final deste documento.

## Funcionalidades
1. CPF deve ser válido (vide Anexo A).
2. O nome do usuário deve ter pelo menos 5 caracteres.
3. A data de nascimento deve ser fornecida no formato DD/MM/AAAA.
4. Caso algum dado seja inválido, deve ser apresentada uma mensagem de erro e o dado
deve ser solicitado novamente.
5. Não podem existir dois pacientes com o mesmo CPF.
6. O dentista não atende crianças, logo o paciente deve ter 13 anos ou mais no momento do
cadastro (data atual).

## Exclusão de pacientes do cadastro: é necessário fornecer o CPF.
1. Um paciente com uma consulta agendada futura não pode ser excluído.
2. Se o paciente tiver uma ou mais consultas agendadas passadas, ele pode ser excluído.
Nesse caso, os respectivos agendamentos também devem ser excluídos.

## Agendamento de uma consulta: são necessários CPF do paciente, data da consulta, hora inicial e hora final.
1. CPF deve existir no cadastro.
2. A data da consulta deve ser fornecida no formato DD/MM/AAAA.
3. Hora inicial e final devem ser fornecidos no formato HHMM (padrão brasileiro).
4. O agendamento deve ser para um período futuro: data da consulta > data atual ou (data da
consulta = data atual e hora inicial > hora atual).
5. Hora final > hora inicial.
6. Cada paciente só pode realizar um agendamento futuro por vez (os agendamentos
passados não podem ser usados nessa verificação).
7. Não pode haver agendamentos sobrepostos.
8. As horas inicial e final são definidas sempre de 15 em 15 minutos. Assim, são válidas
horas como 1400, 1730, 1615, 1000 e 0715. Por outro lado, não são válidas horas como
1820, 1235, 0810 e 1950.
9. O horário de funcionamento do consultório é das 8:00h às 19:00h, logo os horários de
agendamento não podem sair desses limites.

## Listagem dos Pacientes
1. A listagem de pacientes deve ser apresentada conforme o layout definido no final desse
documento e pode estar ordenada de forma crescente por CPF ou nome, à escolha do
usuário.
2. Se o paciente possuir um agendamento futuro, os dados do agendamento devem ser
apresentados abaixo dos dados do paciente.

## Listagem da Agenda
1. A listagem da agenda deve ser apresentada conforme o layout definido no final desse
documento e deve estar ordenada de forma crescente por data e hora inicial.
2. O usuário pode listar toda a agenda ou a agenda de um período. Nesse último caso, deve
ser solicitada a data inicial e final (formato DD/MM/AAAA).

## Regras
- Todas as datas e horas fornecidas pelo usuário devem ser válidas. Caso não sejam, deve
ser apresentada uma mensagem de erro e o dado deve ser solicitado novamente.
- Nas listagens, os dados devem estar formatados e alinhados conforme os layouts
definidos no final deste documento.
