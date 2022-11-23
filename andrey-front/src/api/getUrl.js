export function getUrl(url) {
    return fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => result)
        .catch(err => console.log(err))
}