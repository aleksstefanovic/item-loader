var jsf = require('json-schema-faker');
//var fs = require('fs');
//var schema = require('./schema');

//var outStream = new fs.createWriteStream('./load.json');

jsf.extend('faker', function(faker){
  faker.locale = "en"; // or any other language
  faker.item = {
  	name: function() {
  		return faker.commerce.productAdjective() + " " + faker.commerce.productName();
  	}
  };
  return faker;
});


function generate (storeIds, itemSchema, childItemSchema) {
	return new Promise (function (resolve, reject) {
		try {
			var itemsObject = {};
			var fakeItem = jsf(itemSchema);
			var childItemArray = [];
			for (var i=0; i < storeIds.length; i++) {
				var fakeChildItem = jsf(childItemSchema);
				fakeItem.data[i].location = storeIds[i];
				fakeItem.data[i].childId = fakeChildItem._id; 
				fakeChildItem.parentId = fakeItem._id;
				fakeChildItem.location = fakeItem.data[i].location;
				childItemArray.push(fakeChildItem); 
			}
			console.log("PARENT:"+JSON.stringify(fakeItem), "\nCHILDREN:"+JSON.stringify(childItemArray));
			itemsObject.parent = fakeItem;
			itemsObject.children = childItemArray;
			resolve(itemsObject);
		}
		catch (e) {
			console.log("ERROR:"+e);
			reject(false);
		}
	});
}

var obj = {
	generate: generate
};

module.exports = obj;
