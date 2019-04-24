db.createUser(
    {
        user: "admin",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "defaultDB"
            }
        ]
    }
);


testsDB = db.getSiblingDB('testsDB');

testsDB.createUser(
    {
        user: "tests",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "testsDB"
            }
        ]
    }
);

