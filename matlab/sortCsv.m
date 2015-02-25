

%% Read whole file
fileName = 'taxi_sthlm_march_2013_sorted.csv';

%% Create table from file
delimiterIn = ',';

%formatSpec = '%u%{yyyy-MM-dd HH:mm:ss}D%f%f%c';
%formatSpec = '%u%q%f%f%c';
formatSpec = '%u%{yyyy-MM-dd}D%{HH:mm:ss}D%f%f%c';

T = readtable(fileName, 'Delimiter', delimiterIn, 'Format', formatSpec);

%% Sort table on date
allTaxisAscendingTime = sortrows(T,2);


%% Create subtables
% Known indices:
% First of 4 march (monday): 1128106
% Last of 10 march (sunday): 4294860

%fromFourthOfMars = allTaxisAscendingTime(1128106:13272752,:);
%weekOne = allTaxisAscendingTime(1128106:4294860,:);
date = datetime('2013-03-01');
dayOne = getCarsOnDate(allTaxisAscendingTime, date, date);

%% Sort on cars
carsSorted = sortrows(weekOne,1);

%% Take half the sorted cars
% Last of car 10818: 1625403
% Last of car 10279: 547284
% 10033: 64808
halfCarsSorted = carsSorted(1:40000,:);

%%
scaledTable = reduceStillCars(halfCarsSorted);


%% Write to new csv file
%writetable(weekOne, 'weekOne.csv');
%writetable(halfCarsSorted, 'halfCarsSorted.csv');
%writetable(scaledTable, 'scaledTable.csv');
writetable(dayOne, 'dayOne.csv');

