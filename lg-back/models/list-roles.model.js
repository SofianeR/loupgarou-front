const status  = require('./list-status-vie')

const roles = {
    village: {
        villageois: {
            couple: null,
                 status: status.vie,
        }, // 3
        sociere: {
            couple: null,
            status: status.vie,
            potions: {
                vie: 1, 
                mort: 1
            }
        }, 
        chasseur: {
            couple: null,
            status: status.vie,
            balle: 1,
        }, // 1
        voyante: {
            couple: null,
            status: status.vie,
            decouverte: 1
        }
    }, 
    loup: {
        loup_normale: {
            couple: null,
            status: status.vie,
            kill: 1
        }, // 5
    }, 
    solo: {
        loup_blanc: {
            couple: null,
            status: status.vie,
            kill: 1
        }, // 1
     
    }
}

export default roles