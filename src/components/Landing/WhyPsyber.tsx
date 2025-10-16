import React from 'react';

const WhyPsyber = () => {
  const features = [
    {
      title: 'Hands-on Learning',
      description: 'Instead of just reading about web3, you\'ll be completing practical tasks like setting up a wallet and using blockchain apps.',
      icon: 'bx-code-alt',
    },
    {
      title: 'Earn Tokens as You Learn',
      description: 'Complete tasks and quizzes, and get rewarded with psyber\'s own tokens that will be redeemable within the platform.',
      icon: 'bx-coin',
    },
    {
      title: 'Mental Wellness Focus',
      description: 'Our unique platform integrates relaxation and therapy sessions to reduce stress and maintain mental balance.',
      icon: 'bx-heart-circle',
    },
    {
      title: 'For Beginners and Advanced Users',
      description: 'Whether you\'re just starting out or an experienced web3 user, Psyber adapts to your needs, offering engaging content at every level.',
      icon: 'bx-group',
    },
    {
      title: 'Guided Path for Latest DApps',
      description: 'Start building your real estate portfolio, no matter the size of your wallet with guided paths through the latest decentralized applications.',
      icon: 'bx-map',
    },
    {
      title: 'Privacy First',
      description: 'Your mental health data is encrypted and secure. Your wellness, your rules.',
      icon: 'bx-shield-check',
    },
  ];

  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24" style={{ backgroundColor: '#2C083F' }}>
      <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-4">
        Why Psyber
      </h2>
      <p className="text-center text-gray-300 font-urbanist mb-12 max-w-2xl mx-auto">
        Why Choose Psyber for Your Web3 Journey?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-6 border border-purple-600 hover:border-purple-400 transition-colors duration-300 hover:shadow-lg"
          >
            <div className="text-white mb-4">
              <i className={`bx ${feature.icon} text-4xl`}></i>
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