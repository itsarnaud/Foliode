export const extractImageFromReadme = (markdown: string, owner: string, title: string) => {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const matches = [];
    let match;
    const imageUrlBase = `https://raw.githubusercontent.com/${owner}/${title}/refs/heads/main/`;

    while ((match = regex.exec(markdown)) !== null) {
        const imageUrl = match[1];
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            matches.push(imageUrl);
        } else {
            matches.push(`${imageUrlBase}${imageUrl.slice(2)}`);
        }
    }
    return matches;
}
