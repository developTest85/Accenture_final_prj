
export class Vehicle {
    public model: string;
    public code: string;
    public year: number;
    public imageUrl: string;
    public amount: number;
    public date: Date;

    constructor (model: string, code: string, year: number, amount: number, imageUrl: string ){
        this.model = model;
        this.code = code;
        this.year = year;
        this.amount = amount;
        this.date = new Date();
        this.imageUrl = imageUrl;
    }

}