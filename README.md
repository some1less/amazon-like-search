# Amazon-like Faceted Search

<img width="3024" height="668" alt="image" src="https://github.com/user-attachments/assets/b8b6ff73-139a-493b-bb01-6aaa16322417"/>

A full-stack product catalog search engine implementing faceted filtering, pagination, and URL-driven state management. The application operates on a subset of the [Open Food Fact](https://world.openfoodfacts.org/data) dataset containing approximately 10,000 products.

## Deployments

- **Client**: [Vercel Deployment](https://amazon-like-faceted-search-b0p3993op.vercel.app/?page=1)
- **API (Swagger UI)**: [Azure Web App Deployment](https://facetedsearch-c8fuh9bfb4gqc5en.polandcentral-01.azurewebsites.net/swagger/index.html)

*Note: The API is hosted on a free-tier Azure instance (F1). Initial requests may experience a cold start delay.*

## Technology Stack

- **Frontend**: React, TypeScript, React Router
- **Backend**: .NET 8 (C#), ASP.NET Core Web API, Dapper, IMemoryCache
- **Database**: PostgreSQL (Supabase)
- **Data Processing**: Python

## Core Features

- **Text Search**: Implemented via PostgreSQL `pg_trgm` extension and GIN indexes for partial string matching.
- **Faceted Filtering**: Multi-select filtering capabilities for `Brands` and `Categories`.
- **URL State Management**: Search queries, active filters, and pagination parameters are synchronized with the URL to ensure state persistence and shareability.
- **Performance Optimization**: Utilizes In-Memory caching to reduce database load during facet aggregations, and native PostgreSQL array operators (`= ANY`, `&&`) for data retrieval.

## Engineering Notes

A comprehensive overview of the architecture decisions, database design (including denormalization and indexing), and technical tradeoffs is documented in the [ENGINEERING_NOTES.md](./ENGINEERING_NOTES.md) file.

## Local Environment Setup

### Backend API
1. Navigate to the API directory:
```bash
cd src/AmazonSearch.API
```
2. Define the database connection string in `appsettings.Development.json` or via User Secrets.
3. Execute the application:
```bash
dotnet run
```

### Frontend Client
1. Navigate to the client directory:
```bash
cd src/client/
```
2. Install project dependencies:
```bash
npm install
```
3. Define the local API endpoint in a .env file:
```
VITE_API_BASE_URL=http://localhost:5234
```
4. Start the development server:
```bash
npm run dev
```
