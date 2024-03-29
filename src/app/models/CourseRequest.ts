export class CourseRequest{
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;

    constructor(title: string, description: string, startDate: Date, endDate: Date){
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}