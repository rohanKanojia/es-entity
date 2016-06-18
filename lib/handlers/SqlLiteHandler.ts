import Handler, {ResultSet, ConnectionConfig} from "./../Handler";
import * as Query from "./../Query";

class SqlLiteHandler extends Handler {
    constructor(config: ConnectionConfig) {
        super();
    }
    
    getConnection(): any {
        return null;
    }

    run(query: string | Query.ISqlNode): Promise<ResultSet> {
        return null
    }
}

export default SqlLiteHandler;