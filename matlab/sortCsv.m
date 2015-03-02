
%% READ FILE TO TABLE

% Chose file
fileName = 'taxi.csv';
disp('filename chosen');

% Set delimeter
%delimiterIn = ',';
delimiterIn = ';';
disp('delimeter set');

% Set format
% If date and time are separated
formatSpec = '%u%{yyyy-MM-dd}D%{HH:mm:ss}D%f%f%c';
% If date and time are not separated
%formatSpec = '%u%{yyyy-MM-dd HH:mm:ss}D%f%f%c';
disp('format set');

% Create table
T = readtable(fileName, 'Delimiter', delimiterIn, 'Format', formatSpec);
disp('table created');

%% SORTING TABLE BY FRIST DATE, SECOND TIME
% DATE AND TIME SEPARATED!

% Sort table by time
sortedByTime = sortrows(T, 3);
disp('sorted by time');

% Sort table on date
sortedByDateTime = sortrows(sortedByTime, 2);
disp('sorted by date-time');

%% REMOVE TAXIS THAT STANDS STILL
sortedByTaxiID = sortrows(sortedByDateTime, 1);
reducedTable = reduceStillCars(sortedByTaxiID);
disp('cars standing still removed');

%% GET ALL MONDAYS
date_mon1 = datetime('2013-03-04');
date_mon2 = datetime('2013-03-11');
date_mon3 = datetime('2013-03-18');
date_mon4 = datetime('2013-03-25');

mon1 = getCarsOnDate(reducedTable, date_mon1, data_mon1);
mon2 = getCarsOnDate(reducedTable, date_mon2, data_mon2);
mon3 = getCarsOnDate(reducedTable, date_mon3, data_mon3);
mon4 = getCarsOnDate(reducedTable, date_mon4, data_mon4);

% merge
%mondays = ;
%mondays_sortedbyTime = sortrows(mondays, 3);
%writetable(mondays_sortedbyTime, 'mondays_sortedbyTime.csv');

%% GET ALL TUESDAYS
date_tue1 = datetime('2013-03-05');
date_tue2 = datetime('2013-03-12');
date_tue3 = datetime('2013-03-19');
date_tue4 = datetime('2013-03-26');

tue1 = getCarsOnDate(reducedTable, date_tue1, data_tue1);
tue2 = getCarsOnDate(reducedTable, date_tue2, data_tue2);
tue3 = getCarsOnDate(reducedTable, date_tue3, data_tue3);
tue4 = getCarsOnDate(reducedTable, date_tue4, data_tue4);

% merge
%tuesdays = ;
%tuesdays_sortedbyTime = sortrows(mondays, 3);
%writetable(tuesdays_sortedbyTime, 'tuesdays_sortedbyTime.csv');

%% GET ALL WEDNESDAYS
date_wed1 = datetime('2013-03-06');
date_wed2 = datetime('2013-03-13');
date_wed3 = datetime('2013-03-20');
date_wed4 = datetime('2013-03-27');

wed1 = getCarsOnDate(reducedTable, date_wed1, data_wed1);
wed2 = getCarsOnDate(reducedTable, date_wed2, data_wed2);
wed3 = getCarsOnDate(reducedTable, date_wed3, data_wed3);
wed4 = getCarsOnDate(reducedTable, date_wed4, data_wed4);

% merge
%wednesdays = ;
%wednesdays_sortedbyTime = sortrows(wednesdays, 3);
%writetable(wednesdays_sortedbyTime, 'wednesdays_sortedbyTime.csv');

%% GET ALL THURSDAYS
date_thu1 = datetime('2013-03-07');
date_thu2 = datetime('2013-03-14');
date_thu3 = datetime('2013-03-21');
date_thu4 = datetime('2013-03-28');

thu1 = getCarsOnDate(reducedTable, date_thu1, data_thu1);
thu2 = getCarsOnDate(reducedTable, date_thu2, data_thu2);
thu3 = getCarsOnDate(reducedTable, date_thu3, data_thu3);
thu4 = getCarsOnDate(reducedTable, date_thu4, data_thu4);

% merge
%thursdays = ;
%thursdays_sortedbyTime = sortrows(thursdays, 3);
%writetable(thursdays_sortedbyTime, 'thursdays_sortedbyTime.csv');

%% GET ALL FRIDAYS
date_fri1 = datetime('2013-03-08');
date_fri2 = datetime('2013-03-15');
date_fri3 = datetime('2013-03-22');
date_fri4 = datetime('2013-03-29');

fri1 = getCarsOnDate(reducedTable, date_fri1, data_fri1);
fri2 = getCarsOnDate(reducedTable, date_fri2, data_fri2);
fri3 = getCarsOnDate(reducedTable, date_fri3, data_fri3);
fri4 = getCarsOnDate(reducedTable, date_fri4, data_fri4);

