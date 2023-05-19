// closure 

function createIncrement() {
    let count = 0; 
    function increment() { 
      count++;
      return count
    }
    return increment;
}

const increment = createIncrement();

increment(); 
increment(); 

let c3 = increment(); 

console.log(c3)




