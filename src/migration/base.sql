-- create tables
create table if not exists mydb.sports
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    status boolean not null default true,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp
);

create table if not exists mydb.tours
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    sportId int not null,
    status boolean not null default true,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id)
);

create table if not exists mydb.matches
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    tourId int not null,
    status boolean not null default true,
    format varchar(50) not null,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (tourId) references tours(id)
);

-- seed data
insert ignore into mydb.sports (id, name) values (1, 'Cricket');
insert ignore into mydb.sports (id, name) values (2, 'Football');

insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (1, 'Indian Premier League, 2023', 1, '2023-04-09 00:00:00', '2023-05-30 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (2, 'India Super League, 2023', 2, '2023-04-21 00:00:00', '2023-06-20 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (3, 'India Tour of West Indies, 2023', 1, '2023-06-10 00:00:00', '2023-06-29 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (4, 'English Premier League, 2022', 2, '2022-04-09 00:00:00', '2022-05-30 00:00:00');

insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('GT vs RCB', 1, 'T20', '2023-04-09 18:00:00', '2023-04-09 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('CSK vs MI', 1, 'T20', '2023-04-10 18:00:00', '2021-04-10 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('LSG vs KXIP', 1, 'T20', '2023-04-11 18:00:00', '2023-04-11 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('RR vs SRH', 1, 'T20', '2023-04-12 18:00:00', '2023-04-12 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('BLR vs BEN', 2, 'soccer', '2023-04-29 18:00:00', '2023-04-29 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('ATK vs MCFC', 2, 'soccer', '2023-04-21 18:00:00', '2023-04-21 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('KER vs JFC', 2, 'soccer', '2023-04-22 18:00:00', '2023-04-22 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-10 10:00:00', '2023-06-10 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-12 10:00:00', '2023-06-12 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('IND vs WI', 3, 'ODI', '2023-06-14 10:00:00', '2023-06-14 23:00:00');
insert ignore into mydb.matches (name, tourId, format, startTime, endTime) values ('KER vs JFC', 4, 'soccer', '2022-04-09 18:00:00', '2022-04-09 23:00:00');

-- index `name` of `tours` table  (Problem 1)
create index tourNameIdx on mydb.tours (name);

-- create `news` table (Problem 3)
/**
    A news created for a match would necessary belong to its
    corresponding tour and sport while a news created for a tour
    does not imply that the news would belong to a particular 
    match hence the matchId reference to match could stay null.

    The idea to store reference ids of sport, tour and 
    match table is to reduce the API latency while fetching 
    news on either sport/tour/match id. If storing information was made highly
    normalized having two more tables mapping news to tour and another 
    table mapping news to match, while fetching, suppose on tour id
    we would need to join news tour mapping table with news and also 
    since news of match belong to a tour we would need to join news match
    mapping table with match table and add the news result-set from the two queries. 

    This would be inefficient for a system that needs faster Reads
    than Writes. 

    With this model structure the Write latency might increase since on
    adding news for a match we need to fetch corresponding tour and sport
    ids (since ids are indexed so less slower than non indexed), but 
    Reads will be significantly faster. 
    
*/
create table if not exists mydb.news
(
    id int auto_increment not null primary key,
    title varchar(255) not null,
    description text not null,
    sportId int not null,
    tourId int not null,
    matchId int,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id),
    foreign key (tourId) references tours(id),
    foreign key (matchId) references matches(id)
);

 -- seed news data
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('Rohit Hitman', '50 runs in 12 balls', 1, 1, 1);
insert ignore into mydb.news (title, description, sportId, tourId) values ('Virat Victorious', '100 th Century for Virat', 1, 3);
insert ignore into mydb.news (title, description, sportId, tourId) values ('Hardik Pandya Disasspoints !', 'Hardik Pandya rushed to hospital due to minor finger injury. Audience frustrated.', 1, 1);
insert ignore into mydb.news (title, description, sportId, tourId, matchId) values ('Sui Disqualified from WC Finals', 'Cristiano Ronaldo Fails himself and believers.', 2, 4, 11);
