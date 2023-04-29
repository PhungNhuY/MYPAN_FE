export interface IUser {
    email: string;
}

export interface IPostCard {
    id: string;
    imageCover: string;
    postName: string;
    username: string;
    userAvatar: string | null;
    like: number;
    isLike: boolean;
    isFavotire: boolean;
}

export interface IStep{
    content: string;
    imageLink?: string[];
}

export interface IPost{
    author?: IUser;
    _id: string;
    name: string;
    description: string;
    imageCoverLink: string;
    ration: number;
    time: number;
    ingredients: string[],
    steps: IStep;
}