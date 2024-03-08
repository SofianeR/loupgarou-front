const status  = require('./list-status-vie')

const roles = {
    village: {
        villageois: {
            id: 1,
            couple: null,
                 status: status.vie,
        }, // 3
        sociere: {
            id:2,
            couple: null,
            status: status.vie,
            potions: {
                vie: 1, 
                mort: 1
            }
        }, 
        chasseur: {
            id:3,
            couple: null,
            status: status.vie,
            balle: 1,
        }, // 1
        voyante: {
            id:4,
            couple: null,
            status: status.vie,
            decouverte: 1
        }
    }, 
    loup: {
        loup_normale: {
            id:5,
            couple: null,
            status: status.vie,
            kill: 1
        }, // 5
    }, 
    solo: {
        loup_blanc: {
            id:6,
            couple: null,
            status: status.vie,
            kill: 1
        }, // 1
     
    }
}

export default roles