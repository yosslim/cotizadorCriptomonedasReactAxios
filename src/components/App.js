import React, { Component } from 'react';
import Header from './Header';
import Formulary from './Formulary';
import Resultado from './Resultado';
import axios from 'axios';


class App extends Component {

  state={
    monedas:[],
    cotizacion:{},
    monedaCotizada:'',
    cargando: false
  }

  async componentDidMount(){
    this.obtenerMonedas();
  }

  obtenerMonedas = async () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;
    await axios.get(url)
      .then(response => {
        this.setState({
          monedas:response.data.data
        })
      })
      
      .catch(error => {
        console.log(error)
      })
  }

  //Cotizar una crypto en base a una moneda
  obtenerValoresCrypto = async (monedas) => {
    const {moneda, crypto} = monedas;
    const url = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${moneda}`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          cargando:true
        })
        setTimeout(() =>{
          this.setState({
            cotizacion: respuesta.data.data,
            monedaCotizada: moneda,
            cargando:false
          })
        },3000);
      })
  }


  render() {
    const cargando = this.state.cargando;

    let resultado;

    if(cargando) {
      resultado =  <div className="spinner">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                  </div>
    } else {
      resultado =   <Resultado
                      cotizacion={this.state.cotizacion}
                      monedaCotizada={this.state.monedaCotizada}
                    />
    }

    return (
      <div className="container">
        <Header
          titulo='Cotiza Cripomonedas al instante'
        />
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light pd-4 contenido-principal">
            <Formulary
              monedas = {this.state.monedas}
              obtenerValoresCrypto={this.obtenerValoresCrypto}
            />
            {resultado}
           
          </div>
        </div>
      </div>
    );
  }
}

export default App;
