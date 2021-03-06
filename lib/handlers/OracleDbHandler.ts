import * as Handler from "./../Handler";
import * as Query from "./../Query";

class OracleDbHandler extends Handler.default {
	handlerName = 'oracle';
	driver = null;

	constructor(config: Handler.ConnectionConfig) {
		super();
	}

	getConnection(): any {
		return null;
	}

	getTableInfo(tableName: string): Array<Handler.ColumnInfo> {
		return null;
	}

	async run(query: string | Query.ISqlNode): Promise<Handler.ResultSet> {
		return null
	}
}

export default OracleDbHandler;
