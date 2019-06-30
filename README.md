# A-Star-Algorithm-Path-Finding 🔎

<h3> A* path finding algorithm implemented in <a href="https://p5js.org/">p5.js</a></h3>
<h4>Formulae ℹ️</h4>

```
  f(n) = g(n) + h(n)
```
<ul>
  <li>F of N is the total cost from node to the Goal.</li>
  <li>G of N is the cost of the start node to the N.</li>
  <li>H of N is a heuristic function that estimates the cost of the cheapest path from N to the goal.</li>
</ul>
<img src = 'https://user-images.githubusercontent.com/25881325/60398951-5f52be00-9b5e-11e9-9fa6-cda536d1621f.gif'/>

<p> 
  A* terminates when the path it chooses to extend is a path from start to goal or if there are no paths eligible to be extended.
  The heuristic function is problem-specific. If the heuristic function is admissible, 
  meaning that it never overestimates the actual cost to get to the goal, 
  A* is guaranteed to return a least-cost path from start to goal.
</p>
<p>
Here the grid has been 25 X 25 cubes.
Green nodes represents nodes which are available and can be searched.
Red nodes represents nodes which has been visited and is closed.
Black nodes represents object or obstacles in the way.
Whenever path is found the shortest way from nodes are represented in blue.
</p>
<h4>Pseudo-Code 🧮</h4>

```
  OpenSet = [];
  ClosedSet = [];
  Add start node to OpenNodes;
  
  loop()
    currentNode = node in OpenSet with the lowest f(n) / f_cost
    remove currentNode from OpenSet
    add currentNode to ClosedSet
    
    if currentNode is the end node
      Congragulation you have found the path.
      return;
      
    foreach neighbour of the currentNode 
      if neighbour is not traversable or neighbour is in ClosedSet
        skip to the next neighbour
        
      if new path to the neighbour is shorter or is not improved 
        set f(n) / f_cost of neighbour 
        set parent of neighbour to current 
        
      if neighbour is not in OpenSet
        add neighbour to Open Set
    
```
<h4>Here is example of completed paths with Starting Node of 0,0 and End node of 25,25 (Very top-left corner to very bottom-right corner)</h4>
<img width="400" alt="1" src="https://user-images.githubusercontent.com/25881325/60398558-04b76300-9b5a-11e9-99e1-359b7fd9428e.png">
<img width="400" alt="2" src="https://user-images.githubusercontent.com/25881325/60398560-04b76300-9b5a-11e9-88ee-1beb576e9127.png">
<h4>Here is an example if there no path was found from start node to end node</h4>
<img width="1013" alt="3" src="https://user-images.githubusercontent.com/25881325/60398559-04b76300-9b5a-11e9-8a3a-439b21b3e8ce.png">
