function outputTable = getCarsOnDate(inputTable, dateFrom, dateTo)
% This functions return a subtable from inputTable with all data 
% from all cars between the two dates dateFrom and dateTo.

% inputTable needs to be sorted by date-time
% dateFrom needs to be before dateTo

    outputTable = [];
  
    % Find first line with dateFrom
    temp = floor(height(inputTable)/2);
    dist = temp;
    while(dateFrom ~= inputTable.date(temp))  
        dist = floor(dist/2);
        
        % If date is smaller than temp move upwards
        if(dateFrom < inputTable.date(temp))
            temp = temp - dist;

        % If date is bigger than temp move downwards
        elseif(dateFrom > inputTable.date(temp))
            temp = temp + dist;
        end
    end
    while(temp>0 && dateFrom == inputTable.date(temp))
        temp = temp - 1;
    end
    first = temp + 1;
    
    % Find last line with dateTo
    temp = floor(height(inputTable)/2);
    dist = temp;
    while(dateFrom ~= inputTable.date(temp))  
        dist = floor(dist/2);
        
        % If date is smaller than temp move upwards
        if(dateFrom < inputTable.date(temp))
            temp = temp - dist;
        
        % If date is bigger than temp move downwards
        elseif(dateFrom > inputTable.date(temp))
            temp = temp + dist;
        end
    end
    while(temp<height(inputTable) &&  dateFrom == inputTable.date(temp))
        temp = temp + 1;
    end
    last = temp - 1;
    
    outputTable = inputTable(first:last,:);

end

