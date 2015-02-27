
%% READ FILE TO TABLE

% Chose file
fileName = 'taxi_sthlm_march_2013_sorted.csv';
disp('filename chosen');

% Set delimeter
delimiterIn = ',';
disp('delimeter set');

% Set format
formatSpec = '%u%{yyyy-MM-dd}D%{HH:mm:ss}D%f%f%c';
disp('format set');

% Create table
T = readtable(fileName, 'Delimiter', delimiterIn, 'Format', formatSpec);
disp('table created');

%% SORTING TABLE BY FRIST DATE, SECOND TIME

% Sort table by time
sortedByTime = sortrows(T, 3);
disp('sorted by time');

% Sort table on date
sortedByDateTime = sortrows(sortedByTime, 2);
disp('sorted by date');

%% SUBTALBE First week
firstDateWeekOne = datetime('2013-03-05');
lastDateWeekOne = datetime('2013-03-10');
disp('dates for week one created');

% WARNING: HEAVY FUNCTION
weekOne = getCarsOnDate(sortedByDateTime, firstDateWeekOne, lastDateWeekOne);
disp('table for week one created');

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
dayOneSortedByCars = sortrows(dayOne, 1);
disp('dayOne sorted by cars');

%% Take half the sorted cars
h = height(dayOneSortedByCars);
halfCarsSorted = weekOneSortedByCars(1:floor(h/2),:);
disp('halved table');

%%
scaledTable = reduceStillCars(halfCarsSorted);
disp('cars standing still removed');


%% Write to new csv file
%writetable(weekOne, 'weekOne.csv');
%writetable(halfCarsSorted, 'halfCarsSorted.csv');
%writetable(scaledTable, 'scaledTable.csv');
writetable(dayOne, 'dayOne.csv');
disp('file created');
