import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import api from '../pages/api';
import './style.css';

function Search() {

  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // carregar histórico e tema ao abrir a página
  useEffect(() => {
    const salvo = localStorage.getItem("historicoCEPs");
    if (salvo) setHistorico(JSON.parse(salvo));

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") setDarkMode(true);

  }, []);

  // salvar histórico sempre que mudar
  useEffect(() => {
    localStorage.setItem("historicoCEPs", JSON.stringify(historico));
  }, [historico]);

  // salvar tema sempre que mudar
  useEffect(() => {
    localStorage.setItem("tema", darkMode ? "dark" : "light");
  }, [darkMode]);

  // permitir apenas números e máximo 8 dígitos
  useEffect(() => {
    const apenasDigitos = cep.replace(/\D/g, "").slice(0, 8);

    if (apenasDigitos !== cep) {
      setCep(apenasDigitos);
    }

    if (erro && cep.length > 0) setErro(false);

  }, [cep, erro]);

  const buscarCep = () => {
    if (cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos!");
      return;
    }

    api.get(`${cep}/json`)
      .then(res => {
        const data = res.data;

        if (data.erro) {
          alert(`CEP: ${cep} INVÁLIDO OU NÃO ENCONTRADO.`);
          setErro(true);
          setDados(null);
        } else {
          setErro(false);
          setDados(data);

          setHistorico(prev => {
            if (prev.includes(cep)) return prev;
            return [cep, ...prev];
          });
        }
      })
      .catch(() => {
        setErro(true);
        setDados(null);
      });
  };

  const limparHistorico = () => {
    setHistorico([]);
    localStorage.removeItem("historicoCEPs");
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>

      <button className="dark-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <CiLight /> : <MdDarkMode />}
      </button>

      <h1 className='title'>Consulta CEP</h1>

      <div className="campo">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Digite aqui o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={8}
          onKeyDown={(e) => e.key === "Enter" && buscarCep()}

        />

        <button className='botao' onClick={buscarCep}>
          <FiSearch size={25} color="white" />
        </button>
      </div>

      {dados && (
        <main className='main'>
          <h2>CEP: {dados.cep}</h2>
          <p>Logradouro: <span> {dados.logradouro}</span></p>
          <p>Bairro: <span> {dados.bairro}</span></p>
          <p>Cidade/UF: <span> {dados.localidade} - {dados.uf}</span></p>
        </main>
      )}

      {historico.length > 0 && (
        <div className='historico'>
          <h3>Histórico de buscas</h3>
          <ul>
            {historico.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button onClick={limparHistorico} className='limpar'>
            Limpar Histórico
          </button>
        </div>
      )}

    </div>
  );
}

export default Search;
