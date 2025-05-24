import React, { useState } from 'react';
import styles from './index.module.css';
import { addReservation, Restaurant } from '../../data2';

type Step = 'details' | 'confirmation' | 'success';

export function ReservationModal({ restaurant, tableId, onClose }: {
  restaurant: Restaurant;
  tableId: string;
  onClose: () => void
}) {
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectedTable = restaurant.tables.find((t) => t.id === tableId)!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.phone.trim()) return 'Phone is required';
    if (!formData.date) return 'Date is required';
    if (!formData.time) return 'Time is required';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 'details') {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }
      setError('');
      setStep('confirmation');
    } else {
      setIsSubmitting(true);
      setError('');

      try {
        // Create reservation object
        const reservation = {
          id: `res-${Date.now()}`,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          date: formData.date,
          time: formData.time,
          tableId: tableId,
          guests: selectedTable.capacity,
          specialRequests: formData.specialRequests || undefined,
          status: 'confirmed' as const,
          restaurantId: restaurant.id
        };

        // Save to your data store
        await addReservation(restaurant.id, reservation);

        setStep('success');
      } catch (err) {
        console.error('Reservation failed:', err);
        setError('Failed to make reservation. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <div className={styles.progressSteps}>
          <div className={`${styles.step} ${step !== 'details' ? styles.completed : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLabel}>Your Details</div>
          </div>
          <div className={`${styles.step} ${step === 'confirmation' ? styles.active : ''} ${step === 'success' ? styles.completed : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLabel}>Confirmation</div>
          </div>
          <div className={`${styles.step} ${step === 'success' ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepLabel}>Success</div>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Reserve Table {tableId} at {restaurant.name}</h2>
            <p>Table for {selectedTable.capacity} people</p>

            <div className={styles.formGroup}>
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]} // Disable past dates
              />
            </div>

            <div className={styles.formGroup}>
              <label>Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requirements..."
              />
            </div>

            <button
              type="submit"
              className={styles.continueButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </button>
          </form>
        )}

        {step === 'confirmation' && (
          <div className={styles.confirmation}>
            <h2>Confirm Your Reservation</h2>
            <div className={styles.reservationDetails}>
              <p><strong>Restaurant:</strong> {restaurant.name}</p>
              <p><strong>Table:</strong> {tableId} (for {selectedTable.capacity})</p>
              <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              {formData.specialRequests && (
                <p><strong>Special Requests:</strong> {formData.specialRequests}</p>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep('details')}
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className={styles.success}>
            <div className={styles.checkmark}>✓</div>
            <h2>Reservation Confirmed!</h2>
            <p>Your table at {restaurant.name} has been reserved.</p>
            <p>We've sent confirmation details to {formData.email}.</p>
            <div className={styles.reservationSummary}>
              <p><strong>Reservation Details:</strong></p>
              <p>Table {tableId} • {new Date(formData.date).toLocaleDateString()} at {formData.time}</p>
              <p>Confirmation code: {`${restaurant.name.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`}</p>
            </div>
            <button
              type="button"
              className={styles.doneButton}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}