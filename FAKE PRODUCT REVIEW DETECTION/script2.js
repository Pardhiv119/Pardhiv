function analyzeFile() {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        updateUI(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error analyzing reviews');
    });
}

function updateUI(data) {
    // Update overall statistics
    document.getElementById('overall-genuine').textContent = `${data.overall.genuine}%`;
    document.getElementById('overall-fake').textContent = `${data.overall.fake}%`;

    // Update individual reviews
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ''; // Clear existing reviews

    data.reviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });
}

function createReviewElement(review) {
    const div = document.createElement('div');
    div.className = 'review-item';
    
    div.innerHTML = `
        <h3>Review #${review.doc_id}: ${review.title}</h3>
        <div class="review-stats">
            <span class="genuine">Genuine: ${review.genuine}%</span>
            <span class="fake">Fake: ${review.fake}%</span>
        </div>
    `;
    
    return div;
}
