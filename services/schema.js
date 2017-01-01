var jsf = require('json-schema-faker');


function generateItemSchema (storeAmount) {
	return new Promise (function (resolve, reject) {
		try {
		var itemSchema = {
		  type: 'object',
		  properties: {
			_id: {type:'string', faker:'random.uuid'},
		//{$ref:'#/definitions/positiveInt'},
			name: {type:'string',faker:'item.name'},
			data: 
			{
				type:'array',
				items:
				{
						type: 'object',
						properties: {
							prices: {
								 current_price:{type:'string',faker:'commerce.price'} ,
								 regular_price:{type:'string',faker:'commerce.price'},
								 history_price:[],
								 deals: ""
							},
							location:"TEMP",
							stock: {faker:'random.number'}
						},
						'required' : ['prices', 'location', 'stock'],
				},
				minItems:storeAmount,
				maxItems:storeAmount
			},
			longDescription: {type:'string', faker:'lorem.paragraph'},
			shortDescription: {type:'string', faker:'lorem.sentence'},
			mass: {$ref:'#/definitions/positiveInt'},
			brand: {type:'string', faker:'company.companyName'},
			itemFrom: {type:'string', faker:'address.country'},
			packQuantity: {$ref:'#/definitions/positiveInt'},
			image: {faker:'image.food'},
		  },
		  required: ['_id','name','data', 'longDescription', 'mass', 'brand', 'itemFrom', 'packQuantity', 'shortDescription', 'image'],
		  definitions: {
			positiveInt: {
			  type: 'integer',
			  minimum: 0,
			  maximum: 10,
			  exclusiveMinimum: true
			}
		  }
			
		};
		resolve(itemSchema);
		}
		catch (e) {
			console.log("ERROR:"+e);
			reject();
		}
	});
}

var obj = {
	generateItemSchema: generateItemSchema
};

module.exports = obj;
