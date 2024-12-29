const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const formatImage = (link: string) => {
    return apiUrl + '/' + link

}