const {Router} = require("express");
const router = Router();
const multer = require("multer")

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos/')
    },

    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento})

const ArticuloControler = require("../controladores/Articulo")
//Rutas de prueba 

router.get("/rutatest", ArticuloControler.test)
router.post("/crear",ArticuloControler.crear)
router.get("/articulos/:ultimos?",ArticuloControler.getArticulos)// si lleva dos puntos es un parametro y si lleva interrogacion significa que no es obligatorio
router.get("/articulo/:id",ArticuloControler.uno)
router.delete("/eliminar/:id",ArticuloControler.eliminar)
router.post("/subir/:id",[subidas.single("file0")],ArticuloControler.subir)
router.get("/imagen/:fichero",ArticuloControler.imagen)







module.exports = router