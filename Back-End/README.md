# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuepração de senha;
- O usuário deve poder resetar sua senha;




**RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);



**RN**
- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu perfil: nome, email e senha;

**RN**
- O usuário não pode alterar seu e-mail para um e-mail ja utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar sua nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dias especifico
- O prestador deve receber um notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;


**RNF**

- Os agendamentos do repstador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazeandas no MongoDB;
- As noticvicações do prestador devem ser enviadas em tempo reall utilizando Socket.io;


**RN**
 - A notificação deve tyer um status de lida ou não lida para que o presstador póssa controlar;


# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviços cadastrados.
- O usuário deve poder listar os dias de um mês com pelo menos com horario disponivel de um prestador;
- O usuário deve poder listar horarios disponiveis em um dia especifico de um prestador
- o usuario deve poder realizar um novo agendamento com um prestador;




**RNF**

- A listagem de prestadores deve ser armazenada em cache;



**RN**

 - Cada agendamento deve durar 1h exatamente
 - Os agendamentos deve estar disponiveis entre 08:00 ás 18:00 (Primeiro as 08h e último as 17h);
 - O usuário não pode agendar em um horário ja ocupado
 - O usuário não pode agendar em um horario que ja passou;
 - O usuário não pode agendar serviçois consigo mesmo;

