import {getApiData} from './getdata.js'; // importing getApiData function

async function main() {
  //try removing the await keyword and run the application
  try {
    console.log(await getApiData()); // await a call to getApiData function
    // all code that depended on the above results here (why do we need await again?)
    // we avait in console.log(getApiDate()) because it tries to log while the data request is pending
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
