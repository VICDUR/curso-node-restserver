const { req, response } = require('express');
const { Producto } = require('../models');



// obtenerCategorias - paginado - total - populate
const obtenerProductos = async ( req, res = response) => {

    const { limite = 5, desde = 5 } = req.query;

    const query = ( { estado:true })

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        productos
    })

};


// obternerCategoria - populate {}
const obtenerProducto = async ( req, res = response) => {
   
    const  { id } = req.params;
    
    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.status(200).json(producto);


}


const crearProducto = async (req, res = response) => {
    
    const {estado, usuario, ...body }= req.body;
    
    console.log(body.nombre)

    const productoDB = await Producto.findOne( {nombre: body.nombre} ) 

    //si el producto existe
    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        })
    }

    // Generar la data a guardar 
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id         // viene del mideleaware
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

    res.status(201).json(producto)


}


// actualizarProducto  recibe el nombre
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data}  = req.body;
    
    if( data.nombre){
        data.nombre = data.nombre.toUpperCase();
     };

    data.usuario = req.usuario._id;

    const actualizar = await Producto.findByIdAndUpdate(id, data, {new: true} ); // se envia el new true para que mande el objeto actualizado

    res.status(200).json( actualizar )

}


// borrarProducto - estado:false
const borrarProducto = async ( req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, {estado:false}, {new: true})

    res.status(200).json(producto)

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
    
}