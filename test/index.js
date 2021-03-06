"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es = require("./../index");
const EmpContext_1 = require("./modal/EmpContext");
var config = new es.ConnectionConfig();
config.handler = "mysql";
config.hostname = "localhost";
config.name = "mysql";
config.username = "root";
config.password = "password";
config.database = "test";
var context = new EmpContext_1.default(config);
let q = 4;
async function run() {
    await context.init();
    let trans = await context.initTransaction();
    let v = await trans.employees.get(1);
    console.log("id: " + v.id + ", name: " + v.name + ", desc: " + v.description);
    v.description.set("test update 2");
    v = await trans.employees.update(v);
    console.log("id: " + v.id + ", name: " + v.name + ", desc: " + v.description);
    console.log("updated");
    let a = trans.employees.getEntity();
    a.name.set("name 2");
    a.description.set("desc insert 2");
    v = await trans.employees.insert(a);
    console.log("inserted");
    console.log("id: " + v.id + ", name: " + v.name + ", desc: " + v.description);
    await trans.employees.delete(v);
    await trans.commit();
    console.log("deleted");
    let q = await context.employees.where((a) => {
        return a.name.IsNull();
    }).list();
    for (let i = 0; i < q.length; i++) {
        let j = q[i];
        console.log("id: " + j.id + ", desc: " + j.description);
    }
}
run();
