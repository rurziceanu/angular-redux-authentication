export interface IAuthenticatedUser {
    uid: string;
    displayName: string;
    avatarImg: string;
    avatarBadgeIcon: string;
    email: string;
    location: string;
    loading?: boolean;
    error?: string;
}

export class AuthenticatedUser implements IAuthenticatedUser {
    public avatarBadgeIcon = '';
    constructor(public uid: string, public displayName: string,
        public avatarImg, public email, public location, public loading?: boolean, public error?: string) { }
}
