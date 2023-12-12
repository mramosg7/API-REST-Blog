const fs = require("fs")
const {validar_articulos} = require("../helper/validar")
const {conexion} = require("../dataBase/connection");
const path = require("path")

const diccionario_extensiones = {
    "png":"",
    "jpg":"",
    "jpeg":"",
    "gif": ""
}

const test = (req,res) =>{

    return res.status(200).json({
        mensaje: "soy una accion de prueba"
    })
}


const crear = (req,res) =>{

    //recoger parametros por post a guardar
    let parametros = req.body;


    //validar datos
    try{
        validar_articulos(parametros)
    }catch(error){
        return res.status(400).json({
            status: "err",
            mensaje: "Faltan datos para enviar"
        })
    }

    //crear el objeto a guardar
        const articulo = {
            titulo : parametros.titulo,
            contenido : parametros.contenido,
            imagen: parametros.imagen,
        }
    //guardar el articulo
        const querry = "INSERT INTO ARTICULO (TITULO, CONTENIDO, FECHA, IMAGEN) VALUES (?, ?, NOW(), ?)"

        conexion.query(querry,[articulo.titulo, articulo.contenido, articulo.imagen], (error, results, fields) => {
            if (error){
                console.log(error)
                return res.status(400).json({
                    status: "err",
                    mensaje: "Error en la consulta"
                })
                
            }
            console.log('ID del nuevo registro insertado:', results.insertId);
            return res.status(200).json({
                status: "success",
                contenido: results,
            })
            
        })
      
   

   
}


const getArticulos = (req,res)=>{

    let consulta = "SELECT * FROM ARTICULO";
    if (req.params.ultimos){
        consulta = "SELECT * FROM ARTICULO LIMIT ?";
    }
    const limite = parseInt(req.params.ultimos);
    conexion.query(consulta,[limite],(error, results, fields) =>{

        if (error){
            return res.status(404).json({
                status: "Error",
                
                mensaje: "Error al conseguir los datos"
            })
        }

        return res.status(200).json({
            status: "success",
            parametros: req.params.ultimos,
            results
        })

    })

}

const uno = (req,res) =>{
    let id = parseInt(req.params.id);
    
    const consulta = "SELECT * FROM ARTICULO WHERE ID = ?"

    conexion.query(consulta,[id],(error, results) =>{
        if (error) {
            return res.status(404).json({
                status: "error",
                mensaje: "consulta fallida"
            })
        }

        return res.status(200).json({
            status: "success",
            results
        })
    })
}



const eliminar = (req,res)=>{
    console.log("id:")
    let id = req.params.id;
    console.log("id:")
    console.log(id)
    const consulta = "DELETE FROM ARTICULO WHERE ID = ?"

    conexion.query(consulta,[id],(error,results)=>{
        if (error){
            return res.status(404).json({
                status: "Error"
            })
        }

        return res.status(200).json({
            status: "success",
            results
        })
    })
}

const subir = (req,res) =>{
    
    //configurar multer

    // Recoger el fichero de imagen subido
    if(!req.file && !req.files){
        return res.status(404).json({
            status: "Error",
            mensaje: "Peticion invalida"
        })
    }
    // Nombre del archivo
        let archivo = req.file.originalname
        
    // Extension del archivo
        let archivo_split = archivo.split("\.")
        let archivo_extension = archivo_split[1]
    // Comprobar extension correcta
        if(!(archivo_extension in diccionario_extensiones)){
            // Borrar archivo y dar el error 
            fs.unlink(req.file.path, (error)=>{
                return res.status(400).json({
                    status: "error",
                    mensaje: "archivo no valido"
                })
            })
           
        }else{
             // Si todo va bien, actualizar el articulo


            return res.status(200).json({
                status: "success",
                files : archivo_split[1]
            })
        }
   
    
}
// Dar la imagen tal cual no solo el nombre
const imagen = (req, res) =>{ 
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/"+fichero;

    fs.stat(ruta_fisica, (error,existe) =>{
        if (existe){
            console.log(path.resolve(ruta_fisica));
            return res.sendFile(path.resolve(ruta_fisica))
        }else{
            return res.status(404).json({
                status: "Error",
                mensaje: "Imagen no encontrada"
            })
        }
    })
}
module.exports ={
    test,
    crear,
    getArticulos,
    uno,
    eliminar,
    subir,
    imagen
}