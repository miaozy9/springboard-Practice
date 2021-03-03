DROP DATABASE IF EXISTS soccer;
CREATE DATABASE soccer;
\c soccer
CREATE TABLE Team
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
  matchesAttended text
);
CREATE TABLE Player
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL,
  team INT NOT NULL REFERENCES team_id,
  DOB text NOT NULL
);

CREATE TABLE Goal
(
  id SERIAL PRIMARY KEY, 
  time text NOT NULL,
  matchId INT REFERENCES match_id
);
CREATE TABLE Referee
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
);
CREATE TABLE Join
(
  id SERIAL PRIMARY KEY, 
  playerId INT REFERENCES player_id,
  matchId INT REFERENCES match_id,
  refereeId INT REFERENCES referee_id,
);
CREATE TABLE Match
(
  id SERIAL PRIMARY KEY, 
  homeTeam int REFERENCES team_id,
  awayTeam int REFERENCES team_id
);
CREATE TABLE League
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
  match REFERENCES match_id
);
CREATE TABLE Season
(
  id SERIAL PRIMARY KEY, 
  startDate TEXT NOT NULL,
  endDate TEXT NOT NULL,
  leaguesInSeason INT NOT NULL REFERENCES league_id
);