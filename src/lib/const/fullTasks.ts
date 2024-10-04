import { TaskWithLessonQuiz } from '@/Types/Task';

const Fulltasks: TaskWithLessonQuiz[] = [
  {
    id: '01',
    title: 'Introduction to blockchain & web 3.0',
    description:
      'Learn how blockchain works, the differences between web2 and web3, and why web3 gives you more control over your data.',
    learningTip:
      "Remember, the goal is to understand the 'why' behind web3. This will be your foundation for the tasks ahead.",
    reward: '50 tokens',
    lessons: [
      {
        id: 1,
        title: 'Introduction to blockchain',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview',
            content:
              'Blockchain is a digital ledger that securely records transactions. Instead of being controlled by a single entity, it’s shared among multiple participants, making it nearly impossible to alter without everyone noticing.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example',
            content:
              'Imagine a group of students working on a shared google doc. If one person makes a change, everyone else can see it, ensuring transparency.',
          },
          {
            id: 3,
            type: 'text',
            heading: 'How it’s different and better than web 2.0',
            content:
              'Unlike web 2.0 , where data is managed and controlled by a single entity, blockchain distributes control among many, reducing the risk of tampering and increasing security.',
          },
          {
            id: 4,
            type: 'text',
            heading: 'Key takeaway',
            content:
              'While web2 is dominated by a few big companies that control user data, Web 3.0 allows users to own their data and participate directly in the digital economy.',
          },
        ],
      },
      {
        id: 2,
        title: 'Decentralized networks and web 3.0',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview',
            content:
              'Decentralized networks distribute control and decision-making power among many participants rather than relying on a central authority. Web 3.0 is built on these decentralized principles, allowing users to have more control over their data and digital assets, creating a more open and user-driven internet.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example',
            content:
              'Imagine a potluck dinner where everyone brings a dish, and no single person decides the menu. Instead, everyone contributes and enjoys the meal together, ensuring fairness and shared control.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'How it’s different and better than web 2.0',
            content:
              'In web 2.0, centralized platforms make decisions and control user data. In web3.0 , power and control are distributed among users, enhancing transparency, security, and autonomy',
          },
          {
            id: 3,
            type: 'text',
            heading: 'Key takeaway',
            content:
              'Decentralized networks and web 3.0 prioritize user control, creating a more democratic and user-centered internet experience compared to centralized web 2.0 systems.',
          },
        ],
      },
      {
        id: 3,
        title: 'How transactions are verified in blockchain',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview',
            content:
              'In a decentralized network, transactions are verified by multiple independent participants called nodes. These nodes work together to reach consensus, ensuring that each transaction is valid before it is added to the blockchain, making the system secure and trustworthy.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example',
            content:
              'Imagine a group of friends agreeing on where to eat. Everyone must agree on the restaurant before making a reservation, ensuring that no one person makes the decision alone.',
          },
          {
            id: 3,
            type: 'text',
            heading: 'How it’s different and better than web 2.0',
            content:
              'Unlike web 2.0 , where data is managed and controlled by a single entity, blockchain distributes control among many, reducing the risk of tampering and increasing security.',
          },
          {
            id: 4,
            type: 'text',
            heading: 'Key takeaway',
            content:
              'Blockchain transactions are verified by multiple participants through a consensus process, creating a secure and tamper-resistant system.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'Which of the following best describes blockchain?',
        options: [
          {
            id: 1,
            content: 'A centralized system managed by one authority',
          },
          {
            id: 2,
            content: 'A digital ledger shared by multiple participants',
          },
          {
            id: 3,
            content: 'A social media platform for sharing data',
          },
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'How is a decentralized network different from web2?',
        options: [
          {
            id: 1,
            content: 'it relies on a central authority',
          },
          {
            id: 2,
            content: 'It distributes decision-making across participants',
          },
          {
            id: 3,
            content: 'It only works offline',
          },
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'What makes blockchain data tamper-proof?',
        options: [
          {
            id: 1,
            content: 'It is stored in a single location',
          },
          {
            id: 2,
            content: 'Blocks are linked, so altering one impacts the whole chain',
          },
          {
            id: 3,
            content: 'It is written in a secret language',
          },
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '02',
    title: 'Introduction to Digital Wallets',
    description:
      'Learn about digital wallets, why they are important in web 3.0, and how they differ from traditional online accounts in web 2.0.',
    learningTip:
      'Focus on understanding why digital wallets are essential in web 3.0; this will help you see how they provide more control and security for your digital assets.',
    reward: '50 tokens',
    lessons: [
      {
        id: 1,
        title: 'What is a Digital Wallet?',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview',
            content:
              'A digital wallet is a tool that allows you to store, send, and receive digital assets such as cryptocurrencies. It acts like a virtual version of your physical wallet but for managing digital money and assets online.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example',
            content:
              "Think of a digital wallet as a mobile banking app that lets you check your balance, make payments, and transfer money, but instead of dollars, you're handling cryptocurrencies.",
          },
          {
            id: 3,
            type: 'text',
            heading: 'How it’s different and better than web 2.0',
            content:
              'Unlike web 2.0 wallets (e.g., payment apps like PayPal), which require a centralized service to manage your funds, web 3.0 digital wallets give you full control over your assets without any intermediary.',
          },
          {
            id: 4,
            type: 'text',
            heading: 'Key takeaway',
            content:
              'A digital wallet is essential for managing your cryptocurrencies, enabling secure transactions and easy access to your digital assets.',
          },
        ],
      },
      {
        id: 2,
        title: 'How Digital Wallets Work',
        content: [
          {
            id: 1,
            type: 'text',
            heading: 'Overview',
            content:
              'Digital wallets use private and public keys to manage transactions. The private key is like a password that gives you access to your assets, while the public key is like your account number that you share to receive payments.',
          },
          {
            id: 2,
            type: 'text',
            heading: 'Real Life Example',
            content:
              'Imagine you have a mailbox (public key) that anyone can drop mail into, but only you have the key (private key) to open it and access the contents.',
          },
          {
            id: 3,
            type: 'text',
            heading: 'How it’s different and better than web 2.0',
            content:
              'Web 2.0 wallets rely on usernames and passwords stored by centralized companies, making them vulnerable to hacks. Digital wallets give you full control over your keys, enhancing security and privacy.',
          },
          {
            id: 4,
            type: 'text',
            heading: 'Key takeaway',
            content:
              'Your private key is your most important asset; never share it, as it grants access to your funds.',
          },
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'What is a primary function of a digital wallet?',
        options: [
          {
            id: 1,
            content: 'Storing physical cash',
          },
          {
            id: 2,
            content: 'Managing cryptocurrencies and digital assets',
          },
          {
            id: 3,
            content: 'Recording usernames and passwords',
          },
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'What does the private key in a digital wallet represent?',
        options: [
          {
            id: 1,
            content: 'A shared public address',
          },
          {
            id: 2,
            content: 'A password that gives access to your assets',
          },
          {
            id: 3,
            content: 'A pin code for your bank card',
          },
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'How is a web3 wallet different from a web2 wallet?',
        options: [
          {
            id: 1,
            content: 'It only works offline',
          },
          {
            id: 2,
            content: 'It gives you full control of assets without third parties',
          },
          {
            id: 3,
            content: "It's managed by banks",
          },
        ],
        correctAnswer: 2,
      },
    ],
  },
];

export default Fulltasks;
