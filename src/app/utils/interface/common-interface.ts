export interface Login {
    email: string;
    password: string;
}

export interface User {
    email: string;
}

export interface GithubUser {
    avatar_url?: string;
    login?: string;
    id?: number;
    repos_url?: string;
    bio?: string;
    company?: string;
    created_at?: string;
    location?: string;
    name?: string;
    updated_at?: string;
    blog?: string;
}

export interface GithubRepo {
    name: string;
    id: number;
}