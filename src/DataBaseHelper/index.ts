import { ConnectionPool, Request } from "mssql";
import { sqlConfig } from "../config";
import mssql from 'mssql';
//import { number, string } from "joi";

export class DbHelper {
    private pool: Promise<ConnectionPool>;

    constructor() {
        this.pool = mssql.connect(sqlConfig);
    }

    private createRequest(emptyRequest: Request, data: { [x: string]: string|number }): Request {
        const keys = Object.keys(data);
        keys.forEach(key => {
            emptyRequest.input(key, data[key]);
        });
        return emptyRequest;
    }

    async exec(storedProcedure: string, data: { [x: string]: string|number }) {
        const emptyRequest = (await this.pool).request();
        const request = this.createRequest(emptyRequest, data);
        let results = (await request.execute(storedProcedure));

        return results;
    }

    async query(queryString:string) {
        return (await ((await this.pool).request().query(queryString)));
    }
}

// export default DbHelper;
