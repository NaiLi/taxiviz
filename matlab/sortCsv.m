
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

%% SORTING TABLE BY FRIST DATE, SECOND TIME
% DATE AND TIME *NOT* SEPARATED

% Sort table on date
sortedByDateTime = sortrows(T, 2);
disp('sorted by date-time');
%% SUBTALBE First week
firstDateWeekOne = datetime('2013-03-04');
lastDateWeekOne = datetime('2013-03-10');
disp('dates for week one created');

% WARNING: HEAVY FUNCTION
weekOne = getCarsOnDate(sortedByDateTime, firstDateWeekOne, lastDateWeekOne);
disp('table for week one created');

%% SUBTALBE Second week
firstDateWeekTwo = datetime('2013-03-011');
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
h = height(dayOneSortedByCars);
halfCarsSorted = weekOneSortedByCars(1:floor(h/2),:);
disp('halved table');

%%
scaledTable = reduceStillCars(halfCarsSorted);
disp('cars standing still removed');


%% Write to new csv file
writetable(weekOne, 'weekOne.csv');
writetable(weekTwo, 'weekTwo.csv');
writetable(weekThree, 'weekThree.csv');
writetable(weekFour, 'weekFour.csv');
%writetable(halfCarsSorted, 'halfCarsSorted.csv');
%writetable(scaledTable, 'scaledTable.csv');
%writetable(dayOne, 'dayOne.csv');
disp('file created');
