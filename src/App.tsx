import React, { useState } from 'react';
import {useEffect} from 'react';
import Axios from 'axios';



function App() {

  useEffect(() => {
      navigator.geolocation.getCurrentPosition((info: Position) => {
          const latitude = info.coords.latitude.toString();
          const longitude = info.coords.longitude.toString();          
          Axios.get("https://geocode.xyz/"+latitude+","+longitude+"?json=1");
      });
  }, []);

  return (
    <div className="container text-center">
      <div>
        <h1 className="panel-title">Próximo feriado vai ser:</h1>
      </div>
      <div>
        <h1 className="panel-title">~dia aqui~</h1>
      </div>
      <div>
        <h1 className="panel-title">Faltam X semana(s)</h1>
      </div>
      <div>
        <h1 className="panel-title"> X dias(s)</h1>
      </div>
      <div>
        <h3 className="panel-title"> XX:XX:XX horas(s)</h3>
      </div>
    </div>
  );
}

export default App;
