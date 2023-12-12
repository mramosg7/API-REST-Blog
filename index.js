const {conexion} = require("./dataBase/connection");
const express = require("express");
const cors = require("cors")
console.log("App arrancada");



const app = express();

//configurar cors

app.use(cors());

// Convertir body a objeto js

app.use(express.json());
app.use(express.urlencoded({extended : true}))
// Rutas

const rutas_articulo = require("./rutas/Articulo")

//Cargar rutas

app.use("/api", rutas_articulo)


//Rutas pruebas
app.get("/probando", (req,res) =>{
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json({
        curso: "Maste en react",
        autar: "Mario",
        url: "url",
    });
})

//Crear servidor y escuchr

app.listen(3900, ()=>{
    console.log("Servidor corriendo en el puerto 3900")
})