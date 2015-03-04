
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
reducedTable = sortedByDateTime;
date_mon1 = datetime('2013-03-04');
date_mon2 = datetime('2013-03-11');
date_mon3 = datetime('2013-03-18');
date_mon4 = datetime('2013-03-25');
disp('dates for all mondays created');

mon1 = getCarsOnDate(reducedTablesortedByDateTime, date_mon1, date_mon1);
mon2 = getCarsOnDate(reducedTablesortedByDateTime, date_mon2, date_mon2);
mon3 = getCarsOnDate(reducedTablesortedByDateTime, date_mon3, date_mon3);
mon4 = getCarsOnDate(reducedTablesortedByDateTime, date_mon4, date_mon4);
disp('all mondays extracted');

% merge
%mondays = ;
%mondays_sortedbyTime = sortrows(mondays, 3);
%writetable(mondays_sortedbyTime, 'mondays_sortedbyTime.csv');

mondays = [mon1; mon2];
mondays = [mondays; mon3];
mondays = [mondays; mon4];
mondays_sortedbyTime = sortrows(mondays, 3);
writetable(mondays_sortedbyTime, 'mondays_sortedbyTime.csv');

%% GET ALL TUESDAYS
date_tue1 = datetime('2013-03-05');
date_tue2 = datetime('2013-03-12');
date_tue3 = datetime('2013-03-19');
date_tue4 = datetime('2013-03-26');


tue1 = getCarsOnDate(reducedTablesortedByDateTime, date_tue1, date_tue1);
tue2 = getCarsOnDate(reducedTablesortedByDateTime, date_tue2, date_tue2);
tue3 = getCarsOnDate(reducedTablesortedByDateTime, date_tue3, date_tue3);
tue4 = getCarsOnDate(reducedTablesortedByDateTime, date_tue4, date_tue4);

% merge
%tuesdays = ;
%tuesdays_sortedbyTime = sortrows(mondays, 3);
%writetable(tuesdays_sortedbyTime, 'tuesdays_sortedbyTime.csv');
tuesdays = [tue1; tue2];
tuesdays = [tuesdays; tue3];
tuesdays = [tuesdays; tue4];
tuesdays_sortedbyTime = sortrows(tuesdays, 3);
disp('merge complete');
writetable(tuesdays_sortedbyTime, 'tuesdays_sortedbyTime.csv');
disp('file created');


%% GET ALL WEDNESDAYS
date_wed1 = datetime('2013-03-06');
date_wed2 = datetime('2013-03-13');
date_wed3 = datetime('2013-03-20');
date_wed4 = datetime('2013-03-27');


wed1 = getCarsOnDate(reducedTablesortedByDateTime, date_wed1, date_wed1);
wed2 = getCarsOnDate(reducedTablesortedByDateTime, date_wed2, date_wed2);
wed3 = getCarsOnDate(reducedTablesortedByDateTime, date_wed3, date_wed3);
wed4 = getCarsOnDate(reducedTablesortedByDateTime, date_wed4, date_wed4);

% merge
%wednesdays = ;
%wednesdays_sortedbyTime = sortrows(wednesdays, 3);
%writetable(wednesdays_sortedbyTime, 'wednesdays_sortedbyTime.csv');


%% GET ALL THURSDAYS
date_thu1 = datetime('2013-03-07');
date_thu2 = datetime('2013-03-14');
date_thu3 = datetime('2013-03-21');
date_thu4 = datetime('2013-03-28');

thu1 = getCarsOnDate(reducedTablesortedByDateTime, date_thu1, date_thu1);
thu2 = getCarsOnDate(reducedTablesortedByDateTime, date_thu2, date_thu2);
thu3 = getCarsOnDate(reducedTablesortedByDateTime, date_thu3, date_thu3);
thu4 = getCarsOnDate(reducedTablesortedByDateTime, date_thu4, date_thu4);

% merge
%thursdays = ;
%thursdays_sortedbyTime = sortrows(thursdays, 3);
%writetable(thursdays_sortedbyTime, 'thursdays_sortedbyTime.csv');
thursdays = [thu1; thu2];
thursdays = [thursdays; thu3];
thursdays = [thursdays; thu4];
thursdays_sortedbyTime = sortrows(thursdays, 3);
disp('merge complete');
writetable(thursdays_sortedbyTime, 'thursdays_sortedbyTime.csv');
disp('file created');

%% GET ALL FRIDAYS
date_fri1 = datetime('2013-03-08');
date_fri2 = datetime('2013-03-15');
date_fri3 = datetime('2013-03-22');
date_fri4 = datetime('2013-03-29');

fri1 = getCarsOnDate(reducedTablesortedByDateTime, date_fri1, date_fri1);
fri2 = getCarsOnDate(reducedTablesortedByDateTime, date_fri2, date_fri2);
fri3 = getCarsOnDate(reducedTablesortedByDateTime, date_fri3, date_fri3);
fri4 = getCarsOnDate(reducedTablesortedByDateTime, date_fri4, date_fri4);

% merge
%fridays = ;
%fridays_sortedbyTime = sortrows(fridays, 3);
%writetable(fridays_sortedbyTime, 'fridays_sortedbyTime.csv');
fridays = [fri1; fri2];
fridays = [fridays; fri3];
fridays = [fridays; fri4];
fridays_sortedbyTime = sortrows(fridays, 3);
disp('merge complete');
writetable(fridays_sortedbyTime, 'fridays_sortedbyTime.csv');
disp('file created');

%% GET ALL SATURDAYS
date_sat1 = datetime('2013-03-09');
date_sat2 = datetime('2013-03-16');
date_sat3 = datetime('2013-03-23');
date_sat4 = datetime('2013-03-30');

sat1 = getCarsOnDate(reducedTablesortedByDateTime, date_sat1, date_sat1);
disp('sat1 done');
sat2 = getCarsOnDate(reducedTablesortedByDateTime, date_sat2, date_sat2);
disp('sat2 done');
sat3 = getCarsOnDate(reducedTablesortedByDateTime, date_sat3, date_sat3);
disp('sat3 done');
sat4 = getCarsOnDate(reducedTablesortedByDateTime, date_sat4, date_sat4);
disp('sat4 done');

% merge
%saturdays = ;
%saturdays_sortedbyTime = sortrows(saturdays, 3);
%writetable(saturdays_sortedbyTime, 'saturdays_sortedbyTime.csv');
saturdays = [sat1; sat2];
saturdays = [saturdays; sat3];
saturdays = [saturdays; sat4];
saturdays_sortedbyTime = sortrows(saturdays, 3);
disp('merge complete');
writetable(saturdays_sortedbyTime, 'saturdays_sortedbyTime.csv');
disp('file created');
%%



%% GET ALL SUNDAYS
date_sun1 = datetime('2013-03-10');
date_sun2 = datetime('2013-03-17');
date_sun3 = datetime('2013-03-24');
date_sun4 = datetime('2013-03-31');

sun1 = getCarsOnDate(reducedTablesortedByDateTime, date_sun1, date_sun1);
sun2 = getCarsOnDate(reducedTablesortedByDateTime, date_sun2, date_sun2);
sun3 = getCarsOnDate(reducedTablesortedByDateTime, date_sun3, date_sun3);
sun4 = getCarsOnDate(reducedTablesortedByDateTime, date_sun4, date_sun4);

% merge
%sundays = ;
%sundays_sortedbyTime = sortrows(sundays, 3);
%writetable(sundays_sortedbyTime, 'sundays_sortedbyTime.csv');
sundays = [sun1; sun2];
sundays = [sundays; sun3];
sundays = [sundays; sun4];
sundays_sortedbyTime = sortrows(sundays, 3);
disp('merge complete');
writetable(sundays_sortedbyTime, 'sundays_sortedbyTime.csv');
disp('file created');

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
writetable(reducedTablesortedByDateTime, 'reducedTable_sortedbyDateTime.csv');
disp('file created');
