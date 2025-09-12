declare namespace Express{
    export interface Request{
        userID: string;
        avatar: string | undefined;
    }
}