# Consulta CEP – Aplicação React

Este projeto é uma aplicação simples para consulta de CEP utilizando a API pública ViaCEP.  
O usuário pode pesquisar qualquer CEP do Brasil, visualizar os dados do endereço, alternar entre modo claro e escuro e manter um histórico de buscas salvo no navegador.

---

## Tecnologias Utilizadas

- React.js – biblioteca principal da interface
- Axios – cliente HTTP utilizado para fazer requisições à API ViaCEP
- React Icons – biblioteca de ícones usada na interface (ícone de pesquisa, modo claro e modo escuro)
- LocalStorage – utilizado para salvar o histórico e o tema do usuário
- CSS – utilizado para estilização da aplicação

---

# Como instalar as dependências (requirements.txt)


### Antes de tudo, garanta que você tem o Python 3.10+ instalado.

### Crie e ative um ambiente virtual (opcional, porém recomendado):

```python -m venv venv```


Ativar no Windows:

```venv\Scripts\activate```


Ativar no Linux/Mac:

```source venv/bin/activate```


Instale todas as dependências:

```pip install -r requirements.txt```
___

# Como rodar o projeto

Após instalar as dependências, execute o comando:

```uvicorn main:app --reload```

