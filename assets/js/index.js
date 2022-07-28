// Create needed constants
const list = document.querySelector('ul');
const traderInput = document.querySelector('#trader');
const titleInput = document.querySelector('#title');
const itemInput = document.querySelector('#item');
const needInput = document.querySelector('#need');
const haveInput = document.querySelector('#have');

// Create an instance of a db object for us to store the open database in
let db;

// Open our database; it is created if it doesn't already exist
// (see the upgradeneeded handler below)
const openRequest = window.indexedDB.open('quests_db', 1);


// error handler signifies that the database didn't open successfully
openRequest.addEventListener('error', () => console.error('Database failed to open'));

// success handler signifies that the database opened successfully
openRequest.addEventListener('success', () => {
  console.log('Database opened successfully');
  // Store the opened database object in the db variable. This is used a lot below
  db = openRequest.result;
  // set the IDs for all necessary elements
  // setPillIDs();
  // Run the displayData() function to display the notes already in the IDB
  populateData();
});


// Set up the database tables if this has not already been done
openRequest.addEventListener('upgradeneeded', e => {
  // Grab a reference to the opened database
  db = e.target.result;
  // Create an objectStore to store our notes in (basically like a single table)
  // including a auto-incrementing key
  const objectStore = db.createObjectStore('quests_os', { keyPath: 'id', autoIncrement:false });
  // Define what data items the objectStore will contain
  objectStore.createIndex('trader', 'trader', { unique: false });
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('item', 'item', { unique: false });
  objectStore.createIndex('need', 'need', { unique: false });
  objectStore.createIndex('have', 'have', { unique: false });

  console.log('Database setup complete');

  // add Prapor Quests to database
  console.log('Adding Prapor quests to database...');
  // addPraporQuests();
  console.log('Prapor Quests setup complete.');
});



function addOne(questID) {
  // print questID
  console.log('Finding quest ' + questID + ' in index...');

  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['quests_os'], 'readwrite');
  const objectStore = transaction.objectStore('quests_os');
  // const index = objectStore.index('id');
  const request = objectStore.get(questID);

  request.onerror = (event) => {
    // Handle errors!
    console.log('Transaction not opened due to error');
  };
  // index.get(questID).onsuccess = (event) => {
  request.onsuccess = (event) => {
    // Get the old value that we want to update
    const data = event.target.result;

    // update the value(s) in the object that you want to change
    if (data.have < data.need) { data.have = data.have + 1;
    } else {  data.have = data.need; }

    // Put this updated object back into the database.
    const requestUpdate = objectStore.put(data);
    requestUpdate.onerror = (event) => {
       // Do something with the error
       console.log('Failed to updated data.');
    };
    requestUpdate.onsuccess = (event) => {
      // Success - the data is updated!
      console.log('Success - the data is updated!');
      // update the display of data to show the newly added item, by running displayData() again.
      populateData();
    };
  };
}


function subOne(questID) {
  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['quests_os'], 'readwrite');
  const objectStore = transaction.objectStore('quests_os');
  const index = objectStore.index('id');

  console.log('Finding quest ' + questID + ' in index...');
  index.get(questID).onsuccess = (event) => {

    // Get the old value that we want to update
    const data = event.target.result;

    // update the value(s) in the object that you want to change
    if (data.have > 0) { data.have = data.have - 1;
    } else {  data.have = 0; }

    // Put this updated object back into the database.
    const requestUpdate = objectStore.put(data);
    requestUpdate.onerror = (event) => {
       // Do something with the error
       console.log('Failed to updated data.');
    };
    requestUpdate.onsuccess = (event) => {
      // Success - the data is updated!
      console.log('Success - the data is updated!');
      // update the display of data to show the newly added item, by running displayData() again.
      populateData();
    };
  };
}



// Define the populateData function
function updateData(questTitle) {
  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['quests_os'], 'readwrite');
  const objectStore = transaction.objectStore('quests_os');
  const index = objectStore.index("title");

  index.get(questTitle).onsuccess = (event) => {
    // console.log(`Donna's SSN is ${event.target.result.ssn}`);

    // Get the old value that we want to update
    const data = event.target.result;

    // update display - Debut
    document.getElementById("pill-debut").innerHTML = data.have.toString();
    document.getElementById("disp-debut").value  = data.have.toString();
  };
}



