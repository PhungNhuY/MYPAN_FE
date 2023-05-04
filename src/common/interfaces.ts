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
    imageLink?: Array<string|null>;
}

export interface IIngre{
    name: string;
    quantity?: string;
}

export interface IPost{
    author?: IUser;
    _id: string;
    name: string;
    description: string;
    imageCoverLink: string;
    ration: number;
    time: number;
    ingredients: IIngre[],
    steps: IStep[];
}

export interface ICreatePost{
    name: string;
    description?: string | null | undefined;
    imageCoverLink?: string | null | undefined;
    ration?: number | null | undefined;
    time?: number | null | undefined;
    ingredients: IIngre[],
    steps: IStep[];
}