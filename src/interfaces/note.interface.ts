export interface NoteInterface{
    uid: string,
    date_created: string,
    date_visited: string,
    foodCategory: string,
    placeName:string,
    location: object,
    text: string,
    images: Array<Images>,
}

export interface Images {
    fileUrl: string
}