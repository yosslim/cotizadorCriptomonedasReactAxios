import React, {Component} from 'react';
import OptionSelect from './OptionSelect';

class Formulary extends Component{

    monedaRef = React.createRef();
    criptoRef = React.createRef();

    cotizarMonedas = (e) => {
        e.preventDefault();

        //Crear el Objeto
        const cotizacion = {
            moneda: this.monedaRef.current.value,
            crypto: this.criptoRef.current.value
        }

        //console.log(cotizacion);

        //Enviar por props

        this.props.obtenerValoresCrypto(cotizacion);

    }



    render(){
        return(
            <form onSubmit={this.cotizarMonedas}>
                <div className="form-group">
                    <label>Moneda: </label>
                    <select ref={this.monedaRef}>
                        <option value="" disabled defaultValue>Elige tu moneda</option>
                        <option value="USD">Dolar Estadounidense</option>
                        <option value="MXN">Peso Mexicano</option>
                        <option value="GBP">Libras</option>
                        <option value="EUR">Euros</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Criptomoneda</label>
                    <select ref={this.criptoRef} className="form-control">
                        {Object.keys(
                            this.props.monedas).map(key => (
                                <OptionSelect
                                    key={key} 
                                    moneda={this.props.monedas[key]}
                                />
                            )
                        )}
                        
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Cotizar"/>
                </div>
            </form>
        )
    }
}

export default Formulary;