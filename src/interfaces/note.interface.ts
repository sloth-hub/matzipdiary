export interface NoteInterface{
    uid: string,
    date_created: string,
    date_visited: string,
    foodCategory: string,
    location: string,
    text: string,
    images: Images,
    menu: Menu
}

interface Images {
    fileUrl: string
}

interface Menu {
    menuName: string,
    menuPrice: number
}