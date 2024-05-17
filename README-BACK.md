# Installation

- installez les libs: `npm install`

- ajoutez un .env:
    
    DATABASE_URI=dburl.com:8080
    PORT=4000
    SECRET_TOKEN=loupGarouToken

- lancer le serveur: `npm run start:dev`

# Routes

    ##Games: 

    - /game/:idUser/create
      
      body : {
        private: boolean,
        password: string || undedfined
      }
      
    - /game/:idUser/join/:idGame
      
      body : {
        private: boolean,
        password: string || undedfined
      }
      
    - /game/:idUser/
      
      body : {
        idGame: string || undefined
      }
      
    ##Users

    - /user/signup
    - /user/signin
    