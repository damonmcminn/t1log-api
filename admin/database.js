'use strict';

const r = require('rethinkdb');

let options = {
  db: 't1log',
  port: 28015,
  host: 'localhost'
};

let tables = ['users', 'logs'];

r.connect(options)
  .then(function(conn) {

    if (process.argv[2] === 'drop') {
      console.log(`Dropping database: ${options.db}`);
      r.dbDrop(options.db).run(conn)
        .then(process.exit)
        .catch(process.exit);
    } else {
      r.dbList().run(conn)
        .then(function(dbs) {
          // Array#includes of ES7 would be grand...
          if (!dbs.some(function(db) { return db === options.db })) {
            console.log(`Creating database: ${options.db}`);
            return r.dbCreate(options.db).run(conn);
          } else {
            return Promise.resolve();
          }
        })
        .then(function() { return r.tableList().run(conn)})
        .then(function(dbTables) {

          let tasks = tables.filter(function(table) {
            return dbTables.every(function(t) { return t !== table });
          })
          .map(function(table) {
            return r.tableCreate(table).run(conn);
          });


          Promise.all(tasks)
          .then(function(res) {
            let tables = res.map(function(x) {
              return x.config_changes.shift().new_val.name;
            });
            console.log(`Created tables: ${tables}`);
            process.exit();
          });
        })
        .catch(function(err) {
          console.log(err);
          process.exit();
        });
    }
    
});
