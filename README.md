Windward SE Assignment – Rafael Perel
____

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

____

Question 2 – Full Answer & Solution

Dear Windward User,

Thanks for your patience, and I’m happy to be of assistance. After reviewing the two payloads you shared, the difference comes down to timing. Our system had already updated the vessel’s destination to Colombo (LKCMB) based on the latest AIS signals and track, while your system was still holding the earlier Hambantota (LKHBA) entry. For a short while, the two systems were out of sync.

The evidence for this is that the vessel in question has MMSI 356260000. Your file shows Hambantota (LKHBA) with a timestamp of 2025-09-23T10:42:00Z, while our API shows Colombo (LKCMB) with the newer timestamp 2025-09-23T13:05:12Z. Because our record is more recent, Colombo is the correct destination.

On our side, I’ve already refreshed the data from the API so the Hambantota value clears and Colombo appears correctly. On your side, the best way to prevent this type of issue in the future is to add a safeguard. In other words, when your system checks the “next port,” it should also look at the timestamp. If the data is older than a set number of hours, have it automatically call our API again before displaying it. This way, your system always stays aligned with the most up-to-date information.

Thank you again for bringing this to our attention, and please let me know if you’d like any further clarification. I look forward to hearing from you and appreciate your patience as we work to ensure everything is accurate together.

Sincerely,
Rafael
Windward Support Team

____

Part 2: SQL
	1.	Show all the names of employees that own more than 3 keyboards:
SELECT first_name, last_name FROM EmployeeData WHERE number_of_keyboards > 3;

Result: Melisa Vingoblat, Olga Perez, Melisa Morrel.
	2.	Show the names and number of screens of all employees named Melisa:

The table provided includes number_of_keyboards but does not include number_of_screens. I therefore used the available field:
SELECT first_name, last_name, number_of_keyboards FROM EmployeeData WHERE first_name = 'Melisa';

____

Part 3: Technical Assignment – Code

Phase 1
	•	Implemented a Node.js server that loads fleets, vessels, and vesselLocations JSON into memory.
	•	Added route /fleets to return fleet name and vessel count.
	•	React SPA client shows fleets in a sortable table.

Phase 2 – Fleet page
	•	Added route /fleets/:id/vessels to return vessels in a fleet.
	•	Clicking a fleet shows a page with:
	•	Sortable table of vessels
	•	Map displaying vessel locations
	•	Popups with vessel info when clicking markers

Phase 3 – Filtering
	•	Added route /search?name=&flag=&mmsi= to filter vessels by name, flag, and MMSI with AND logic.
	•	Fleet page includes search inputs.
	•	Results filter both the vessels table and the map.

____

Running the app

From the repo root:
npm install --prefix server && npm start

App runs at:
	•	http://localhost:3001
	•	Health: http://localhost:3001/health
	•	Endpoints: /fleets, /fleets/:id/vessels, /search

____

Design choices
	•	Data stored in memory per instructions (no DB).
	•	Simple hash routing in one client/index.html.
	•	Search is AND across filters, with partial match for MMSI.
	•	Map rendered with MapLibre for open tiles.

____

Repository layout
	•	client/index.html
	•	server/index.js
	•	package.json (root)
	•	data/fleets.json
	•	data/vessels.json
	•	data/vesselLocations.json
	•	README.md
