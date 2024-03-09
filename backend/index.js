const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ESPE2024%",
    database:"colegio",
});

// metodo POST
app.post("/create",(req,res)=>{
    const alumno_cedula = req.body.alumno_cedula;
    const alumno_nombre = req.body.alumno_nombre;
    const alumno_apellido = req.body.alumno_apellido;
    const alumno_grupo = req.body.alumno_grupo;

    db.query('INSERT INTO alumno(alumno_cedula,alumno_nombre,alumno_apellido,alumno_grupo) VALUES(?,?,?,?)',[alumno_cedula,alumno_nombre,alumno_apellido,alumno_grupo],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

// metodo GET
app.get("/alumnos",(req,res)=>{    
    db.query('SELECT * FROM alumno',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

// metodo UPDATE
app.put("/update",(req,res)=>{
    const alumno_cedula = req.body.alumno_cedula;
    const alumno_id = req.body.alumno_id;
    const alumno_nombre = req.body.alumno_nombre;
    const alumno_apellido = req.body.alumno_apellido;
    const alumno_grupo = req.body.alumno_grupo;

    db.query('UPDATE alumno SET alumno_cedula=?,alumno_nombre=?,alumno_apellido=?,alumno_grupo=? WHERE alumno_id=?',[alumno_cedula,alumno_nombre,alumno_apellido,alumno_grupo,alumno_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

// metodo DLELETE
app.delete("/delete/:alumno_id",(req,res)=>{
    const alumno_id = req.params.alumno_id;

    db.query('DELETE FROM alumno WHERE alumno_id=?',[alumno_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

// Configuracion de puerto de la API
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})