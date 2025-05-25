CREATE Table rangers (
    ranger_id SERIAL PRIMARY KEY,
    "name" VARCHAR(50),
    region VARCHAR(100)
);

CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    common_name VARCHAR(120),
    scientific_name VARCHAR(120),
    discovery_date DATE,
    conservation_status VARCHAR(50)
);

CREATE TABLE sightings(
    sighting_id SERIAL PRIMARY KEY,
    ranger_id INTEGER REFERENCES rangers(ranger_id),
    species_id INTEGER REFERENCES species(species_id),
    sighting_time TIMESTAMP DEFAULT NOW(),
    "location" VARCHAR(102),
    notes TEXT
);

-- Problem 1
INSERT INTO rangers("name", region) VALUES ('Derek Fox', 'Costal Plains');

-- Problem 2
SELECT count(DISTINCT species_id) as unique_species_count FROM sightings;

--Problem 3
SELECT * FROM sightings WHERE location ILIKE '%pass%';

--Problem 4
SELECT r.name, count(*) as total_sightings FROM rangers as r
JOIN sightings as s on r.ranger_id = s.ranger_id
GROUP BY r.ranger_id;

-- Problem 5
SELECT common_name FROM species
LEFT JOIN sightings on species.species_id = sightings.species_id
WHERE sightings.sighting_id IS NULL;

-- Problem 6
SELECT species.common_name, sightings.sighting_time, rangers.name FROM sightings
JOIN species ON species.species_id = sightings.species_id
JOIN rangers on rangers.ranger_id = sightings.ranger_id
ORDER BY sightings.sighting_time DESC
LIMIT 2;

-- Problem 7
UPDATE species
SET discovery_date = discovery_date - INTERVAL '1800 years'
WHERE conservation_status = 'Historic';

-- Problem 8
SELECT sighting_id,
CASE 
    WHEN EXTRACT(HOUR FROM sighting_time) < 12 THEN 'Morning' 
    WHEN EXTRACT(HOUR FROM sighting_time) >= 12 AND EXTRACT(HOUR FROM sighting_time) <= 17 THEN 'Afternoon' 
    ELSE 'Evening'
END AS time_of_day from sightings;

-- Problem 9
DELETE FROM rangers as r
WHERE NOT EXISTS (
    SELECT * FROM sightings
    WHERE r.ranger_id = sightings.ranger_id
)