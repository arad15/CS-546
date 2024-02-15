import {getApiData} from './getdata.js';

async function main() {
  //try removing the await keyword and run the application
  try {
    console.log(await getApiData());
    console.log('Another console.log that depends on getApiData');
  } catch (e) {
    console.log(e);
  }
}

main();

/*	
	this console.log will not be blocked as it does not depend 
	on the results of main so it will execute before 
	main is finished 
*/
console.log('After main is run');

for (let i = 0; i < 100; i++) {
  console.log(i);
}
