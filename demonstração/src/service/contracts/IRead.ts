 


export interface IRead<T> {
    list(): Promise<T[]>
    findOne(id: String): Promise<T>
}