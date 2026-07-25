# App

Gympass style app.

## RFs
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o total de checkins realizado pelo usuário logado;
- [] Deve ser possível o usuario obter seu histórico de checkins realizados;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar uma academia pelo nome;
- [] Deve ser possível o usuário realizar checkin em uma academia;
- [] Deve ser possível validar o checkin de um usuário;
- [] Deve ser possível cadastrar uma academia.

## RN

- [x] O usuário não pode se cadastrar com um email duplicado;
- [] O usuário não pode fazer mais de um checkin no mesmo dia;
- [] O usuário não pode fazer checkin se não estiver perto da academia (100m);
- [] o checkin pode ser validado até 20min depois de ser criado;
- [] o checkin só pode ser validado por administradores;
- [] a academia pode ser cadastrada apenas por administradores;

## RNF

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação devem ser persistidos em um bando de dados postgres;
- [] Todas as lista de dados devem ser paginadas (20 itens por pagina);
- [] O usuário deve ser identificado por um JWT.