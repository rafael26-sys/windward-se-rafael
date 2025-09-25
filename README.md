# Windward SE Assignment – Rafael

## What’s included
- Node/Express server (no DB; in-memory JSON)
- Endpoints: /fleets, /fleets/:id/vessels, /search (AND: name, flag, mmsi)
- React SPA: fleets table (sortable), fleet page with vessels table + map + search

## Run
npm start

- Server: http://localhost:3001
- Frontend: http://localhost:3001/
- Health: http://localhost:3001/health

## Endpoints
- GET /fleets → [{ _id, name, count }]
- GET /fleets/:id/vessels → [{ _id, name, mmsi, flag, reported_port, lastpos }]
- GET /search?name=&flag=&mmsi= → same vessel shape; AND across provided fields

## Assumptions / choices
- Data loaded from JSON into memory per brief (no DB)
- Hash routing on client to avoid extra tooling
- MapLibre tiles for open map; markers show vessel popup
- MMSI uses “startsWith” to allow partial matches

## Possible extensions
- Auto-refresh button (polling) to simulate “refresh API”
- Fit-bounds on markers, debounced search
- Server pagination for large fleets
