 
export interface IWrite<T> {
    create(domain:T ): Promise<any>
    delete(id: String): Promise<Object>
    update(id: String, domain: T): Promise<T>
}