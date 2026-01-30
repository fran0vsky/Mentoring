### Backend prototype

#### To learn

- REST basics
  - status codes: difference between 2xx, 4xx, 5xx
  - verbs: difference between post, get, put, delete

#### Integrate backend for cats.json (get all cats)

- currently you have single backend endpoint but you need to rename what is there and create own module
  - AppModule should import CatsModule
  - CatsModule should have:
    - CatsController
      - 1 GET method to get all cats
      - it should inject CatsService
        - CatsService should inject Supabase client to connect the postgres db (create account)
          - create Supabase table for cats
  - Change Angular appliation to not use cats.json and call backend endpoint instead (GET localhost:3000/api/cats)
    - provide localhost as part of environment file
  - Make sure the playwright tests are working because they 'stub' cats.json but you should stub the actual backend endpoint

### Integrate backend for random cat

- simialar as above - add new endpoint to CatsModule called GET /api/cats/random
