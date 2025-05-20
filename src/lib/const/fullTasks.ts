// Fallback tasks data for when the API is unavailable

export const fullTasks = [
  {
    id: '01',
    title: 'Introduction to blockchain & web 3.0',
    description: 'Learn how blockchain works, the differences between web2 and web3, and why web3 gives you more control over your data.',
    learningTip: "Remember, the goal is to understand the 'why' behind web3. This will be your foundation for the tasks ahead.",
    reward: '50 tokens',
    progress: 0,
    lessons: [
      {
        id: 1,
        title: 'Introduction to blockchain p1',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview',
            content: 'Blockchain is a digital ledger that securely records transactions. Instead of being controlled by a single entity, it\'s shared among multiple participants, making it nearly impossible to alter without everyone noticing.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example',
            content: 'Unlike web 2.0, where data is managed and controlled by a single entity, blockchain distributes control among many, reducing the risk of tampering and increasing security.',
          },
          {
            id: 3,
            type: 'text',
            heading: 'Key takeaway',
            content: 'While web2 is dominated by a few big companies that control user data, Web 3.0 allows users to own their data and participate directly in the digital economy.',
          },
        ],
      },
      {
        id: 2,
        title: 'Introduction to blockchain p2',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview p2',
            content: 'Blockchain is a digital ledger that securely records transactions. Instead of being controlled by a single entity, it\'s shared among multiple participants, making it nearly impossible to alter without everyone noticing.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example p2',
            content: 'Unlike web 2.0, where data is managed and controlled by a single entity, blockchain distributes control among many, reducing the risk of tampering and increasing security.',
          },
          {
            id: 3,
            type: 'text',
            heading: 'Key takeaway p2',
            content: 'While web2 is dominated by a few big companies that control user data, Web 3.0 allows users to own their data and participate directly in the digital economy.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is blockchain?',
        options: [
          {
            id: 1,
            content: 'A digital ledger that securely records transactions',
          },
          {
            id: 2,
            content: 'A new type of database only used by banks',
          },
          {
            id: 3,
            content: 'A programming language for creating websites',
          },
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'What is a key difference between Web2 and Web3?',
        options: [
          {
            id: 1,
            content: 'Web3 only works on mobile devices',
          },
          {
            id: 2,
            content: 'In Web3, users can own and control their data',
          },
          {
            id: 3,
            content: 'Web3 is only used for gaming applications',
          },
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '02',
    title: 'NFTs - More Than Just Digital Art',
    description: 'Discover how NFTs work and their potential uses beyond digital art, from real estate to identity verification.',
    learningTip: 'Think of NFTs as digital certificates of authenticity and ownership that can be applied to almost anything.',
    reward: '75 tokens',
    progress: 0,
    lessons: [
      {
        id: 1,
        title: 'Understanding NFTs',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'What are NFTs?',
            content: 'NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of specific items. Unlike cryptocurrencies, each NFT has distinct value and cannot be exchanged on a like-for-like basis.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Beyond Digital Art',
            content: 'While digital art has made NFTs famous, they can represent ownership of virtually anything: real estate, event tickets, identity documents, or even access rights to exclusive content.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'What does NFT stand for?',
        options: [
          {
            id: 1,
            content: 'New Financial Technology',
          },
          {
            id: 2,
            content: 'Non-Fungible Token',
          },
          {
            id: 3,
            content: 'Network File Transfer',
          },
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '03',
    title: 'Smart Contracts Explained Simply',
    description: 'Learn how smart contracts automate agreements without middlemen, making transactions more efficient and secure.',
    learningTip: 'Imagine smart contracts as digital vending machines: they execute automatically when certain conditions are met.',
    reward: '100 tokens',
    progress: 0,
    lessons: [
      {
        id: 1,
        title: 'Smart Contracts Basics',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'What are Smart Contracts?',
            content: 'Smart contracts are self-executing programs stored on a blockchain that run when predetermined conditions are met. They typically automate the execution of an agreement so all participants can be immediately certain of the outcome.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real-world Applications',
            content: 'Smart contracts can be used for a variety of applications including insurance claims processing, supply chain management, voting systems, and decentralized finance.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'Which of the following best describes smart contracts?',
        options: [
          {
            id: 1,
            content: 'Legal documents written by AI',
          },
          {
            id: 2,
            content: 'Self-executing programs that run on a blockchain',
          },
          {
            id: 3,
            content: 'Contracts exclusively used by technology companies',
          },
        ],
        correctAnswer: 2,
      },
    ],
  },
];

export default fullTasks;
