var fs = require('fs');
var lineReader = require('linereader');
var generator = require('./services/generator');
var schema = require('./services/schema');

var args = process.argv.slice(2);
var itemAmount = args[0];
var storeAmount = args[1];

var outStream = new fs.createWriteStream('./itemsIn.json');
var outStreamChild = new fs.createWriteStream('./childItemsIn.json');
var reader = new lineReader('./storesOut.json');

console.log ("****STARTED****");
schema.generateItemSchema(storeAmount).then (function (itemSchema) {
	schema.generateChildItemSchema().then (function (childItemSchema) {
		var storeIds = [];
		reader.on('line', function (lineNo, line) {
			storeObj = JSON.parse(line);
			storeIds.push(storeObj._id);
		});	
		reader.on('end', function() {
			console.log("Finished reading stores file");
			for (var i=0; i < itemAmount; i++) {
				storeIds.sort( function() { return 0.5 - Math.random() } );
				var randomStoreIds = storeIds.slice(0,storeAmount);
				generator.generate(randomStoreIds, itemSchema, childItemSchema).then(function (itemsObject) {
					//console.log(JSON.stringify(childItemArray));
					for (var j=0; j < itemsObject.children.length; j++) {
						console.log(JSON.stringify(itemsObject.children[j]));
						outStreamChild.write(JSON.stringify(itemsObject.children[j])+'\n');						
					}
					outStream.write(JSON.stringify(itemsObject.parent)+'\n');
				});
			}
		});
	});
});
