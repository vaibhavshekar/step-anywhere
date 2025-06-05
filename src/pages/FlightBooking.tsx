import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FlightDetails {
  from: string;
  to: string;
  date: string;
  flightNumber: string;
}

export default function FlightBooking() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flightDetails, setFlightDetails] = useState<FlightDetails>({
    from: '',
    to: '',
    date: '',
    flightNumber: '',
  });

  useEffect(() => {
    if (location.state?.flightDetails) {
      setFlightDetails(location.state.flightDetails);
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
                    <h2 className="text-2xl font-bold">Flight Booking Confirmed</h2>
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
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">PASSENGER</h3>
                    <p className="text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Adult</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">FLIGHT DETAILS</h3>
                    <p className="text-lg font-semibold">{flightDetails.flightNumber}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Economy Class</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-gray-800 text-sm text-gray-500">Flight Route</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{flightDetails.from}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Departure</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="flex items-center">
                      <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="mx-4">
                        <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{flightDetails.to}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Arrival</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">DEPARTURE</h3>
                    <p className="text-lg font-semibold">{new Date(flightDetails.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check-in opens 24h before departure</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">BAGGAGE</h3>
                    <p className="text-lg font-semibold">1 x 23kg</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hand luggage included</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">IMPORTANT INFORMATION</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Please arrive at the airport at least 2 hours before departure</li>
                    <li>• Have your ID and booking reference ready for check-in</li>
                    <li>• Online check-in opens 24 hours before departure</li>
                    <li>• Baggage drop closes 45 minutes before departure</li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => window.print()}
                    className="flex-1 bg-brand-purple hover:bg-brand-purple-dark text-white"
                  >
                    Download Ticket
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
                  Book a Flight
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Fill in the details to book your flight
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={flightDetails.from}
                    onChange={(e) => setFlightDetails({ ...flightDetails, from: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={flightDetails.to}
                    onChange={(e) => setFlightDetails({ ...flightDetails, to: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={flightDetails.date}
                    onChange={(e) => setFlightDetails({ ...flightDetails, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Flight Number</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-purple focus:border-brand-purple sm:text-sm"
                    value={flightDetails.flightNumber}
                    onChange={(e) => setFlightDetails({ ...flightDetails, flightNumber: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white"
                >
                  Book Flight
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