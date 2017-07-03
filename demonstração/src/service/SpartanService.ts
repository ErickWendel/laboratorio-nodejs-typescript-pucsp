import { IRead } from './contracts/IRead';
import { IWrite } from './contracts/IWrite';
import * as Mongoose from 'mongoose';
import Spartan from '../entities/Spartan';

export default class SpartanService implements IWrite<Spartan>, IRead<Spartan> {

    public _schema: Mongoose.Model<Mongoose.Document>

    constructor(schema: Mongoose.Model<Mongoose.Document>) {
        this._schema = schema
    }
    async list(): Promise<Spartan[]> {
        const results = await this._schema.find() 
        return results.map((i: any) => <Spartan>{ _id: i._id, age: i.age, name: i.name })
    }
    async findOne(id: String): Promise<Spartan> {
        const result: any = await this._schema.findById(id)
        return <Spartan>{ _id: result._id, age: result.age, name: result.name }
    }

    async create(domain: Spartan): Promise<Spartan> {
        const data = new this._schema(domain)
        const result: any = await data.save()
        return <Spartan>{ _id: result._id, age: result.age, name: result.name }
    }
    async delete(id: String): Promise<Object> {
        const data: any = await this._schema.remove(id)      
        return data.result
    }

    async update(id: String, domain: Spartan): Promise<Spartan> {
        const data = await this._schema.update({ _id: id }, domain)
        return data
    }

}