var fs = require('fs');
var lineReader = require('linereader');
var generator = require('./services/generator');
var schema = require('./services/schema');

var args = process.argv.slice(2);
var itemAmount = args[0];
var storeAmount = args[1];

var outStream = new fs.createWriteStream('./itemsIn.json');
var reader = new lineReader('./storesOut.json');

console.log ("****STARTED****");
var itemSchema = schema.generateItemSchema(storeAmount).then (function (itemSchema) {
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
			//console.log(randomStoreIds.length);
			//console.log(JSON.stringify(storeIds));
			generator.generate(randomStoreIds, itemSchema).then(function (fakeItem) {
				outStream.write(JSON.stringify(fakeItem)+'\n');
			});
		}
	});
});
