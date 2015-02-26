function outputTable = getCarsOnDate(inputTable, dateFrom, dateTo)
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

    counter=1;
    outputTable = [];
  
    temp = floor(height(inputTable)/2);
    dist = temp;
    
    dateFrom
    inputTable.date(temp)
    
    % Find first line
    while(dateFrom ~= inputTable.date(temp))  
        dist = floor(dist/2);

        if(dateFrom < inputTable.date(temp))
            temp = temp - dist;

        elseif(dateFrom > inputTable.date(temp))
            temp = temp + dist;
        end
    end
    while(dateFrom == inputTable.date(temp))
        temp = temp - 1;
    end 
    first = temp + 1;
    
    % Find last line
    while(dateFrom ~= inputTable.date(temp))  
        dist = floor(dist/2);

        if(dateFrom < inputTable.date(temp))
            temp = temp - dist;

        elseif(dateFrom > inputTable.date(temp))
            temp = temp + dist;
        end
    end
    while(dateFrom == inputTable.date(temp))
        temp = temp + 1;
    end
    last = temp - 1;
    
    outputTable = inputTable(first:last,:);

end

