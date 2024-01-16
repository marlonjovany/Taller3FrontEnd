//IMPORT
import React, { useEffect, useState } from "react";
import axios from "axios";
import { mostrarAlerta } from "../functions.js";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

//CUERPO COMPONENTE
const MascotasComponent = () => {
  const url = "http://localhost:8000/mascotas";
  const [mascotas, setMascotas] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [detalles, setDetalles] = useState("");
  const [detalles1, setDetalles1] = useState("");
  const [celular, setCelular] = useState("");
  const [nombreA, setNombreA] = useState("");
  const [operacion, setOperacion] = useState("");


  const [modalModalIsOpen, setModalIsOpen] = useState(false);
  const [titulo, setTitulo] = useState("");


  const [searchResults, setSearchResults] = useState([]);
  const [imagen, setImagen] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);




  useEffect(() => {
    getMascotas();
  }, []);

  const getMascotas = async () => {
    const respuesta = await axios.get(`${url}/buscar`);
    console.log(respuesta.data);
    setMascotas(respuesta.data);
  };

  const antes = () => {
    setCurrentIdx((prevIdx) => Math.max(prevIdx + 10, 0));
  };

  const siguiente = () => {
    const maxIdx = (searchResults?.length > 0 ? searchResults : mascotas)?.length - 1;
    setCurrentIdx((prevIdx) => Math.min(prevIdx + 1, maxIdx));
  };

  const openModal = (opcion, id, nombre, edad, detalles, detalles1, imagen) => {

    setId('');
    setNombre('');
    setEdad('');
    setDetalles('');
    setDetalles1('');
    setImagen('');


    setOperacion(opcion);
    if (opcion === 1) {
      setTitulo("Registrar Mascota");
    }
    else if (opcion === 2) {
      setTitulo("Editar Mascota");
      setId(id);
      setNombre(nombre);
      setEdad(edad);
      setDetalles(detalles);
      setDetalles1(detalles1);

    }
  };





  const openModal22 = (opcion, id, celular, nombreA) => {
    setId('');
    setCelular('');
    setNombreA('');

    setOperacion(opcion);
    if (opcion === 2) {
      setId(id);
      setCelular(celular);
      setNombreA(nombreA);
    } else if (opcion === 1) {
      setTitulo("Registro del adoptante ");

    }

    setModalIsOpen(true);
  };





  const validar1 = () => {
    let parametros;
    let metodo;

    if (typeof celular !== 'string' || celular.trim() === '') {
      console.log("Debe escribir una NUMERO DE CELULAR");
      mostrarAlerta("Debe escribir un numero ");
    }
    else if (nombreA.trim() === '') {
      console.log("Debe escribir el nombre del adoptante");
      mostrarAlerta("Debe escribir nombre del adoptante");
    }
    else {
      if (operacion === 2) {
        parametros = {
          urlExt: `${url}/actualizar/${id}`,


          celular: celular.trim(),
          nombreA: nombreA.trim()

        };
        metodo = "PUT";
      }
      else {
        parametros = {

          urlExt: `${url}/crear`,
          celular: celular.trim(),
          nombreA: nombreA.trim()

        };
        metodo = "POST";
      }
      enviarSolicitud1(metodo, parametros);

    }

  };

  const validar = () => {
    let parametros;
    let metodo;

    if (nombre.trim() === '') {
      console.log("Debe escribir un Nombre");
      mostrarAlerta("Debe escribir un Nombre");
    } else if (typeof edad !== 'string' || edad.trim() === '') {
      console.log("Debe escribir una Edad");
      mostrarAlerta("Debe escribir una Edad");

    } else if (detalles.trim() === '') {
      console.log("Debe escribir algo");
      mostrarAlerta("Debe escribir algo");
    } else if (detalles1.trim() === '') {
      console.log("Debe escribir algo");
      mostrarAlerta("Debe escribir algo");

    } else if (!imagen || !(imagen instanceof File) || !imagen.name) {
      console.log("Debe seleccionar una imagen válida");
      mostrarAlerta("Debe seleccionar una imagen válida");
      return;
    }
    else {

      if (operacion === 1) {
        parametros = {
          urlExt: `${url}/crear`,
          nombre: nombre.trim(),
          edad: edad.trim(),
          detalles: detalles.trim(),
          detalles1: detalles1.trim(),
          imagen: imagen

        };
        metodo = "POST";
      } else {
        parametros = {
          urlExt: `${url}/actualizar/${id}`,
          nombre: nombre.trim(),
          edad: edad.trim(),
          detalles: detalles.trim(),
          detalles1: detalles1.trim(),
          imagen: imagen

        };
        metodo = "PUT";
      }
      enviarSolicitud(metodo, parametros);
    }
  };








  const enviarSolicitud = async (metodo, parametros) => {
    await axios({ method: metodo, url: parametros.urlExt, data: parametros })
      .then((respuesta) => {
        let tipo = respuesta.data.tipo;
        let mensaje = respuesta.data.mensaje;
        mostrarAlerta(mensaje, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrarModal").click();
          getMascotas();
        }
      })
      .catch((error) => {
        mostrarAlerta(`Error en la solicitud`, error)
      });
  };

  const enviarSolicitud1 = async (metodo, parametros) => {
    await axios({ method: metodo, url: parametros.urlExt, data: parametros })
      .then((respuesta) => {
        let tipo = respuesta.data.tipo;
        let mensaje = respuesta.data.mensaje;
        mostrarAlerta(mensaje, tipo);
        if (tipo === "success") {
          document.getElementById("btnCerrarModal").click();
          getMascotas();
        }
      })
      .catch((error) => {
        mostrarAlerta(`Error en la solicitud`, error)
      });
  };



  const detallesm = (id, nombre, detalles1) => {
    const MySwal = withReactContent(Swal);

    const theme = {
      confirmButtonColor: '#333',
    };

    MySwal.fire({
      title: ` ${nombre}`,
      html: `<p>${detalles1}</p>`,
      showCancelButton: false,
      confirmButtonText: 'Regresar',
      customClass: {
        popup: 'detalles-perro-popup',
        title: 'detalles-perro-title',
        confirmButton: 'detalles-perro-confirm-button',
      },
      theme: theme,
    });


  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            {/* Campo de búsqueda por nombre */}



          </div>


        </div>


        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="row">
              {(searchResults?.length > 0 ? searchResults : mascotas)?.map((mascota, i) => (
                <div className="col-md-4 mb-3" key={mascota.id}>
                  <div className="card">
                    <div
                      className="card-image"
                      style={{ backgroundImage: `url(${mascota.imagen})`, height: '200px', backgroundSize: 'cover' }}
                    ></div>
                    <div className="card-body">
                      <h5 className="card-title text-start">{mascota.nombre}</h5>
                      <p className="card-text text-start">Edad: {mascota.edad}</p>
                      <p className="card-text text-start">{mascota.detalles}</p>

                      <button
                        onClick={() => detallesm(mascota.id, mascota.nombre, mascota.detalles1)}
                        className="btn btn-primary mr-2"
                      >
                        Detalles
                      </button>

                      <button
                        onClick={() => openModal22(2)}
                        className="btn btn-primary mr-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalMascotas"
                      >
                        Adoptar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ position: 'absolute', bottom: 60, left: 200 }}>
              <button
                onClick={antes}
                className="btn btn-info ml-2"
                style={{ marginTop: '10px' }}
              >
                Anterior
              </button>

              <button
                onClick={siguiente}
                className="btn btn-info ml-2"
                style={{ marginTop: '10px' }}
              >
                Siguiente
              </button>
            </div>








          </div>
        </div>
      </div>

      <div id="modalMascotas" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{titulo}</label>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>






              {operacion === 1 && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    ></input>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="edad"
                      className="form-control"
                      placeholder="Edad"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                    ></input>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="detalles"
                      className="form-control"
                      placeholder="Detalles"
                      value={detalles}
                      onChange={(e) => setDetalles(e.target.value)}
                    ></input>
                  </div>



                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="detalles1"
                      className="form-control"
                      placeholder="Detalles1"
                      value={detalles1}
                      onChange={(e) => setDetalles1(e.target.value)}
                    ></input>
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="file"
                      id="imagen"
                      className="form-control"
                      onChange={(e) => setImagen(e.target.files[0])}
                    />
                  </div>




                  <div className="d-grid col-6 mx-auto">
                    <button onClick={() => validar()} className="btn btn-success">
                      <i className="fa-solid fa-floppy-disk"></i>Guardar
                    </button>
                  </div>
                </>
              )}

              {operacion === 2 && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="celular"
                      className="form-control"
                      placeholder="Celular"
                      value={celular}
                      onChange={(e) => setCelular(e.target.value)}
                    ></input>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type="text"
                      id="nombreA"
                      className="form-control"
                      placeholder="NombreA"
                      value={nombreA}
                      onChange={(e) => setNombreA(e.target.value)}
                    ></input>
                  </div>

                  <div className="d-grid col-6 mx-auto">
                    <button onClick={() => validar1()} className="btn btn-success">
                      <i className="fa-solid fa-floppy-disk"></i>Guardar
                    </button>
                  </div>
                </>
              )}










            </div>


            <div className="modal-footer">
              <button
                id="btnCerrarModal"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
        <button></button>
      </div>


    </div>


  );


};

//EXPORT
export default MascotasComponent;
