// Fetch and update the Description of each project listed on my resume
const username = 'AlexMcTeague';
// A list of project IDs that appear in the resume. (Monstrous Ambition not included; private repo)
// This script expects an "experience" class div, and a repo with a matching ID
const projects = ['KMZ-Processor', 'Network-Design-Tools', 'DesignShark', 'RDOF-QC-Tool'];

for (const project of projects) {
    fetch(`https://api.github.com/repos/${username}/${project}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log(data.description))
        .catch(error => console.error('There was a problem with your fetch operation:', error));
}