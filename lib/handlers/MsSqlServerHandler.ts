// import * as mssql from 'mssql';

import * as util from '../Util';
import * as Handler from "./../Handler";
import * as Query from "./../Query";
import Connection from '../Connection';

class MsSqlServerHandler extends Handler.default {
	handlerName = 'mssql';
	connectionPool = null;
	driver = null;

	constructor(config: Handler.ConnectionConfig) {
		super();
		this.driver = require('mssql');

		this.config = config;
		this.connectionPool = util.deAsync(this.driver.connect({
			server: this.config.hostname,
			user: this.config.username,
			password: this.config.password,
			database: this.config.database
		}));
	}

	async getConnection() {
		try {
			let conn = await this.driver.connect({
				server: this.config.hostname,
				user: this.config.username,
				password: this.config.password,
				database: this.config.database
			});
			return new Connection(this, conn);
		} catch (e) {
			throw e;
		}
	}

	getTableInfo(tableName: string): Array<Handler.ColumnInfo> {
		let p = this.run("describe " + tableName);
		let r = util.deAsync(p);
		let result: Array<Handler.ColumnInfo> = new Array<Handler.ColumnInfo>();
		r.rows.forEach((row) => {
			let a: Handler.ColumnInfo = new Handler.ColumnInfo();
			a.field = row["Field"];
			let columnType: string = (<string>row["Type"]).toLowerCase();
			if (columnType.includes("tinyint(1)")) {
				a.type = "boolean";
			} else if (columnType.includes("int")
				|| columnType.includes("float")
				|| columnType.includes("double")
				|| columnType.includes("decimal")) {
				a.type = "number";
			} else if (columnType.includes("varchar")
				|| columnType.includes('text')) {
				a.type = "string";
			} else if (columnType.includes("timestamp")) {
				a.type = "date";
			}

			a.nullable = row["Null"] == "YES" ? true : false;
			a.primaryKey = (<string>row["Key"]).indexOf("PRI") >= 0 ? true : false;
			a.default = row["Default"];
			a.extra = row["Extra"];
			result.push(a);
		});
		return result;
	}

	async run(query: string | Query.ISqlNode): Promise<Handler.ResultSet> {
		return null
	}

}

export default MsSqlServerHandler;
