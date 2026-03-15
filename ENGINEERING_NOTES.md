## Mini Amazon Search

### Architecture decision

Before starting work on the project, it was important to identify a technology stack in order to get a complete picture of the available technologies being used in the project.

- **Frontend**: React (TypeScript)
- **Backend**: .NET (C#)
- **Database**: Supabase Postgres
- **Deployment**: Vercel (for frontend), Azure (for backend)

**Tradeoffs**: The most important decision was to separate the project into two main parts – frontend and backend. This allows us to scale and optimize the project independently for different deployment environments.
Since React and .NET are familiar topics for me, I decided to pick them for this project in order to quickly deliver a reliable and scalable application.

### Database Design decision

The main task is to develop a search engine for a product catalog, which represents a **read-heavy workload**. With this in mind, it was decided to create a single, denormalized **`products`** table, which allows for fast data access by minimizing the number of **JOIN** operations to zero.

Furthermore, since the task specified features such as **brand** and **category faceted search**, I decided to also create indexes for these parameters in order to speed up data retrieval in O(log n) lookups by using **B-Tree** index tree for brands and **GIN** for the categories array.

**Tradeoffs**: The fastest possible access (+ filtering) to data at the expense of write performance (slower inserts/deletes/updates due to index maintance) and slightly increased storage space (denormalized data + indexes).

