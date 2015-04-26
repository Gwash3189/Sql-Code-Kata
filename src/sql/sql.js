module.exports = function(table){

	function wrapIn(start, value, end){
		return start + value + end;
	}

	function wrapInParen(value){
		return wrapIn("(", value, ")");
	}

	function wrapInString(value){
		return wrapIn("'", value, "'");
	}

	function handleType(value){
		if(typeof value === "number"){
			return value;
		} else {
			return wrapInString(value);
		}
	}

	function isLastIteration(list, i){
		return list.length - 1 === i
	}

	function forEachColumnIn(columns, func, lastIteration){
		columns.forEach((x, i) => {
			if(isLastIteration(columns, i)){
				lastIteration !== undefined ? lastIteration(x, i) : func(x, i);
			} else {
				func(x, i);
			}
		});
	}

	var spaceComma = ", ";
	var equals = "=";
	var semi = ";";

	return {
		select(arrOfColumns) {
			var columns = Array.isArray(arrOfColumns) ? arrOfColumns.join (spaceComma) : "*";
			return "select " + columns + " from " + table + ";" ;
		},
		insert(columns, values) {
			var cols = columns.join(spaceComma);
			var vals = values.map(x => handleType(x)).join(spaceComma);
			cols = wrapInParen(cols);
			vals = wrapInParen(vals);
			return "insert into " + table + " columns " + cols + " values " + vals + ";";
		},
		update(columns, values){
			var str = "";
			forEachColumnIn(columns, (x,i) => {
				str = str + x + "=" + handleType(values[i]) + spaceComma;
			}, (x,i) => {
				str = str + x + "=" + handleType(values[i]);
			});
			str = "update " +  table + " set " + str + ";"; 
			return str;


		},
		delete(columns, values) {
			if(!columns && !values){
				return "delete from " + table + ";";
			} else {
				var str = "delete from " + table + " where ";
				forEachColumnIn(columns, (x, i) => {
					str = str + x + "=" + handleType(values[i]) + " and ";
				}, (x,i) => {
					str = str + x + "=" + handleType(values[i]) + ";";
				});
				return str;
			}
		}
	}
}