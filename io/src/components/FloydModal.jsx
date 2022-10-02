import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const FloydModal = ({ isOpen, onClose }) => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div>
      <Modal visible={isOpen} toggle={onClose} title="Actividad">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" placeholder="" aria-describedby="nombre" onChange={(e) => setOrigen(e.target.value)} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tipoActividad" className="form-label">Tipo actividad</label>
            <input type="text" className="form-control" id="tipoActividad" placeholder="" aria-describedby="tipoActividad" onChange={(e) => setDestino(e.target.value)} required/>
          </div>
          <button type="button" name="delete" className="btn btn-danger" style={{ marginRight: "2em"}} onClick={()=> onClose()}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Agendar</button>
        </form>
      </Modal>
    </div>
  );
};

export default FloydModal;
