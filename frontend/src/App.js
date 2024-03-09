import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import header from './components/header';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import footer from './components/footer';

const notif = withReactContent(Swal)




function App() {
const [cedula,setCedula] = useState("");
const [nombre,setNombre] = useState("");
const [apellido,setApellido] = useState("");
const [grupo,setGrupo] = useState("");
const [id,setID] = useState("");

const [editar,setEditar] = useState(false);

const [alumnoslist,setAlumnos] = useState([]);


const add = ()=>{
  Axios.post("http://localhost:3001/create",{
    alumno_cedula:cedula,
    alumno_nombre:nombre,
    alumno_apellido:apellido,
    alumno_grupo:grupo,
  }).then(()=>{
    getAlumnos();
    LimpiarCampos();
    notif.fire({
      title: <strong>Registro Exitoso</strong>,
      html: <i>Alumno {nombre} registrado con exito!!!</i>,
      icon: 'success',
      timer: 3000
    })
  });
}

const update = ()=>{
  Axios.put("http://localhost:3001/update",{
    alumno_id:id,
    alumno_cedula:cedula,
    alumno_nombre:nombre,
    alumno_apellido:apellido,
    alumno_grupo:grupo,
  }).then(()=>{
    getAlumnos();
    LimpiarCampos();
    notif.fire({
      title: <strong>Actualización Exitosa</strong>,
      html: <i>Alumno {nombre} actualizado con exito!!!</i>,
      icon: 'success',
      timer: 2000
    })
  });
}

const deleteAlumno = (val)=>{
  notif.fire({
    title: "Conformar Eliminado",
    html: <i>Realmente desea eliminar {val.alumno_nombre}</i>,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${val.alumno_id}`).then(()=>{
        getAlumnos();
        LimpiarCampos();
        Swal.fire({
          title: "Eliminado!",
          text: "El registro fue Eliminado.",
          icon: "success",
          timer:3000
        });
      }).catch(function(error){
        notif.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro Eliminar!",
          footer: error.Axioserror
        });
      });
      
    }
  });  
}

const LimpiarCampos = ()=>{
  setCedula("");
  setNombre("");
  setApellido("");
  setGrupo("");
  setID("");
  setEditar(false);
}


const editarAlumno = (val)=>{
  setEditar(true);
  setCedula(val.alumno_cedula);
  setNombre(val.alumno_nombre);
  setApellido(val.alumno_apellido);
  setGrupo(val.alumno_grupo);
  setID(val.alumno_id);

}

const getAlumnos = ()=>{
  Axios.get("http://localhost:3001/alumnos").then((response)=>{
    setAlumnos(response.data);
  });
}

// Creacion del Cuerpo y Formulario

// Heades
// Formulario
// Footer

  return (
    
    <div>

<div> 
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <div>            
            <a href='/' className='navbar-brand'>Unidad Educativa San Jose</a>
        </div>
        <div>            
            <a href='/' className='navbar-brand'>Gestión Estudiantes</a>            
        </div>
      </nav>
    </div>
    
    <p></p>

    <div className="container">        


        <div className="card text-center">
      <div className="card-header">
      

      
        Gestión de Alumnos
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cédula: </span>
          <input type="text" value={cedula}
           onChange={(event)=>{
            setCedula(event.target.value);
          }} 
          className="form-control" placeholder="Ingrese una Cedula" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre: </span>
          <input type="text" value={nombre}
           onChange={(event)=>{
            setNombre(event.target.value);
          }} 
          className="form-control" placeholder="Ingrese el Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Apellido: </span>
          <input type="text" value={apellido}
           onChange={(event)=>{
            setApellido(event.target.value);
          }}
          className="form-control" placeholder="Ingrese el Apellido" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Grupo: </span>
          <input type="text" value={grupo}
           onChange={(event)=>{
            setGrupo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese el Grupo (A, B, C, D)" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

      </div>
      <div className="card-footer text-body-secondary">
        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
          <button className='btn btn-warning m-2' onClick={LimpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Registrar</button>
        }
      
       
      </div>
      
    </div>
    <button className='btn btn-success' onClick={getAlumnos}>Listar Alumnos</button>
    <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Cedula</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Grupo</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {
          alumnoslist.map((val,key)=>{
            return <tr key={val.alumno_id}>
              <th>{val.alumno_id}</th>
              <td>{val.alumno_cedula}</td>
              <td>{val.alumno_nombre}</td>
              <td>{val.alumno_apellido}</td>
              <td>{val.alumno_grupo}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" 
                onClick={()=>{
                  editarAlumno(val);
                }}
                className="btn btn-info">Editar</button>
                <button type="button" onClick={()=>{
                  deleteAlumno(val);
                }} className="btn btn-danger">Eliminar</button>
              </div>
              </td>
            </tr>

          })
        }
        
  </tbody>
    </table>   

    </div>
    <div>
      <footer className='footer'>
      Andrés Cosios Pineda - Examen Práctico MIC
      </footer>
    </div>
    <div>
      
      </div>
    </div>
  );

}


export default App;
