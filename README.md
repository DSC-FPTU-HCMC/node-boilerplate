# BOOK TIME AVAILABLE
Book and share your available time with your friends.

## Prerequisite
- Architecture
- Database
  - [Using sequelize-cli](https://github.com/sequelize/cli)

## Installation
**STEP 1:** Install node dependencies
```bash
npm install
```
**STEP 2:** If you don't have the development.env.sh, follow the below template
```bash
export NODE_ENV="development"

# server
export PORT="3000"
export SSL=""

# database
# export DB_NAME="book-team-available-time"
# export DB_USERNAME="sa"
# export DB_PASSWORD="root@1234"
# export DB_HOST="127.0.0.1"
# export DB_PORT="1433"
# export DB_DIALECT="mssql"

# jwt
export JWT_SECRET=""
export JWT_EXPIRES="60" # 60 minutes
```
**STEP 3:** Create database named **book-team-available-time**

Using SQL Server Management Studio
```sql
CREATE DATABASE "book-team-available-time"
```
Using sequelize-cli
```bash
sequelize db:create
# to drop database
# sequelize db:drop
```
**STEP 4:** Run migration
```bash
sequelize db:migrate
```
**STEP 5:** Start up the application in development mode
```bash
npm run dev
```

## Guideline
### Steps to create a new model and automatically generate a new migration
```bash
# CREATE THE DATABASE MODEL
sequelize model:generate --name Timetable --attributes name:string,description:string
# After creating the model, `timetable.js` and `*-create-time-table.js` will be generated.
# Then get the output from source code explorer
# ./database
# ├── entities
# │   └── timetable.js
# ├── migrations
# │   └── 20200927031300-create-timetable.js
# └── seeds

# RUN MIGRATION TO UPDATE THE DATABASE
sequelize db:migrate
# Checkout the database via your favorite database management studio then you will see the table named `TimeTables` has been created.
# Then get the ouput from command line
# == 20200927031300-create-timetable: migrating =======
# == 20200927031300-create-timetable: migrated (0.046s)
```

### Steps to update a model and create a migration
```bash
# UPDATE THE MODEL
# add `place` field with the data type `STRING` to the Timetable model.

# GENERATE NEW MIGRATION
sequelize migration:generate --name add-place-to-timetable
# Then a new migration file named `*-add-place-to-timetable.js` will be created

# EDIT THE MIGRATION FILE `*-add-place-to-timetable.js`
# Guideline https://sequelize.readthedocs.io/en/latest/docs/migrations/

# RUN MIGRATION
sequelize db:migrate
```

### sequelize-cli commands references
```
sequelize db:migrate                        Run pending migrations
sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
sequelize db:migrate:status                 List the status of all migrations
sequelize db:migrate:undo                   Reverts a migration
sequelize db:migrate:undo:all               Revert all migrations ran
sequelize db:seed                           Run specified seeder
sequelize db:seed:undo                      Deletes data from the database
sequelize db:seed:all                       Run every seeder
sequelize db:seed:undo:all                  Deletes data from the database
sequelize db:create                         Create database specified by configuration
sequelize db:drop                           Drop database specified by configuration
sequelize init                              Initializes project
sequelize init:config                       Initializes configuration
sequelize init:migrations                   Initializes migrations
sequelize init:models                       Initializes models
sequelize init:seeders                      Initializes seeders
sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
sequelize model:generate                    Generates a model and its migration [aliases: model:create]
sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]
```


### Sample use-case diagram
**Feature: Book available time - set available first**
- Actor - in the landing page
- Click create timetable
- Redirect to create-timetable page
- Inside create-timetable page
    - Choose timetable (day, week, month)
    - Choose day
        - If the day has been chosen for the other timetable
            - Yes -> Override
            - No -> Back to create-timetable page
        - If the day include in working day
            - Check the priority
                - High -> Ask before create
                - Medium -> Ask before create
                - Low -> Proceed to create
        - If the day include in holidays
            - Ask before create
                - Yes -> Recommend for activities
                - No
    - Go inside custom timetable and get permalink
        - Copy permalink and share with friend
        - Invite via emails
    - Everyone choose their available time
        - If many people choose their available in a specific time, Ask you to pick the same
            - Yes -> Add available time to timetable
            - No
        - Check if user has choose a specific time multiple time
            - Yes -> Add available time to timetable
            - No
        - Self-custom available time
    - Set the event day
    - Email the email has been set
    - . . .
