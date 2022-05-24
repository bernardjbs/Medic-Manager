# Project-2
##How to contribute

### To initially download
```
clone git@github.com:bernardjbs/Project-2.git
```

### How to move to a new branch for new work (do before adding adding new info to staging area once the repo is clones/pulled)
```
git checkout -b branch_name
```

### Subsequent updates
```
git pull (any changes)
git add -A (new work on your computer)
git commit (Description of work)
git push -u [your branch name]
```


## How to run application from command line for testing

Credentials
```
Head to file .env
Input credentials
```

Dependencies
```
Install dependencies
npm i
```

Database
```
Change directory to /db
mysql -u root password
```
```
Create Database
SOURCE schema.sql
```

Seed
```
Seed database from command line (not mysql)
npm run seed
```

Begin Application
```
Use nodemon
npm run watch
```
OR
```
Start application
npm start
```

## File Structure Breakdown

Config -> 
```
Server connection
```

Controllers -> 
```
Requests & database querying
```

DB -> 
```
Establish database
```

Models -> 
```
Hold model(database table info)
```

Public -> 
```
Hold information that will be utilized on the front end
```

Seeds -> 
```
Hold information that will be imported into models (the tables that are created) for testing or initial establishment of information.
```

Utils -> 
```
Utilized by the view to handle login requests, or data manipulation
```

Views -> 
```
Handlebars templating folder
```