# SpendTune-Solo-Project

#### Minimalistic personal expense tracker

Once you clone the repo on your machine, navigate to the root folder of the project in your terminal and type:

`npm install`

Repeat the same step for the `ROOT/client/spendtune` path.



My application is integrated with Plaid's open banking API which is used to authorize and connect the user with their banking institutions. 

Plaid's API offers many products however for app needs I'm using 'transactions' to fetch and sync them. Follow these steps:

- To configure the API it's necessary to register an account at:

       [https://dashboard.plaid.com/signup]()

- Now go to your dashboard and select `Developers => Keys` section

- Here you will find your `client_id` and `Secret` keys.

- Go to projects `ROOT/server` and create a `.env` file, make sure to add this file to your `.gitignore` list, as it will store some sensitive data you don't want to expose.

- Populate the `.env` file: 

`PLAID_CLIENT_ID=` client_id from Plaid's dashboard

`PLAID_SECRET=`secret key from Plaid's dashboard

`PLAID_ENV=sandbox`   <= here you specify your environment - sandbox mode allows to fetch mock data from Plaid's mock institutions, so you don't need to worry about leaking your real data.

`PLAID_SANDBOX_REDIRECT_URI=http://localhost:3001`     <= redirect URI for server

`SERVER_PORT=3001`

`SECRET="spendTune"` 



- Now go to your dashboard and select `Developers => API` section.

- Here you need to specify allowed Redirect URIs, same as above in the `.env` file.



Now you're good to go.



NOTE: This project requires mongoDB running on your PC.

NOTE2: It's possible to request development access from PLAID by filling out a form on their page. If you get approved you can actually sync it with your real bank account by changing `PLAID_ENV=development`   
