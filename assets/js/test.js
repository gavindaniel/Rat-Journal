// Create needed constants
const list = document.querySelector('ul');
const traderInput = document.querySelector('#trader');
const titleInput = document.querySelector('#title');
const itemInput = document.querySelector('#item');
const needInput = document.querySelector('#need');
const haveInput = document.querySelector('#have');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
const questBtn = document.querySelector('#questBtn');

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
  // Run the displayData() function to display the notes already in the IDB
  displayData();
});


// Set up the database tables if this has not already been done
openRequest.addEventListener('upgradeneeded', e => {
  // Grab a reference to the opened database
  db = e.target.result;
  // Create an objectStore to store our notes in (basically like a single table)
  // including a auto-incrementing key
  // const objectStore = db.createObjectStore('quests_os', { keyPath: 'id', autoIncrement:true });
  const objectStore = db.createObjectStore('quests_os', { keyPath: 'id', autoIncrement:false });
  // Define what data items the objectStore will contain
  objectStore.createIndex('trader', 'trader', { unique: false });
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('item', 'item', { unique: false });
  objectStore.createIndex('need', 'need', { unique: false });
  objectStore.createIndex('have', 'have', { unique: false });

  console.log('Database setup complete');
});


// Create a submit event handler so that when the form is submitted the addData() function is run
form.addEventListener('submit', addData);

// Create a submit event handler so that when the form is submitted the addData() function is run
questBtn.addEventListener("click", addPraporQuests);

// Define the addData() function
function addData(e) {
  // prevent default - we don't want the form to submit in the conventional way
  e.preventDefault();
  // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
  const newItem = { trader: traderInput.value, title: titleInput.value, item: itemInput.value, need: parseInt(needInput.value), have: parseInt(haveInput.value) };
  // open a read/write db transaction, ready for adding the data
  const transaction = db.transaction(['quests_os'], 'readwrite');
  // call an object store that's already been added to the database
  const objectStore = transaction.objectStore('quests_os');
  // Make a request to add our newItem object to the object store
  const addRequest = objectStore.add(newItem);
  addRequest.addEventListener('success', () => {
    // Clear the form, ready for adding the next entry
    traderInput.value = '';
    titleInput.value = '';
    itemInput.value = '';
    needInput.value = 0;
    haveInput.value = 0;
  });

  // Report on the success of the transaction completing, when everything is done
  transaction.addEventListener('complete', () => {
    console.log('Transaction completed: database modification finished.');

    // update the display of data to show the newly added item, by running displayData() again.
    displayData();
  });

  transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}


// Define the deleteItem() function
function deleteItem(e) {
  // retrieve the name of the task we want to delete. We need
  // to convert it to a number before trying to use it with IDB; IDB key
  // values are type-sensitive.
  const questId = Number(e.target.parentNode.getAttribute('data-quest-id'));

  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['quests_os'], 'readwrite');
  const objectStore = transaction.objectStore('quests_os');
  const deleteRequest = objectStore.delete(questId);

  // report that the data item has been deleted
  transaction.addEventListener('complete', () => {
    // delete the parent of the button
    // which is the list item, so it is no longer displayed
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    console.log(`Quest ${questId} deleted.`);

    // Again, if list item is empty, display a 'No notes stored' message
    if(!list.firstChild) {
      const listItem = document.createElement('li');
      listItem.textContent = 'No notes stored.';
      list.appendChild(listItem);
    }
  });
}



function addItem(e) {
  // retrieve the name of the task we want to delete. We need
  // to convert it to a number before trying to use it with IDB; IDB key
  // values are type-sensitive.
  const questId = Number(e.target.parentNode.getAttribute('data-quest-id'));

  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['quests_os'], 'readwrite');
  const objectStore = transaction.objectStore('quests_os');
  const request = objectStore.get(questId);

  request.onerror = (event) => {
    // Handle errors!
    console.log('Transaction not opened due to error');
  };
  request.onsuccess = (event) => {
    // Get the old value that we want to update
    const data = event.target.result;

    // update the value(s) in the object that you want to change
    data.have = data.have + 1;

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
      displayData();
    };
  };

}



function subItem(e) {
  // retrieve the name of the task we want to delete. We need
  // to convert it to a number before trying to use it with IDB; IDB key
  // values are type-sensitive.
  const questId = Number(e.target.parentNode.getAttribute('data-quest-id'));

  // open a database transaction and delete the task, finding it using the id we retrieved above
  const transaction = db.transaction(['quests_os'], 'readwrite');
  const objectStore = transaction.objectStore('quests_os');
  const request = objectStore.get(questId);

  request.onerror = (event) => {
    // Handle errors!
    console.log('Transaction not opened due to error');
  };
  request.onsuccess = (event) => {
    // Get the old value that we want to update
    const data = event.target.result;

    // update the value(s) in the object that you want to change
    data.have = data.have - 1;

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
      displayData();
    };
  };

}



// Define the displayData() function
function displayData() {
  // Here we empty the contents of the list element each time the display is updated
  // If you didn't do this, you'd get duplicates listed each time a new note is added
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // Open our object store and then get a cursor - which iterates through all the
  // different data items in the store
  const objectStore = db.transaction('quests_os').objectStore('quests_os');
  objectStore.openCursor().addEventListener('success', e => {
    // Get a reference to the cursor
    const cursor = e.target.result;

    // If there is still another data item to iterate through, keep running this code
    if(cursor) {
      // Create a list item, h3, and p to put each data item inside when displaying it
      // structure the HTML fragment, and append it inside the list
      const listItem = document.createElement('li');
      const h3 = document.createElement('h3');
      const para1 = document.createElement('p');
      const para2 = document.createElement('p');

      listItem.appendChild(h3);
      listItem.appendChild(para1);
      listItem.appendChild(para2);
      list.appendChild(listItem);

      // Put the data from the cursor inside the h3 and para
      h3.textContent = cursor.value.title;
      para1.textContent = cursor.value.trader;
      para1.textContent = cursor.value.have;

      // Store the ID of the data item inside an attribute on the listItem, so we know
      // which item it corresponds to. This will be useful later when we want to delete items
      listItem.setAttribute('data-quest-id', cursor.value.id);

      // Create a button and place it inside each listItem
      const addBtn = document.createElement('button');
      listItem.appendChild(addBtn);
      addBtn.textContent = ' + ';

      // Create a button and place it inside each listItem
      const subBtn = document.createElement('button');
      listItem.appendChild(subBtn);
      subBtn.textContent = ' - ';

      // Create a button and place it inside each listItem
      const deleteBtn = document.createElement('button');
      listItem.appendChild(deleteBtn);
      deleteBtn.textContent = 'Delete';

      // Set an event handler so that when the button is clicked, the deleteItem()
      // function is run
      addBtn.addEventListener('click', addItem);

      // Set an event handler so that when the button is clicked, the deleteItem()
      // function is run
      subBtn.addEventListener('click', subItem);

      // Set an event handler so that when the button is clicked, the deleteItem()
      // function is run
      deleteBtn.addEventListener('click', deleteItem);

      // Iterate to the next item in the cursor
      cursor.continue();
    } else {
      // Again, if list item is empty, display a 'No notes stored' message
      if(!list.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No quests stored.'
        list.appendChild(listItem);
      }
      // if there are no more cursor items to iterate through, say so
      console.log('Quests all displayed');
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