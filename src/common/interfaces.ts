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