'use server';

import mongoose, {Schema, model, models} from 'mongoose';

const bookingSchema = new Schema({
  movieId: {
    type: String,
    required: true,
  },
  showtime: {
    type: String,
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Booking = models.Booking || model('Booking', bookingSchema);

export default Booking;
