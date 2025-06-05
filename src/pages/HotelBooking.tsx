import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface HotelDetails {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
}

export default function HotelBooking() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelDetails>({
    hotelName: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
  });

  useEffect(() => {
    if (location.state?.hotelDetails) {
      setHotelDetails(location.state.hotelDetails);
      setShowConfirmation(true);
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {showConfirmation ? (
          <div className="min-h-screen bg-gradient-to-br from-brand-purple-light/30 to-brand-blue-light/40 dark:from-brand-purple/20 dark:to-brand-blue-light/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-brand-purple text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Hotel Booking Confirmed</h2>
                    <p className="text-sm text-brand-purple-light mt-1">Booking Reference: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Status</p>
                    <p className="text-lg font-semibold text-green-300">Confirmed</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">GUEST</h3>
                    <p className="text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Primary Guest</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">ROOM DETAILS</h3>
                    <p className="text-lg font-semibold">{hotelDetails.roomType}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{hotelDetails.guests} {hotelDetails.guests === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-gray-800 text-sm text-gray-500">Stay Details</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{new Date(hotelDetails.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check-in</p>
                    <p className="text-sm text-gray-500">From 3:00 PM</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="flex items-center">
                      <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="mx-4">
                        <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{new Date(hotelDetails.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check-out</p>
                    <p className="text-sm text-gray-500">Until 11:00 AM</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">HOTEL</h3>
                    <p className="text-lg font-semibold">{hotelDetails.hotelName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Direct Booking</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">AMENITIES</h3>
                    <p className="text-lg font-semibold">Room Service</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Free WiFi • Breakfast Included</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">IMPORTANT INFORMATION</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Please present a valid ID and the credit card used for booking at check-in</li>
                    <li>• Early check-in and late check-out are subject to availability</li>
                    <li>• Free cancellation up to 24 hours before check-in</li>
                    <li>• Contact the hotel directly for any special requests</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => window.print()}
                    className="flex-1 bg-brand-purple hover:bg-brand-purple-dark text-white"
                  >
                    Download Voucher
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="flex-1"
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-brand-purple-light/30 to-brand-blue-light/40 dark:from-brand-purple/20 dark:to-brand-blue-light/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-purple-dark bg-clip-text text-transparent">
                  Book a Hotel
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Fill in the details to book your hotel
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hotel Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={hotelDetails.hotelName}
                    onChange={(e) => setHotelDetails({ ...hotelDetails, hotelName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-in Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={hotelDetails.checkIn}
                    onChange={(e) => setHotelDetails({ ...hotelDetails, checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-out Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={hotelDetails.checkOut}
                    onChange={(e) => setHotelDetails({ ...hotelDetails, checkOut: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Type</label>
                  <select
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={hotelDetails.roomType}
                    onChange={(e) => setHotelDetails({ ...hotelDetails, roomType: e.target.value })}
                  >
                    <option value="">Select a room type</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={hotelDetails.guests}
                    onChange={(e) => setHotelDetails({ ...hotelDetails, guests: parseInt(e.target.value) })}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white"
                >
                  Book Hotel
                </Button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 