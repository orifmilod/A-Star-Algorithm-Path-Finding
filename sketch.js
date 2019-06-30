var column = 25;
var row = 25;
var grid = new Array(column);

var openSet = [] //Spots then need to be checked
var closedSet = [] //Spots that has already been checked

var start = 0;
var end = 0;
var spotWidth, spotHeight;
var path = [];

let Spot = function(_x, _y) 
{
    this.x = _x;
    this.y = _y;

    //f(n) = h(n) + g(n) 
    //f(n) is the total cost to reach there
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.cameFrom; //Indicates to previous node
    this.wall = false;
    
    //10 percent chance of becoming a wall
    if(random(1) < 0.5)
        this.wall = true;

    this.neighbours = [];
    this.show = function(color)
    {
        fill(color);
        if(this.wall)
            fill(0)
        stroke(1);
        rect(this.x * spotWidth, this.y * spotHeight, spotWidth, spotHeight);
    }

    this.addNeighbours = function(grid)
    {
        const x = this.x;
        const y = this.y;
        //Horizontal and vertical neighbours
        if(y > 0)
            this.neighbours.push(grid[x][y - 1]);   //Top neighbour
        if(y < row - 1)
            this.neighbours.push(grid[x][y + 1]);   //Bottom neighbour
        if(x < column - 1)
            this.neighbours.push(grid[x + 1][y]);   //Right neighbour
        if(x > 0)
            this.neighbours.push(grid[x - 1][y]);   //Left neighbour
            
        //Diagonal neighbours 
        if(x > 0 && y > 0)
            this.neighbours.push(grid[x - 1][y - 1]); //Bottom-Left neighbour
        if(x < column - 1 && y > 0)
            this.neighbours.push(grid[x + 1][y - 1]); //Bottom-Right neighbour
        if(x > 0 && y < row - 1)
            this.neighbours.push(grid[x - 1][y + 1]); //Top-Left neighbour
        if(x < column - 1 && y < row - 1)
            this.neighbours.push(grid[x + 1][y + 1]); //Top-Right neighbour

    }  
}
function heuristic(a, b) 
{
    return abs(a.x - b.x) + abs(a.y - b.y);
}
function setup() 
{
    // put setup code here
    createCanvas(400, 400);

    //Widht and Height of the spots 
    spotWidth = 400 / column;
    spotHeight = 400 / row;

    //Dividing to rows and columns
    for (let i = 0; i < column; i++) {
        grid[i] = new Array(row);
    }

    
    for (let i = 0; i < column; i++)  {
        for (let j = 0; j < row; j++) {
            grid[i][j] = new Spot(i, j);
        }   
    }
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {
            grid[i][j].addNeighbours(grid);
        }   
    }
    start = grid[0][0];
    end = grid[column - 1][row - 1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
}

function draw() 
{
    if (openSet.length > 0) 
    {
        //Keep checking the unchecked spots
        let selected = 0;
        for (let i = 0; i < openSet.length; i++)
        {
            if(openSet[i].f < openSet[selected].f) {
                selected = i;
            }
        }

        let current = openSet[selected];
        if(current === end)
        {
            //Find the path -- trace back where it came from
            var temp = current;
            path.push(temp);
            while(temp.cameFrom)
            {
                path.push(temp.cameFrom);
                temp = temp.cameFrom;
            }

            console.log("DONE!");
            noLoop();
        }
        openSet = openSet.filter(item => current != item)
        closedSet.push(current);

        let neighbours = current.neighbours;
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if(!closedSet.includes(neighbour) && !neighbour.wall)
            {
                var temp_g = current.g + 1;  
                if(openSet.includes(neighbour)) 
                {
                    if(temp_g < neighbour.g) 
                    {       
                        neighbour.g = temp_g;
                    }
                }
                else {
                    neighbour.g = temp_g;
                    openSet.push(neighbour);
                }
                //heurestic
                neighbour.h = heuristic(neighbour, end);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.cameFrom = current;
            } 
        }
    }
    else
    {
        alert("There is no solution! 😓")
        noLoop()
        return;
    }
    
    for (let i = 0; i < column; i++) 
    {
        for (let j = 0; j < row; j++) 
        {
            grid[i][j].show(color(255)); 
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0))
    }
    
    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0))
    }
    for (let i = 0; i < path.length; i++) {
        path[i].show(color(94, 121, 255))
    }
   
}