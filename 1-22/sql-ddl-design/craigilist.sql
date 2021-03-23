DROP DATABASE IF EXISTS craigilist;

CREATE DATABASE craigilist;

\c craigilist

CREATE TABLE Category
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
);

CREATE TABLE Member
(
  member_id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
);

CREATE TABLE Region
(
  id SERIAL PRIMARY KEY, 
  name TEXT NOT NULL
);


CREATE TABLE Post
(
  id SERIAL PRIMARY KEY, 
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  member_id INTEGER NOT NULL REFERENCES Member,
  location TEXT NOT NULL,
  region INTEGER NOT NULL REFERENCES Region,
  category INTEGER NOT NULL REFERENCES Category
);




