export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const getImage = (url, size) => {
    if (!size || !url) return url;

    return url
        .split("/")
        .map((x, i, a) => (i === a.length - 1 ? `${size}-${x}` : x))
        .join("/");
};
