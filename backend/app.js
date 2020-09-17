
/* Création du serveur avec le framework Express */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

/* Modules de sécurité */
const cors = require('cors');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');
const nocache = require('nocache');
const hpp = require ('hpp');
const session = require('express-session');
const dotenv = require('dotenv').config()
const morgan = require('morgan');

/* Router */
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const likeRouter = require('./routes/like');
const commentRouter = require('./routes/comment');



/* Connexion à la base de donnée MySQL */
const { dbConnection } = require('./config/db');
dbConnection();

/* Lancement du framework Express */
const app = express();

/* Middleware CORS - Ajout de headers à l'objet "response" */
app.use(cors());

/* Sécuriser Express en définissant divers en-têtes HTTP */
app.use(helmet());

/* Désinfecte les inputs contre les injections */
app.use(expressSanitizer());

/* Désactive la mise en cache du navigateur */
app.use(nocache());

/* Protége contre les attaques de pollution des paramètres HTTP */
app.use(hpp());

/* Options de sécurisation des cookies */
const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 heure
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  cookie: { secure: true,
            httpOnly: true,
            domain: 'http://localhost:4000',
            expires: expiryDate
          }
  })
);

/* Morgan - crée un flux d'écriture (en mode ajout) */
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); 
/* Morgan - configurer l'enregistreur */
app.use(morgan('combined', { stream: accessLogStream }));

/* Package body-parser - Extraire l'objet JSON de la demande */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/* Rendre le dossier "images" statique */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* Enregistrement des routes dans l'application */
app.use( userRouter );
app.use( postRouter );
app.use( likeRouter );
app.use( commentRouter );

module.exports = app;