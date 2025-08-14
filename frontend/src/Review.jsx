import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Navbar from "./Navbar"; // Adjust the path if necessary
import Footer from "./Footer"; // Adjust the path if necessary

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();  // Initialize navigate

  // Function to get JWT token from localStorage
  const getJwtToken = () => localStorage.getItem('jwtToken');

  // Fetch reviews on component load
  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to fetch reviews from the server
  const fetchReviews = () => {
    fetch('http://localhost:8080/api/review')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  };

  // Function to submit a new review
  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { username, description, rating };

    // Get the token from localStorage
    const token = getJwtToken();
    if (!token) {
      console.error('No token found, please log in');
      return;
    }

    // Send POST request with JWT in headers
    fetch('http://localhost:8080/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // only parse as JSON if the response is valid
      })
      .then((data) => {
        console.log('Review submitted successfully:', data.message);
        fetchReviews(); // Refresh the list of reviews
        setUsername('');
        setDescription('');
        setRating(1); // Reset form fields after submission
        
        // Redirect to homepage after submitting the review
        navigate('/');  // Redirect to homepage
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div style={styles.reviewContainer}>
      <Navbar /> {/* Include the Navbar here */}

      <h2 style={styles.title}>Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} style={styles.reviewForm}>
        <h3 style={styles.formTitle}>Leave Your Feedback</h3>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        ></textarea>
        <label style={styles.label}>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          style={styles.select}
        >
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
        <button type="submit" style={styles.submitButton}>Submit Review</button>
      </form>

      {/* Displaying Reviews */}
      <div style={styles.reviewsSection}>
        <h3 style={styles.reviewsTitle}>What Our Customers Say:</h3>
        <div style={styles.reviewsList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.reviewId} style={styles.reviewCard}>
                <h4 style={styles.reviewUsername}>{review.username}</h4>
                <p style={styles.reviewRating}>Rating: {review.rating} / 5</p>
                <p style={styles.reviewDescription}>{review.description}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>

      <Footer /> {/* Include the Footer here */}
    </div>
  );
};


// Styles (kept the same as you already defined)
const styles = {
  reviewContainer: {
    width: '100vw', // Full viewport width
    margin: '0 auto',
    padding: '20px',
  },

  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  },
  reviewForm: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    marginBottom: '40px',
  },
  formTitle: {
    fontSize: '1.5rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '10px',
    display: 'block',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #444',
    borderRadius: '6px',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '1rem',
  },
  submitButton: {
    backgroundColor: '#e50914',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
  },
  reviewsSection: {
    marginTop: '40px',
  },
  reviewsTitle: {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '20px',
  },
  reviewsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  reviewCard: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
  },
  reviewUsername: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#fff',
  },
  reviewRating: {
    fontSize: '1rem',
    marginBottom: '10px',
    color: '#fff',
  },
  reviewDescription: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#ccc',
  },
};

export default Review;
