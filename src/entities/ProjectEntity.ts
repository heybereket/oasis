export interface ISingleProject {
    archived: boolean;
    avatar: string;
    date_added: {
        nanoseconds: number;
        seconds: number;
    };
    desc: string;
    fork: boolean;
    full_name: string;
    id: string;
    issues: number;
    language: string;
    name: string;
    owner: string;
    stars: number;
    submitted_by: string;
    url: string;
}