export interface NoteInterface {
    uid: string,
    id: string,
    date_created: string,
    date_visited: string,
    foodCategory: string,
    placeName: string,
    location: Locations,
    rate: number,
    text: string,
    images: Array<Images>,
    [prop: string]: any
}

export interface Locations {
    lat: number,
    lng: number
}
export interface Images {
    fileUrl: string
}

export interface SortInterface {
    kor: string,
    eng: string,
    type: string
}