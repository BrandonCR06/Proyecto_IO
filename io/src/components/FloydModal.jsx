import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const FloydModal = ({ isOpen, onClose ,tablaP, vertices}) => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  let [resultado, setRuta] = useState("");
  
  
  const calcularRutaCortaAux = (aca,alla)=>{                
    if (tablaP[aca-1][alla-1] === 0){            
        let rutaCorta= `\n, de ${vertices[aca-1]} → ${vertices[alla-1]}`;
        return rutaCorta;
    }
    else{        
        return  calcularRutaCortaAux(aca, tablaP[aca-1][alla-1])+ calcularRutaCortaAux(tablaP[aca-1][alla-1],alla);
    }
}


const calcularRutaCorta = (aca,alla)=>{
    //console.log(`Se desea ir de ${aca} hasta ${alla}`);
    let rutaCorta = "";
    let INF = Number.MAX_SAFE_INTEGER;
    
    if (aca === alla){
        rutaCorta = "Es el mismo lugar";
    }
    else{
        if (tablaP[aca-1][alla-1] === 0){
            rutaCorta += `Ruta directa ${vertices[aca-1]} → ${vertices[alla-1]}`;
        }
        else{
            if(tablaP[aca-1][alla-1] === INF){
                rutaCorta = "No hay ruta";
            }
            else{
                rutaCorta += `Ruta Corta total de ${vertices[aca-1]} a ${vertices[alla-1]} :\n`;
                
                return rutaCorta+= calcularRutaCortaAux(aca, tablaP[aca-1][alla-1])+ calcularRutaCortaAux(tablaP[aca-1][alla-1], alla);
            }
        }
    }
            
    return rutaCorta
  }
  const handleSubmit = (e) => {
    e.preventDefault();  
    
    console.log(tablaP, vertices);
    let or = vertices.indexOf(origen)+1;
    let des = vertices.indexOf(destino)+1;    
    
    setRuta(resultado = calcularRutaCorta(or,des));
    


  };    
  

  return (
    
      <Modal visible={isOpen} toggle={onClose}  title="Ingrese una ruta">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Origen</label>
            <input type="text" className="form-control" id="nombre" placeholder="" aria-describedby="nombre" onChange={(e) => setOrigen(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tipoActividad" className="form-label">Destino</label>
            <input type="text" className="form-control" id="tipoActividad" placeholder="" aria-describedby="tipoActividad" onChange={(e) => setDestino(e.target.value)} required/>
          </div>
          <div className="mb-3">            
            <label type="text" className="form-label" >   {resultado}  </label>
          </div>
          <button type="button" name="delete" className="btn btn-danger" style={{ marginRight: "2em"}} onClick={()=> onClose()}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Calcular ruta</button>
        </form>
      </Modal>    
  );
};

export default FloydModal;
