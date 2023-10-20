export interface UserInterface {
    uid: string,
    email: string,
    nickname: string,
    date_created: string,
    pfp: string
}

export interface UserInputInterface {
    email: string,
    nickname?: string,
    password: string,
    pwConfirm?: string,
    [prop: string]: any
}