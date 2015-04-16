import rethinkdb as r

import argparse

db = 't1log'
host = 'localhost'
port = 28015

tables = ['users', 'logs']

parser = argparse.ArgumentParser(description='t1log RethinkDB admin')
parser.add_argument('--drop', dest='drop', action='store_true', default=None, help='Drop the database')

args = parser.parse_args()

# argv for host, port, etc

conn = r.connect(host, port, db)

databases = r.db_list().run(conn)

if args.drop and (db in databases):
    print('Dropping database: {0}'.format(db))
    r.db_drop(db).run(conn)
elif args.drop:
    print('Database {0} does not exist'.format(db))


if not args.drop:

    # create database if not exist
    if not db in databases:
        print('Creating database: {0}'.format(db))
        r.db_create(db).run(conn)

    db_tables = r.table_list().run(conn)

    for table in tables:
        if table not in db_tables:
            print('Creating table: {0}'.format(table))
            r.table_create(table).run(conn)
        else:
            print('Table {0} already exists'.format(table))
