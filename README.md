# Windward SE Assignment – Rafael Perel

Technical assignment for the Windward SE role, including Node.js server and React client with fleets, vessels, search, and map visualization.

Part 1: Customer Interaction

Question 1 – First Initial Response

Dear Windward User,

Thank you for reporting the mismatch between Hambantota (LKHBA) and Colombo (LKCMB) and for attaching the two JSON files. I appreciate you taking the time to bring this to our attention, as it helps us ensure the data you rely on is accurate and reliable.

I’m currently reviewing the payloads and cross-checking them against our most up-to-date vessel data (MMSI/IMO-based) and position history. Once I confirm which value is correct, I’ll provide a clear explanation of the cause along with the next steps to resolve it.

To make sure we’re aligned on the exact vessel, could you confirm the MMSI/IMO you’re tracking? That will help us give you the clearest answer.

I look forward to your reply, and I thank you for your patience as we work this out together.

Sincerely,  
Rafael  
Windward Support Team  

⸻

Question 2 – Full Answer & Solution

Dear Windward User,

Thanks for your patience, and I’m happy to be of assistance. After reviewing the two payloads you shared, the difference comes down to timing. Our system had already updated the vessel’s destination to Colombo (LKCMB) based on the latest AIS signals and track, while your system was still holding the earlier Hambantota (LKHBA) entry. For a short while, the two systems were out of sync.

The evidence for this is that the vessel in question has MMSI 356260000. Your file shows Hambantota (LKHBA) with a timestamp of 2025-09-23T10:42:00Z, while our API shows Colombo (LKCMB) with the newer timestamp 2025-09-23T13:05:12Z. Because our record is more recent, Colombo is the correct destination.

On our side, I’ve already refreshed the data from the API so the Hambantota value clears and Colombo appears correctly. On your side, the best way to prevent this type of issue in the future is to add a safeguard. In other words, when your system checks the “next port,” it should also look at the timestamp. If the data is older than a set number of hours, have it automatically call our API again before displaying it. This way, your system always stays aligned with the most up-to-date information.

Thank you again for bringing this to our attention, and please let me know if you’d like any further clarification. I look forward to hearing from you and appreciate your patience as we work to ensure everything is accurate together.

Sincerely,  
Rafael  
Windward Support Team  

⸻

Part 2: SQL
	
1.	Show all the names of employees that own more than 3 keyboards:

SELECT first_name, last_name FROM EmployeeData WHERE number_of_keyboards > 3;

Result: Melisa Vingoblat, Olga Perez, Melisa Morrel.
	
2.	Show the names and number of screens of all employees named Melisa:

The EmployeeData table includes "number of keyboards" but does NOT include a "number of screens" column. 
I therefore used the available field:

SELECT first_name, last_name, number_of_keyboards FROM EmployeeData WHERE first_name = 'Melisa';

⸻

Part 3: Technical Assignment – Code

Phase 1
Implemented a Node.js server that loads the fleets.json, vessels.json, and vesselLocations.json files into memory.
Added a route /fleets to return each fleet’s name and vessel count.
Built a React SPA client that displays the fleets in a sortable table.

Phase 2 – Fleet page
Added a route /fleets/:id/vessels to return the vessels belonging to a specific fleet.
Clicking on a fleet in the main page navigates to a fleet page.
The fleet page shows a sortable table of vessels and a map displaying all vessel locations.
Clicking a vessel marker on the map opens a popup with vessel information and location details.

Phase 3 – Filtering
Added a server route /search?name=&flag=&mmsi= to filter vessels by name, flag, and MMSI using AND logic.
Added a search section at the top of the fleet page with inputs for name, flag, and MMSI.
When a search is performed, the results filter both the vessels table and the map.


⸻

Running the app

From the repo root:

npm install --prefix server && npm start

App runs at: http://localhost:3001

Health check: http://localhost:3001/health
Endpoints: /fleets, /fleets/:id/vessels, /search

⸻

Design choices
Data is stored in memory per instructions (no database).
The client is implemented as a simple single-page app in client/index.html.
Search is implemented with AND across filters, with partial match allowed for MMSI.
The map is rendered with MapLibre using open map tiles.

⸻

## Repository layout

```text
windward-se-rafael/
├── client/
│   └── index.html
├── server/
│   ├── data/
│   │   ├── fleets.json
│   │   ├── vessels.json
│   │   └── vesselLocations.json
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
