import React from 'react';
import Image from 'next/image';

const EarnPoints = () => {
  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24 bg-gradient-to-b from-purple-800 to-purple-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-gliker text-3xl md:text-4xl font-bold text-white mb-6">
            Earn Points. Unlock Wellness.
          </h2>
          <p className="font-urbanist text-gray-200 text-lg leading-relaxed mb-8">
            Every interaction on Psyber helps you grow — mentally and financially. Earn points from therapy sessions, learning lessons, completing challenges, and engaging with our community.
          </p>
          <p className="font-urbanist text-gray-300 text-base mb-8">
            Redeem your points for:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-100">
              <span className="text-green-400 mr-3 text-xl">✓</span>
              Premium therapy sessions
            </li>
            <li className="flex items-center text-gray-100">
              <span className="text-green-400 mr-3 text-xl">✓</span>
              Learning course access
            </li>
            <li className="flex items-center text-gray-100">
              <span className="text-green-400 mr-3 text-xl">✓</span>
              Crypto rewards & tokens
            </li>
            <li className="flex items-center text-gray-100">
              <span className="text-green-400 mr-3 text-xl">✓</span>
              Exclusive community perks
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              240
            </div>
            <p className="text-gray-700 font-urbanist text-xl mb-8">
              Points Earned Today 🎉
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600">Therapy Session</p>
                <p className="font-bold text-purple-600">+100 pts</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600">Wellness Task</p>
                <p className="font-bold text-purple-600">+75 pts</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600">Community Engagement</p>
                <p className="font-bold text-purple-600">+65 pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarnPoints;