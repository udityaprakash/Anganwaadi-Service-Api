

const Table =  {

  group:  `CREATE TABLE IF NOT EXISTS group (
      id SERIAL PRIMARY KEY,
      groupCreatorId VARCHAR(30) NOT NULL,
      groupName VARCHAR(40) NOT NULL,
      phoneNumbers VARCHAR(10)[],
      description VARCHAR(255),
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,


    
}

module.exports = Table;