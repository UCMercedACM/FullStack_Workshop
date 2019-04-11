CREATE TABLE date(
    f_id INTEGER PRIMARY KEY,
    f_date varchar(20), 
    f_time varchar(15),
    f_truckID varchar(30)
);

CREATE TABLE inspection(
    i_id INTEGER PRIMARY KEY,
    i_truckID varchar(30),
    i_battery varchar(30),
    i_starter varchar(30),
    i_clutch varchar(30),
    i_comment varchar(2000)
);