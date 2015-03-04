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
        if(dist ~= 1)
            dist = floor(dist/2);
        end
        
        % If date is smaller than temp move upwards
        if(dateFrom < inputTable.date(temp))
            temp = temp - dist;
            %X = ['first less: ' , datestr(inputTable.date(temp))];
            %disp(X);

        % If date is bigger than temp move downwards
        elseif(dateFrom > inputTable.date(temp))
            temp = temp + dist;
            %X = ['first greater: ' , datestr(inputTable.date(temp))];
            %disp(X);
        end
    end
    while(temp>0 && dateFrom == inputTable.date(temp))
        temp = temp - 1;
    end
    first = temp + 1;
    disp('first date found');
    
    % Find last line with dateTo
    temp = floor(height(inputTable)/2);
    dist = temp;
    while(dateTo ~= inputTable.date(temp))  
        if(dist ~= 1)
            dist = floor(dist/2);
        end
            
        % If date is smaller than temp move upwards
        if(dateTo < inputTable.date(temp))
            temp = temp - dist;
            %X = ['second less: ' , datestr(inputTable.date(temp))];
            %disp(X);
        
        % If date is bigger than temp move downwards
        elseif(dateTo > inputTable.date(temp))
            temp = temp + dist;
            %X = ['second greater: ' , datestr(inputTable.date(temp))];
            %disp(X);
        end
    end
    while(temp<height(inputTable) &&  dateTo == inputTable.date(temp))
        temp = temp + 1;
    end
    last = temp - 1;
    disp('second date found');
  
    outputTable = inputTable(first:last,:);

end

