// Define the addQuests() function
function addQuests() {
  // prevent default - we don't want the form to submit in the conventional way
  // e.preventDefault();
  // create quest objects to add to the database
  const quest01 = { trader: "Prapor", title: "Debut", item: "MP-133 12ga pump-action shotgun", need: 2, have: 0 };
  const quest02 = { trader: "Prapor", title: "Ice Cream Cones", item: "AK-74 5.45x39 6L31 60-round magazine", need: 3, have: 0 };
  const quest03 = { trader: "Prapor", title: "The Punisher - Part 2", item: "Lower half-mask", need: 7, have: 0 };
  const quest04 = { trader: "Prapor", title: "The Punisher - Part 4", item: "Bars A-2607 95H18 knife", need: 5, have: 0 };
  const quest05 = { trader: "Prapor", title: "The Punisher - Part 5", item: "AK-74N assault rifle", need: 1, have: 0 };
  const quest06 = { trader: "Prapor", title: "The Punisher - Part 5", item: "M4A1 assault rifle", need: 1, have: 0 };
  const quest07 = { trader: "Prapor", title: "The Punisher - Part 5", item: "PM 9x18PM pistols", need: 2, have: 0 };
  const quest08 = { trader: "Prapor", title: "The Punisher - Part 6", item: "BEAR PMC dogtags", need: 7, have: 0 };
  const quest09 = { trader: "Prapor", title: "The Punisher - Part 6", item: "USEC PMC dogtags", need: 7, have: 0 };
  const quest10 = { trader: "Prapor", title: "Regulated Materials", item: "6-STEN-140-M military battery", need: 1, have: 0 };
  const quest11 = { trader: "Prapor", title: "Regulated Materials", item: "OFZ 30x160mm shells", need: 5, have: 0 };
  const quest12 = { trader: "Prapor", title: "No Offence", item: "Lower half-mask", need: 10, have: 0 };
  const quest13 = { trader: "Prapor", title: "Our Own Land", item: "Lower half-mask", need: 20, have: 0 };
  
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
    // displayData();
    populateData();
  });

  transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}