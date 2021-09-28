# stock-control

## Antes de tudo rode o comando yarn

## Configure o .env usando o que ja contém no .env.example

### Usando o sistema

#### 1 - Crie um usuário e faça o login 

#### 2 - Adicione um produto ou mais, um ingredient ou mais

#### 3 - Na rota products/:id/ingredients adicione os ingredientes que compoem o produto

#### 4 - Na rota ingredients/in-out/:id adicione ingredientes ao estoque, no campo type coloque: 'in' para entrada no estoque e 'out' para saída.

#### 5 - Na rota /ingredients são listados os ingredientes com a quantidade disponível de cada um

#### 6 - Na rota /products/availability/:id exibe se um produto está disponivel e qual dos ingredients esão em falta para criar fazer o produto

#### 7 - Na rota /products/cost retorna todos os produtos com dados de quanto custa para fabricar cada um e o preço atual de venda
