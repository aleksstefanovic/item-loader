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


function generate (storeIds, itemSchema) {
	return new Promise (function (resolve, reject) {
		try {
				var fakeItem;
				fakeItem = jsf(itemSchema);
				//outStream.write(JSON.stringify(fakeItem)+'\n');
				//console.log(JSON.stringify(storeIds));
				for (var i=0; i < storeIds.length; i++) {
					//console.log("setting real location");
					fakeItem.data[i].location = storeIds[i];
				}
				resolve(fakeItem);
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
