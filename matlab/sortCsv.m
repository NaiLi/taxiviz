

%% Read whole file
fileName = 'taxi_sthlm_march_2013.csv';

%% Create table from file
delimiterIn = ';';

%formatSpec = '%u%{yyyy-MM-dd HH:mm:ss}D%f%f%c';
formatSpec = '%u%q%f%f%c';

T = readtable(fileName, 'Delimiter', delimiterIn, 'Format', formatSpec);

%% Sort table on date
allTaxisAscendingTime = sortrows(T,2);


%% Create subtables
% Known indices:
% First of 4 march (monday): 1128106
% Last of 10 march (sunday): 4294860

%fromFourthOfMars = allTaxisAscendingTime(1128106:13272752,:);
weekOne = allTaxisAscendingTime(1128106:4294860,:);

%% Sort on cars
carsSorted = sortrows(weekOne,1);

%% Take half the sorted cars
halfCarsSorted = carsSorted(1:1625403,:);


%% Write to new csv file
%writetable(weekOne, 'weekOne.csv');
writetable(halfCarsSorted, 'halfCarsSorted.csv');