// Define the populateData function
function populateData() {
  // create index var, start at 1 for first quest
  var i = 1;
  //loop through all elements and fill in data
  const objectStore = db.transaction('quests_os').objectStore('quests_os');
  objectStore.openCursor().addEventListener('success', e => {
    // Get a reference to the cursor
    const cursor = e.target.result;

    if(cursor) {
      // do something
      document.getElementById("pill-" + i).innerHTML = cursor.value.have.toString();
      document.getElementById("disp-" + i).value  = cursor.value.have.toString();

      // iterate to the next quest
      cursor.continue();
      i++;
    } else {
    // do something
    }
  });
}



// Define the addQuests() function
function addPraporQuests() {
  // prevent default - we don't want the form to submit in the conventional way
  // e.preventDefault();
  // create quest objects to add to the database
  const quest01 = { id: 1, trader: "Prapor", title: "Debut", item: "MP-133 12ga pump-action shotgun", need: 2, have: 0 };
  const quest02 = { id: 2, trader: "Prapor", title: "Ice Cream Cones", item: "AK-74 5.45x39 6L31 60-round magazine", need: 3, have: 0 };
  const quest03 = { id: 3, trader: "Prapor", title: "The Punisher - Part 2", item: "Lower half-mask", need: 7, have: 0 };
  const quest04 = { id: 4, trader: "Prapor", title: "The Punisher - Part 4", item: "Bars A-2607 95H18 knife", need: 5, have: 0 };
  const quest05 = { id: 5, trader: "Prapor", title: "The Punisher - Part 5", item: "AK-74N assault rifle", need: 1, have: 0 };
  const quest06 = { id: 6, trader: "Prapor", title: "The Punisher - Part 5", item: "M4A1 assault rifle", need: 1, have: 0 };
  const quest07 = { id: 7, trader: "Prapor", title: "The Punisher - Part 5", item: "PM 9x18PM pistols", need: 2, have: 0 };
  const quest08 = { id: 8, trader: "Prapor", title: "The Punisher - Part 6", item: "BEAR PMC dogtags", need: 7, have: 0 };
  const quest09 = { id: 9, trader: "Prapor", title: "The Punisher - Part 6", item: "USEC PMC dogtags", need: 7, have: 0 };
  const quest10 = { id: 10, trader: "Prapor", title: "Regulated Materials", item: "6-STEN-140-M military battery", need: 1, have: 0 };
  const quest11 = { id: 11, trader: "Prapor", title: "Regulated Materials", item: "OFZ 30x160mm shells", need: 5, have: 0 };
  const quest12 = { id: 12, trader: "Prapor", title: "No Offence", item: "Lower half-mask", need: 10, have: 0 };
  const quest13 = { id: 13, trader: "Prapor", title: "Our Own Land", item: "Lower half-mask", need: 20, have: 0 };
  
  // add the quests to the database
  addQuest(quest01);
  addQuest(quest02);
  addQuest(quest03);
  addQuest(quest04);
  addQuest(quest05);
  addQuest(quest06);
  addQuest(quest07);
  addQuest(quest08);
  addQuest(quest09);
  addQuest(quest10);
  addQuest(quest11);
  addQuest(quest12);
  addQuest(quest13);
}



// Define the addData() function
function addQuest(quest) {
  // prevent default - we don't want the form to submit in the conventional way
  // e.preventDefault();
  // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
  const newItem = { id: quest.id, trader: quest.trader, title: quest.title, item: quest.item, need: quest.need, have: quest.have };
  // open a read/write db transaction, ready for adding the data
  const transaction = db.transaction(['quests_os'], 'readwrite');
  // call an object store that's already been added to the database
  const objectStore = transaction.objectStore('quests_os');
  // Make a request to add our newItem object to the object store
  const addRequest = objectStore.add(newItem);
  // addRequest.addEventListener('success', () => {

  // });

  // Report on the success of the transaction completing, when everything is done
  transaction.addEventListener('complete', () => {
    console.log('Transaction completed: database modification finished.');

    // update the display of data to show the newly added item, by running displayData() again.
    displayData();
  });

  transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}


