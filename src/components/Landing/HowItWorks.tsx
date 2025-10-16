import React from 'react';

const HowItWorks = () => {
  const services = [
    {
      icon: 'bx-brain',
      title: 'Psychological Readiness Test',
      description: 'Start with a unique test to assess how ready you are for web3. This will personalize your experience to ensure you\'re mentally prepared for the journey ahead.',
    },
    {
      icon: 'bx-task',
      title: 'Interactive Tasks & Quizzes',
      description: 'We make web 3.0 learning interactive and engaging. Each lesson introduces key web 3.0 concepts, followed by a quiz and practical tasks. For every completed task, you earn tokens as a reward.',
    },
    {
      icon: 'bx-heart',
      title: 'Mind Wellness Along the Way',
      description: 'Relax with integrated mind games and therapy sessions designed to help both new and experienced users maintain your mental balance while advancing through the web3 space.',
    },
  ];

  return (
    <section className="px-[3vw] py-16 md:px-[4vw] md:py-24" style={{ backgroundColor: '#2C083F' }}>
      <h2 className="font-gliker text-center text-3xl md:text-4xl font-bold text-white mb-4">
        How It Works
      </h2>
      <p className="text-center text-gray-300 font-urbanist mb-12 max-w-2xl mx-auto">
        Learn, Act, and Earn with Psyber
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purple-600"
          >
            <div className="text-purple-600 mb-4">
              <i className={`bx ${service.icon} text-5xl`}></i>
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