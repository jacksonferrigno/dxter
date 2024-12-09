'use client';
import React, { useEffect, useState } from 'react';
import { LearningStats } from '@/components/LearningStats';
import { Droplets, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
/**
 * stats inerface for dashboard
 */
interface DashboardStats {
  overview: {
    totalInteractions: number;
    lowConfidenceCount: number;
    avgConfidence: number;
  };
}
/**
 * admin dashboard component 
 * display ai system performance 
 * updates every 5 minutes 
*/
export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
/**
 * gets latest stats from api
 */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-red-950 
                      flex items-center justify-center">
        <div className="animate-pulse flex items-center space-x-2">
          <Droplets className="text-red-500 w-8 h-8" />
          <span className="text-gray-400">Loading statistics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-red-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Chat</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Droplets className="text-red-500 w-8 h-8" />
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-red-400 to-red-600 
                           bg-clip-text text-transparent">
                Dxter Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* Stats Content */}
        {stats ? (
          <LearningStats stats={{...stats, topComponents: []}} />
        ) : (
          <div className="text-center text-gray-400">
            No statistics available
          </div>
        )}
      </div>
    </div>
  );
}