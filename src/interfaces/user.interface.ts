export interface UserInterface {
    uid: string,
    email: string,
    nickname: string,
    date_created: string,
}

export interface UserInputInterface {
    email: string,
    nickname?: string,
    password: string
}