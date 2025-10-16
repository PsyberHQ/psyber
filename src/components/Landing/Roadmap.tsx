import React from 'react';

const Roadmap = () => {
  const features = [
    {
      icon: '🏆',
      title: 'GoalStake Challenges',
      description: 'Earn rewards for achieving your personal goals.',
    },
    {
      icon: '🎓',
      title: 'Learn Hub',
      description: 'Bite-sized mental health and wellness education.',
    },
    {
      icon: '📱',
      title: 'Mobile App Launch',
      description: 'Take Psyber wellness wherever you go.',
    },
    {
      icon: '🧩',
      title: 'Group Therapy Rooms',
      description: 'Join live mental wellness sessions with peers.',
    },
    {
      icon: '🤖',
      title: 'AI Wellness Coach',
      description: 'Personalized coaching powered by advanced AI.',
    },
    {
      icon: '🌐',
      title: 'Global Expansion',
      description: 'Multi-language support and therapists worldwide.',
    },
  ];

  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24 bg-purple-900">
      <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-4">
        What's Next for Psyber
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
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="font-bold text-lg text-white mb-3">{feature.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;