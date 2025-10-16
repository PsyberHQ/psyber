import React from 'react';

const WhatIsPsyber = () => {
  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24 border-t border-purple-700">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-8">
          What Is Psyber?
        </h2>
        
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 md:p-12 shadow-xl border border-purple-500">
          <p className="font-urbanist text-base md:text-lg text-gray-100 leading-relaxed">
            Psyber is a digital wellness platform combining therapy, motivation, and mindfulness for the modern web3 generation. Whether you're battling burnout, anxiety, or just need motivation, Psyber connects you with licensed therapists, trained listeners, and engaging self-improvement tools — all in one secure app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-purple-700 rounded-xl p-6 border border-purple-600">
            <div className="text-3xl mb-4">
              <i className="bx bx-brain text-4xl text-white"></i>
            </div>
            <h3 className="font-bold text-white mb-2">Mental Health First</h3>
            <p className="text-gray-200 text-sm">Access certified therapists and trained listeners anytime.</p>
          </div>

          <div className="bg-purple-700 rounded-xl p-6 border border-purple-600">
            <div className="text-3xl mb-4">
              <i className="bx bx-dumbbell text-4xl text-white"></i>
            </div>
            <h3 className="font-bold text-white mb-2">Motivation & Growth</h3>
            <p className="text-gray-200 text-sm">Earn rewards while building better habits and achieving goals.</p>
          </div>

          <div className="bg-purple-700 rounded-xl p-6 border border-purple-600">
            <div className="text-3xl mb-4">
              <i className="bx bx-lock text-4xl text-white"></i>
            </div>
            <h3 className="font-bold text-white mb-2">Web3 Native</h3>
            <p className="text-gray-200 text-sm">Use fiat or crypto, earn tokens, and own your wellness journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsPsyber;