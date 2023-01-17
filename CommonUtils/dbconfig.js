var dbConfig = {
    // server: "reflexion-audio.centralindia.cloudapp.azure.com",
    // user: "reflexion",
    // password: "0E$#p3z5bZ29",
    // database: "DemoDB",
    // options:{
    //     trustedconnection: true,
    //     enableArithAbort : true,
    //     trustServerCertificate: true,
    //     instancename :'MSSQLSERVER'
    // },
    // port : 1433
    server: "127.0.0.1",
    user: "sa",
    password: "sa",
    database: "DemoDB",
    options:{
        trustedconnection: true,
        enableArithAbort : true,
        trustServerCertificate: true,
        instancename :'MSSQLSERVER'
    },
    port : 1433
};

module.exports = dbConfig; 