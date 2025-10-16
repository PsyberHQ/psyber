import React from 'react';

const Roadmap = () => {
  const features = [
    {
      icon: 'bx-code-block',
      title: 'Advanced Web 3.0 Tasks',
      description: 'Comprehensive exploration of smart contracts, NFTs, and DeFi, offering you expert understanding of the web 3 space in detail.',
    },
    {
      icon: 'bx-group',
      title: 'Collaborations with Web3 Experts',
      description: 'We\'re building partnerships with industry leaders to bring consultations and expert advice directly to you.',
    },
    {
      icon: 'bx-coin-stack',
      title: 'Psyber Token Launch',
      description: 'Unveiling our unique token, enabling you to accumulate, exchange, and participate within the psyber ecosystem.',
    },
    {
      icon: 'bx-brain',
      title: 'Mental Health Features',
      description: 'Incorporating mental puzzles, therapy interactions, and tools for mental health to bolster your well-being while you evolve in the realm of web 3.0.',
    },
    {
      icon: 'bx-mobile-alt',
      title: 'Mobile App Launch',
      description: 'Access all of Psyber\'s features on the go with our mobile app, designed for seamless learning and engagement anytime, anywhere.',
    },
    {
      icon: 'bx-user-plus',
      title: 'Advanced Collaboration Tools',
      description: 'Cooperate with teammates on shared projects and engage in group-centric duties to enhance your web3 comprehension.',
    },
  ];

  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24" style={{ backgroundColor: '#2C083F' }}>
      <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-4">
        And more is coming
      </h2>
      <p className="text-center text-gray-300 font-urbanist mb-12 max-w-2xl mx-auto">
        We're building the future of digital wellness. Here's what's coming.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 rounded-xl p-6 border border-purple-600 text-center hover:border-purple-400 transition-colors duration-300"
          >
            <div className="text-white mb-4">
              <i className={`bx ${feature.icon} text-5xl`}></i>
            </div>
            <h3 className="font-bold text-lg text-white mb-3">{feature.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;