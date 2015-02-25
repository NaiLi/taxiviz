function outputTable = getCarsOnDate(inputTable, dateFrom, dateTo)
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

    counter=1;
    outputTable = [];
    
    while(counter < size(inputTable,1))
        
        if(inputTable.date(counter) >= dateFrom && inputTable.date(counter) <= dateTo)
            
            newRow = inputTable(counter,:);
            outputTable = [outputTable; newRow];
        
        elseif(inputTable.date(counter) > dateTo)
            break;
        end
        counter = counter+1;
    end
end

