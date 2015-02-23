
%%
%String fileName = 'taxi_sthlm_march_2013_5000.csv';
%data = csvimport(fileName);

%%
fileName = 'taxi_sthlm_march_2013.csv';
delimiterIn = ';';

formatSpec = '%u%{yyyy-MM-dd HH:mm:ss}D%f%f%c';

T = readtable(fileName, 'Delimiter', delimiterIn, 'Format', formatSpec);

allTaxisAscendingTime = sortrows(T,2);

%writetable(allTaxisAscendingTime, 'new.csv');

