--clear
-- D:\dev\python\somapi\soma.db

drop table content_sections;
drop table content_main;
drop table content_extra;
drop table content_detail;
drop table content_centers;
drop table content;

drop table centers_users;
drop table users;
drop table roles;

drop table centers_levels;

drop table centers;
drop table subjects;
drop table forms;
drop table levels;

drop table config;


update content_sections set end=40 where id in(1,3);