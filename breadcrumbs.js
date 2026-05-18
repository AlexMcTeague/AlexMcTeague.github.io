// Event listener to save the title when the user clicks the link
const links = document.querySelectorAll('a.page-link');

// DEBUG
// console.log(`Found ${links.length} page links for breadcrumb tracking.`);

links.forEach(link => {
    link.addEventListener('click', () => {
        localStorage.setItem('referrerTitle', document.title);
        // DEBUG
        // console.log(`Leaving page; saved title: ${localStorage.getItem('referrerTitle')}`);
    });
});

// On page load, check for the referrer title and update the breadcrumb
const defaultTitle = 'Index';
const defaultLink = 'index.html';

let referrerTitle = localStorage.getItem('referrerTitle');
let referrerLink;

if (document.referrer && referrerTitle) {
    referrerLink = document.referrer.split('/').pop();
} else {
    referrerTitle = defaultTitle;
    referrerLink = defaultLink;
}

const crumbs = document.querySelectorAll('breadcrumb');
crumbs.forEach(crumb => {
    const crumbLink = crumb.querySelector('a');

    crumbLink.textContent = `← Back to ${referrerTitle}`;
    crumbLink.setAttribute('href', referrerLink);
});

// DEBUG
// console.log(`Breadcrumbs updated: ${referrerTitle} (${referrerLink})`);