import { topic } from 'src/app/topics/service/topic.model';

export class question {
    public _id?: string;
    public quest: string;
    public options: option[];
    public answer: option[];
    public solution: string;
    public askedIn: string[];
    public topic: topic
}

class option {
    key: string;
    value: string;
}