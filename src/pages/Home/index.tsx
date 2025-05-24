import { useState } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { restaurants } from '../../data2';
import { Page } from '../../components/Page';
  
const categories = Array.from(new Set(restaurants.map(r => r.category)));

export function Home() {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = !categoryFilter || restaurant.category === categoryFilter;
    const matchesRating = restaurant.rating >= ratingFilter;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesRating && matchesSearch;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className={styles.starFilled}>★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className={styles.starFilled}>★</span>);
      } else {
        stars.push(<span key={i} className={styles.starEmpty}>★</span>);
      }
    }

    return <div className={styles.stars}>{stars} <span>({rating.toFixed(1)})</span></div>;
  };

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <Page>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome to Rezervo</h1>
          <p>Discover and book your next dining experience</p>
        </div>

        <div className={styles.ownerSection}>
          <p>Are you a restaurant owner?</p>
          <button
            className={styles.ownerButton}
            onClick={() => navigate('/login')}
          >
            Register Your Restaurant
          </button>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="rating">Minimum Rating</label>
            <select
              id="rating"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
            >
              <option value="0">Any Rating</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
        </div>

        <div className={styles.restaurantList}>
          {filteredRestaurants.map(restaurant => (
            <div
              key={restaurant.id}
              className={styles.restaurantCard}
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <img
                src={restaurant.images[0]}
                alt={restaurant.name}
                className={styles.restaurantImage}
              />
              <div className={styles.restaurantInfo}>
                <h3 className={styles.restaurantName}>{restaurant.name}</h3>
                <span className={styles.restaurantCategory}>{restaurant.category}</span>
                {renderStars(restaurant.rating)}
                <p className={styles.restaurantDescription}>{restaurant.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}