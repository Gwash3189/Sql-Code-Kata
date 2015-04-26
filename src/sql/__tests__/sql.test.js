var sql = require("../sql.js");
var { expect } = require("chai");
var tableName = "table";
var columns = ["a", "b", "c"];
var values = ["value1", "value2", "value3"];
var selectStar = "select * from " + tableName + ";";
var selectColumns = "select a, b, c from " + tableName + ";";
var insertStatment = "insert into " + tableName + " columns (a, b, c) values ('value1', 'value2', 'value3');"; 
var updateStatement = "update " + tableName + " set a='value1', b='value2', c='value3';";
var deleteStatement = "delete from " + tableName + " where a='value1' and b='value2' and c='value3';";
var deleteAllStatement = "delete from " + tableName + ";";


describe('Sql Kata', function () {
	it('Should be a function', function () {
		expect(sql).to.be.a("function");
	});
	it("Should provide a select function", function () {
		expect(sql(tableName).select).to.be.a("function");
	});
	it('Should return a insert function', function () {
		expect(sql(tableName).insert).to.be.a("function");
	});
	it('Should return a update function', function () {
		expect(sql(tableName).update).to.be.a("function");
	});
	it('Should return a delete function', function () {
		expect(sql(tableName).delete).to.be.a("function");
	});
	describe('Select', function () {
		it('Should return a select * statment', function () {
			expect(sql(tableName).select()).to.equal(selectStar);
		});
		it('Should return a select statment for all columns', function () {
			expect(sql(tableName).select(columns)).to.equal(selectColumns);
		});
	});

	describe('Insert', function () {
		it('Should retun a valid insert statment for all columns and values', function () {
			expect(sql(tableName).insert(columns, values)).to.equal(insertStatment);
		});
	});

	describe('Update', function () {
		it('Should return a valid update statement', function () {
			expect(sql(tableName).update(columns, values)).to.equal(updateStatement);
		});
	});

	describe('Delete', function () {
		it('Should return a valid delete statement', function () {
			expect(sql(tableName).delete()).to.equal(deleteAllStatement);
		});
		it('Should return a valid delete statement with a where clause', function () {
			expect(sql(tableName).delete(columns, values)).to.equal(deleteStatement);
		});
	});
	
});