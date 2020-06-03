/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import moment from 'moment'
const TOKEN = "cmFmYWVsLmFsdmVzLmRzQGdtYWlsLmNvbSZoYXNoPTUxODUxNDM0";

interface Feriado{
  nome: string
  data: string
  descricao: string
  dataFeriado: Date
  dataHoje: Date
  link: string
  dif: any
}

function App() {
  const [feriado, setFeriado] = useState<Feriado>({
    nome: '',
    data: '',
    descricao: '',
    dataFeriado: new Date(),
    dataHoje: new Date(),
    link: '',
    dif: ''
  }); 

  const hoje:Date = new Date();
  let diaFeriado:Date = new Date();
  useEffect(() => {
      navigator.geolocation.getCurrentPosition((info: Position) => {
          const latitude = info.coords.latitude.toString();
          const longitude = info.coords.longitude.toString();
          
          let cidade:string = '';          
          let estado:string = '';  
          let feriados:Array<any> = [];         

          axios.get(`https://geocode.xyz/${latitude},${longitude}?json=1`).then( (response)=>{
            cidade = response.data.city;
            estado = response.data.state;
            console.log(response.statusText);
            
            axios.get(`https://api.calendario.com.br/?json=true&ano=${hoje.getFullYear()}&estado=${estado}&cidade=${cidade}&token=${TOKEN}`).then((response)=>{
              feriados = response.data;             
              const filtrado = feriados.filter(feriado=>{
                diaFeriado = new Date(feriado.date.split('/').reverse().join('/'));
                return feriado.type_code !== '9' && diaFeriado >= hoje;
              });
              
              let dif = Math.abs(hoje.getTime() - diaFeriado.getTime());
              console.log(moment(diaFeriado));
              setFeriado({
                nome: filtrado[0].name,
                data: filtrado[0].date,
                descricao: filtrado[0].description,
                dataFeriado: diaFeriado,
                dataHoje: hoje,
                link: filtrado[0].link,
                dif: Math.ceil(dif / (1000 * 60 * 60 * 24))
              });   
              console.log(moment().format());          

            }).catch(error=>{
              console.log("Deu ruim.Feriado");
            });
            
          }).catch(error=>{
            console.log("Deu ruim.Cidade");
          });
          

      }, (error)=>{
        if (error.code === error.PERMISSION_DENIED){
          console.log("ME LIBERA!!!!!!");
        }
      });
  }, []);

  return (
    <div className="container text-center">
      <div>
        <h1 className="panel-title">Próximo feriado vai ser: {`${feriado.nome}`}</h1>
      </div>
      <div>
        <h1 className="panel-title">{`${feriado.data}`}</h1>
      </div>
      <div>
        <h1 className="panel-title">Faltam X semana(s)</h1>
      </div>
      <div>
        <h1 className="panel-title"> {`${feriado.dif}`} dias(s)</h1>
      </div>
      <div>
        <h3 className="panel-title"> XX:XX:XX horas(s)</h3>
      </div>
    </div>
  );
}

export default App;
