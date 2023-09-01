export interface NoteInterface{
    uid: string,
    date_created: string,
    date_visited: string,
    foodCategory: string,
    placeName:string,
    location: string,
    text: string,
    images: Array<Images>,
    menu: Array<Menu>
}

interface Images {
    fileUrl: string
}

export interface Menu {
    menuName: string,
    menuPrice: number
}