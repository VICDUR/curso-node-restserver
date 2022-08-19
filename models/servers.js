const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:        '/api/auth',
            buscar:      '/api/buscar',
            categorias:  '/api/categorias',
            productos:   '/api/productos',
            usuario:     '/api/usuarios',
        };

        //conectar a base de datos
        this.conectarDB();
        
        //Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    

    }

    async conectarDB(){
        await dbConnection()
    }


    middlewares(){
        
        //Cors
        this.app.use(cors());

        // lectura  y parseo del body 
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public'));
       
        
    }



    routes(){

        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.buscar, require('../routes/buscar.routes.js'));
        this.app.use(this.path.categorias, require('../routes/catgorias.routes.js'))
        this.app.use(this.path.productos, require('../routes/productos.routes'))
        this.app.use(this.path.usuario, require('../routes/user.routes'));
       
    }



    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

};



module.exports = Server;