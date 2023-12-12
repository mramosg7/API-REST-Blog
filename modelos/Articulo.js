
const ArticuloSchema = {
    titulo: String,
    contenido: String,
    date: {
        type: Date,
        default:Date.now
    },
    imagen: String, 
};

module.exports = ArticuloSchema;