% merge
%fridays = ;
%fridays_sortedbyTime = sortrows(fridays, 3);
%writetable(fridays_sortedbyTime, 'fridays_sortedbyTime.csv');

%% GET ALL SATURDAYS
date_sat1 = datetime('2013-03-09');
date_sat2 = datetime('2013-03-16');
date_sat3 = datetime('2013-03-23');
date_sat4 = datetime('2013-03-30');

sat1 = getCarsOnDate(reducedTable, date_sat1, data_sat1);
sat2 = getCarsOnDate(reducedTable, date_sat2, data_sat2);
sat3 = getCarsOnDate(reducedTable, date_sat3, data_sat3);
sat4 = getCarsOnDate(reducedTable, date_sat4, data_sat4);

% merge
%saturdays = ;
%saturdays_sortedbyTime = sortrows(saturdays, 3);
%writetable(saturdays_sortedbyTime, 'saturdays_sortedbyTime.csv');

%% GET ALL SUNDAYS
date_sun1 = datetime('2013-03-10');
date_sun2 = datetime('2013-03-17');
date_sun3 = datetime('2013-03-24');
date_sun4 = datetime('2013-03-31');

sun1 = getCarsOnDate(reducedTable, date_sun1, data_sun1);
sun2 = getCarsOnDate(reducedTable, date_sun2, data_sun2);
sun3 = getCarsOnDate(reducedTable, date_sun3, data_sun3);
sun4 = getCarsOnDate(reducedTable, date_sun4, data_sun4);

% merge
%sundays = ;
%sundays_sortedbyTime = sortrows(sundays, 3);
%writetable(sundays_sortedbyTime, 'sundays_sortedbyTime.csv');

%% SUBTALBE First week
firstDateWeekOne = datetime('2013-03-04');
lastDateWeekOne = datetime('2013-03-10');
disp('dates for week one created');

% WARNING: HEAVY FUNCTION
weekOne = getCarsOnDate(sortedByDateTime, firstDateWeekOne, lastDateWeekOne);
disp('table for week one created');

%% SUBTALBE Second week
firstDateWeekTwo = datetime('2013-03-11');
lastDateWeekTwo = datetime('2013-03-17');
disp('dates for week two created');

% WARNING: HEAVY FUNCTION
weekTwo = getCarsOnDate(sortedByDateTime, firstDateWeekTwo, lastDateWeekTwo);
disp('table for week two created');

%% SUBTALBE Third week
firstDateWeekThree = datetime('2013-03-18');
lastDateWeekThree = datetime('2013-03-24');
disp('dates for week three created');

% WARNING: HEAVY FUNCTION
weekThree = getCarsOnDate(sortedByDateTime, firstDateWeekThree, lastDateWeekThree);
disp('table for week three created');

%% SUBTALBE Fourth week
firstDateWeekFour = datetime('2013-03-25');
lastDateWeekFour = datetime('2013-03-31');
disp('dates for week four created');

% WARNING: HEAVY FUNCTION
weekFour = getCarsOnDate(sortedByDateTime, firstDateWeekFour, lastDateWeekFour);
disp('table for week Four created');
%% SUBTABLE Day one
% Day one
date = datetime('2013-03-01');
disp('date for day one created');

% WARNING: HEAVY FUNCTION
dayOne = getCarsOnDate(sortedByDateTime, date, date);
disp('table for day one created');


%% SORTING BY CARS
weekOneSortedByCars = sortrows(weekOne,1);
disp('weekOne sorted by cars');
weekTwoSortedByCars = sortrows(weekTwo,1);
disp('weekTwo sorted by cars');
weekThreeSortedByCars = sortrows(weekThree,1);
disp('weekThree sorted by cars');
weekFourSortedByCars = sortrows(weekFour,1);
disp('weekFour sorted by cars');
%dayOneSortedByCars = sortrows(dayOne, 1);
%disp('dayOne sorted by cars');

%% Take half the sorted cars
%h = height(dayOneSortedByCars);
%halfCarsSorted = weekOneSortedByCars(1:floor(h/2),:);
%disp('halved table');




%% Write to new csv file
%writetable(weekOne, 'weekOne.csv');
%writetable(weekTwo, 'weekTwo.csv');
%writetable(weekThree, 'weekThree.csv');
%writetable(weekFour, 'weekFour.csv');
%writetable(halfCarsSorted, 'halfCarsSorted.csv');
%writetable(scaledTable, 'scaledTable.csv');
%writetable(dayOne, 'dayOne.csv');
writetable(sortedByDateTime, 'taxi_sortedbyDateTime.csv');
disp('file created');
