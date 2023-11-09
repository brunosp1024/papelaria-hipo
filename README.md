# Papelaria Hipo - Gerenciamento de vendas

## Descrição do projeto 📄

O projeto apresenta um gerenciamento de vendas e listagem de comissões, onde é possivel cadastrar uma venda com seus produtos e associar um vendedor e um cliente na operação. Uma venda pode, ainda, ser atualizada ou deletada. Também é possível acessar a lista de comissões por vendedor baseado nas vendas realizadas e nos percentuais de comissão de seus produtos.
Na infraestrutura há o backend feito em python e django que fornece os dados através de apis. O frontend, por sua vez, foi desenvolvido com React.js e dispõe de uma interface para acessar e interagir com os dados.

## Tecnologias utilizadas 🧑‍💻

+ Python
+ Django e Django REST framework
+ Docker
+ Pytest
+ Swagger
+ React

***

## Executando o projeto 🚀

#### 1. Clone o projeto do repositório no github e acesse o diretório baixado

        $ git clone https://github.com/brunosp1024/papelaria-hipo.git
        $ cd papelaria-hipo/


#### 2. Criar uma cópia do arquivo `.env.example` com o nome `.env` e defina uma nova senha para a variável SECRET_KEY. Isso aumeta a segurança do projeto:

```shell script
cp .env.example .env
```
```shell script
SECRET_KEY=exemplo_nova_senhai3du7_6q39ydd0!ov$^tn%
```


#### 3. Instale o Docker e o docker-compose seguindo as instruções na documentação

 - https://docs.docker.com/get-docker/


#### 4. Rodar docker-compose para iniciar o sistema

```shell script
docker-compose up
```

#### 5. Acessando a área administrativa do django

Para acessar o django admin, crie um superuser e acesse o endereço url no navegador, digitando as credenciais definidas para o superuser.

```shell script
docker-compose exec api python manage.py createsuperuser
```

```shell script
http://localhost:8000/admin
```


## Endereço para acessar o sistema no navegador

http://localhost:3000/

## Acessando todos os endpoints da api 📌

### Documentação das API's com swagger

No swagger é possível visualizar e acessar toda a documentação dos endpoints.
Endereço url para o swagger: http://localhost:8000/api/v1/swagger/

Para saber mais sobre essa ferramenta e seu funcionamento, acessar o link: https://www.youtube.com/watch?v=3nl9AzttzBQ

***

## Executando os testes do sistema 💡

```shell script
docker-compose exec api pytest
```

