# gztech-app
Front-end para a aplicação GZTech

## Requerimentos
* docker(versão utilizada: 20.10.7)
* docker-compose(versão utilizada: 1.25.0)

## Como utilizar e instalar
Para executar o container da aplicação, utilizaremos docker-compose, caso o usuário logado não faça parte do grupo do docker, será necessário executar o comando com `sudo` antes de `docker-compose`
~~~
docker-compose up
~~~
Caso tudo tenha ocorrido como esperado, a última linha que aparecerá no terminal será mais ou menos assim 
`app    | webpack 5.65.0 compiled with x warnings in x ms` ou `app    | webpack 5.65.0 compiled successfully in 1349 ms`

Após o container estar ativo, podemos acessar a aplicação pela URL: `http://localhost:3000/`

## Atenção
Funcionalidades como o cadastro de níveis e desenvolvedores e as listagens de níveis e desenvolvedores só irão funcionar após o container da API também estar ativo
