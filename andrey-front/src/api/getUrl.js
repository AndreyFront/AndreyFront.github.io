export default function getUrl(url) {
    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(err => console.log(err))
}