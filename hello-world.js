//q1 hello world in delay
console.log('Hello World');

setTimeout(function() {
  console.log('Hello world again!');
  }, 10000);
  
//q2 hello world to infinity

function infi() {
  setTimeout(function(){
    console.log('Hello world');
    return infi();
  }, 2000);
  return 'Hello world'
}



  
  