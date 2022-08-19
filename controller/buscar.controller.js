const { req, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
];


const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); //devuelve un boleano 

    if ( esMongoID ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    //expresion regular insensible a las mayusculas i = insensible a las mayusculas y a busquedas abiertas
    const terminoRegex = new RegExp(termino, 'i')
    
    const query = {$or: [{ nombre: terminoRegex }, { correo: terminoRegex }],
     $and: [{estado: true}] }
    
    const usuarios = await Usuario.find( query );
    const total = await Usuario.count( query )

    res.json({
        total,
        results: usuarios
    })

};


const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); //devuelve un boleano 

    if ( esMongoID ){
        const producto = await Producto.findById( termino )
                        .populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    //expresion regular insensible a las mayusculas y buqueda abiertas
    const terminoRegex = new RegExp(termino, 'i')

    const query = ({ nombre: terminoRegex, estado: true } )
                           
    const productos = await Producto.find( query )
                                .populate('categoria', 'nombre');
    const total = await Producto.count( query )

    res.json({
        total,
        results: productos
    })

};


const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); //devuelve un boleano 

    if ( esMongoID ){
        const categoria = await Categoria.findById( termino )
                                    
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const terminoRegex = new RegExp(termino, 'i')
    
    const query = ({ nombre: terminoRegex, estado: true })
    
    const categorias = await Categoria.find( query )
                                
    const total = await Categoria.count( query )

    res.json({
        total,
        results: categorias 
    })

};











const buscar = (req, res = response) => {
    
    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesPermitidas.join(' -')}`
        })
    }

    switch(coleccion){

        case 'usuarios':
            buscarUsuarios(termino, res);

        break;
        case 'productos':
            buscarProductos(termino, res);

        break;
        case 'categorias':
            buscarCategorias(termino, res);

        break;

        default:
            res.status(500).json({
                msg: ' Se le olvido hacer esta busqueda'
            })
    }
}



module.exports = {
    buscar
}