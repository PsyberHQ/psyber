import React from 'react';

const WhyPsyber = () => {
  const features = [
    {
      title: 'Affordable Support',
      description: 'Therapy and emotional aid starting at just $3 per hour.',
      icon: 'bx-money',
    },
    {
      title: 'Earn While You Heal',
      description: 'Earn Psyber Points for sessions, completing tasks, and engaging in wellness activities.',
      icon: 'bx-gem',
    },
    {
      title: 'Web3-Ready',
      description: 'Use fiat or crypto to pay and earn rewards, powered by Mercuryo for seamless transactions.',
      icon: 'bx-bolt',
    },
    {
      title: 'Personalized Experience',
      description: 'Every session and task adapts to your mental state and progress.',
      icon: 'bx-target-lock',
    },
    {
      title: 'Community Connection',
      description: 'Join a supportive community of remote workers and tech professionals who understand your journey.',
      icon: 'bx-group',
    },
    {
      title: 'Privacy First',
      description: 'Your mental health data is encrypted and secure. Your wellness, your rules.',
      icon: 'bx-lock',
    },
  ];

  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24 bg-purple-900">
      <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-4">
        Why Psyber?
      </h2>
      <p className="text-center text-gray-300 font-urbanist mb-12 max-w-2xl mx-auto">
        We've reimagined mental health for the digital age.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-6 border border-purple-600 hover:border-purple-400 transition-colors duration-300 hover:shadow-lg"
          >
            <div className="text-4xl mb-4">
              <i className={`bx ${feature.icon} text-4xl text-white`}></i>
            </div>
            <h3 className="font-bold text-lg text-white mb-3">{feature.title}</h3>
            <p className="text-gray-200 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPsyber;