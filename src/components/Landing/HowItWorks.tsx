import React from 'react';

const HowItWorks = () => {
  const services = [
    {
      icon: 'bx-target-lock',
      title: 'On-Demand Therapy',
      description: 'Connect with certified therapists via chat, audio, or video — anytime you need. Affordable, private, and human.',
    },
    {
      icon: 'bx-first-aid',
      title: 'Instant PFA Support',
      description: 'Talk to trained listeners when you\'re overwhelmed. Get instant psychological first aid and guidance within minutes.',
    },
    {
      icon: 'bx-trophy',
      title: 'Motivation Through GoalStake',
      description: 'Join or create personal growth challenges. Stake small amounts, achieve goals, and earn rewards when you win.',
    },
  ];

  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24 bg-gradient-to-b from-purple-900 to-purple-800">
      <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-4">
        How It Works
      </h2>
      <p className="text-center text-gray-300 font-urbanist mb-12 max-w-2xl mx-auto">
        Your journey to balance, simplified into three powerful steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purple-600"
          >
            <div className="text-5xl mb-4">
              <i className={`bx ${service.icon} text-5xl text-purple-600`}></i>
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-4">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;