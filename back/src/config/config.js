module.exports = {
    HTTP: {
        RESPONSE: {
            OK: {
                CODE: 200,
                message: 'OK'
            },
            KO: {
                CODE: 400,
              message: "KO"  
            },
            INTERNAL_ERROR: {
                CODE: 500,
                message: 'Une erreur interne est survenue contacter un adminisateur'
            },
            UNAUTHORIZE: {
                CODE: 401
            }
        }
    }
}

