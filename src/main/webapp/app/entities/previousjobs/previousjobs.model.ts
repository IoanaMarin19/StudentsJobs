import { Student } from '../student';
import { Company } from '../company';
import { Title } from '../title';
export class Previousjobs {
    constructor(
        public id?: number,
        public student?: Student,
        public company?: Company,
        public title?: Title
    ) {
    }
}
