const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');   // require cors first

const app = express();
app.use(cors());                // then apply it

const DATA_DIR = path.join(__dirname, 'data');
const readJSON = (name) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, name)));

// Load data in-memory (per assignment, no DB)
const fleets = readJSON('fleets.json');
const vessels = readJSON('vessels.json');
const locations = readJSON('vesselLocations.json');

const vesselsById = new Map(vessels.map(v => [v._id, v]));
const locationsById = new Map(locations.map(l => [l._id, l.lastpos]));

// Health (handy for graders)
app.get('/health', (_req, res) => {
  res.json({ ok: true, fleets: fleets.length, vessels: vessels.length, locations: locations.length });
});

// Phase 1: fleets with basic info (name & vessels count)
app.get('/fleets', (_req, res) => {
  const rows = fleets.map(f => ({
    _id: f._id,
    name: f.name,
    count: Array.isArray(f.vessels) ? f.vessels.length : 0
  }));
  res.json(rows);
});

// Phase 2: vessels of a specific fleet (table + map data)
app.get('/fleets/:id/vessels', (req, res) => {
  const fleet = fleets.find(f => f._id === req.params.id);
  if (!fleet) return res.status(404).json({ error: 'Fleet not found' });

  const rows = (fleet.vessels || []).map(ref => {
    const v = vesselsById.get(ref._id) || {};
    const lastpos = locationsById.get(ref._id) || null;
    return {
      _id: ref._id,
      name: v.name ?? null,
      mmsi: v.mmsi ?? null,
      flag: v.flag ?? null,
      reported_port: v.reported_port ?? null,
      lastpos // { ts, geometry:{coordinates:[lon,lat]}, sog, course } or null
    };
  });

  res.json(rows);
});

// Phase 3: search (AND across name, flag, mmsi)
app.get('/search', (req, res) => {
  const { name, flag, mmsi } = req.query;

  const matches = v => {
    if (name && !String(v.name || '').toLowerCase().includes(String(name).toLowerCase())) return false;
    if (flag && !String(v.flag || '').toLowerCase().includes(String(flag).toLowerCase())) return false;
    if (mmsi && !String(v.mmsi || '').startsWith(String(mmsi))) return false;
    return true;
  };

  const rows = [];
  for (const [id, v] of vesselsById.entries()) {
    if (matches(v)) {
      rows.push({
        _id: id,
        name: v.name ?? null,
        mmsi: v.mmsi ?? null,
        flag: v.flag ?? null,
        reported_port: v.reported_port ?? null,
        lastpos: locationsById.get(id) || null
      });
    }
  }
  res.json(rows);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
