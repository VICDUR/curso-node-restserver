const { request, response } = require('express');
const Usuario = require('../models/usuario');


const esAdminRole = async ( req, res = response, next) => {
 
           //  el parametro de req.usuario se  crea en la funcion anterior validarJWT con el uid que recibe de req.body validandolo con el schema de la db Usuario
        if ( !req.usuario ){
            return res.status(500);
            msg: 'Se quiere verificar el role sin validar el token primero'
        };

        const { rol, nombre } = req.usuario;
        
        if( rol !== 'ADMIN_ROLE'){
            return res.status(401).json({
                msg: `${ nombre } no es administrador - No puede hacer esto`
            })
        }
    
    next()
};

const tieneRole = ( ...roles ) => {


    return (req, res = response, next )=> {

        if ( !req.usuario ){
            return res.status(500);
            msg: 'Se quiere verificar el role sin validar el token primero'
        };

        console.log( roles, req.usuario.rol )

        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${ roles }`
            })
        }
        
        next();
    }


}

module.exports = {
    esAdminRole,
    tieneRole
}