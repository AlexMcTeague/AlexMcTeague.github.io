// Find all links with the class "page-link", and add an event listener to store the referrer
let referrers = JSON.parse(localStorage.getItem('referrers')) || [];
const addReferrer = function() {
    let referrer = {
        title: document.title,
        link: window.location.href
    };
    referrers.push(referrer);
    localStorage.setItem('referrers', JSON.stringify(referrers));
}

const links = document.querySelectorAll('.page-link');
links.forEach(link => {
    link.addEventListener('click', addReferrer);
});

// Wipe the referrers list if we weren't referred to this page
if (document.referrer === '') {
    referrers = [];
    localStorage.setItem('referrers', JSON.stringify(referrers));
}

// Find all breadcrumb links, and update their text and href based on the most recent referrer
const defaultTitle = 'Alex McTeague - Index';
const defaultLink = 'index.html';

const crumbs = document.querySelectorAll('breadcrumb .back-link');
if (referrers.length > 0) {
    crumbs.forEach(crumb => {
        let referrer = referrers[referrers.length - 1];
        let referrerTitle = referrer.title || defaultTitle;
        let referrerLink = referrer.link || defaultLink;

        crumb.textContent = `← Back to ${referrerTitle}`;
        crumb.setAttribute('href', referrerLink);

        // Event listener to update the referrers list
        crumb.addEventListener('click', function() {
            referrers.pop(); // Remove the page we're returning to from the referrers list
            // Update the list in storage with the removed item
            localStorage.setItem('referrers', JSON.stringify(referrers));
        });
    });
} else {
    crumbs.forEach(crumb => {
        crumb.textContent = `← Back to ${defaultTitle}`;
        crumb.setAttribute('href', defaultLink);
    });
}