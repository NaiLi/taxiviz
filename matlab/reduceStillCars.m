function outputTable = reduceStillCars(inputTable)
%UNTITLED4 Summary of this function goes here
%   Detailed explanation goes here

    
    %First car
    carId = inputTable.id(1);
    newCarId = inputTable.id(2);
    
    %counts through whole data set
    counter = 1;
    %counter for the new table where to add
    newCounter = 1;
    %counts number of cars within specified area
    weightCounter = 1;
    outputTable = [];
    
    size(inputTable,1)
    
    while (counter < size(inputTable,1)) 
        
        if(newCarId == carId)
            
            X = [inputTable.y_coord(counter), inputTable.x_coord(counter); inputTable.y_coord(counter+1), inputTable.x_coord(counter+1)];
            % euclidian distance 
            dist = pdist(X); %0.0112 = ca 1.245 km

            if(dist < 0.008) %0.008 ca 0.89 km
                newRow = inputTable(counter,:);
                %weightCounter = weightCounter + 1;
                newRow.weight = 2; % börjar med att bara para ihop 2
                outputTable = [outputTable; newRow];
                counter = counter + 2;
            else
                newRow = inputTable(counter,:);
                %weightCounter = weightCounter + 1;
                newRow.weight = 1; % börjar med att bara para ihop 2
                outputTable = [outputTable; newRow];
                counter = counter + 1;
            end
            newCarId = inputTable.id(counter);
        else 
            counter = counter + 1;
            carId = inputTable.id(counter);
            newCarId = inputTable.id(counter+1);
        end
        
        
        
        
    end
        
    counter
    size(outputTable)
    
    
    

end

