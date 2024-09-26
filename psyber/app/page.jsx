import Link from 'next/link';
import Image from 'next/image';
// import '../components/button.module.css'
// import styles from 

export default function Home() {
  return (
    <>
      {/* SECTION ONE */}
      <section className="md:px-[4vw] px-[3vw] bg-[#FEFCFFAB] h-fit py-[50px]">
            <nav className="w-full h-[75px] py-4 flex justify-between items-center sticky top-0 bg-white">
              <div className="flex items-center">
                <Link href="/">
                  <Image src="/psyberLogo.png" alt="Logo" width={100} height={100} />
                </Link>
              </div>

              <div className="flex items-center">
                <Link href="/">
                  <button className="bg-[#BA68C8] w-[154px] h-[40px] text-[14px] rounded-[42px] text-white font-semibold  px-4 ">
                   Lets&rsquo;s get started
                  </button>
   
                </Link>
              </div>
            </nav><br />




            <div className='w-full h-fit flex justify-between items-center gap-[30px]'>
              <div className='w-[600px]'>
                  <h1 className='text-[48px] font-[600] leading-[57px] text-brand-darkbrown'>Feeling Lost in the Web3 Buzz? Don&rsquo;t Worry, We&rsquo;ve Got You</h1><br />
                  <p className='font-[400] text-[16px] leading-[23px] text-brand-darkbrown'>Whether you&rsquo;re a professional or just someone who loves staying updated, Psyber helps you smoothly navigate Web3 while prioritizing your mental well-being</p><br />
                 
                  <Link href="/">
                    <button className='bg-[#BA68C8] w-[212px] h-[58px] text-[20px] rounded-[42px] text-white font-semibold  px-4 '>
                      Explore Psyber
                    </button>
                  </Link>
              </div>

              {/* <div className='h-[300px] w-[500px]'> */}
                  <Image src="/sectiononegirl.png" alt="Logo" width={850} height={900}  />
                  {/* <Image src="/frametwo.jpg" alt="Logo" width={55 height={550}  className='relative top-[-500px]'/> */}
                  {/* <Image src="/.jpg" alt="Logo" width={60} height={60}  /> */}
              {/* </div> */}
            </div>
      </section>




         {/* SECTION TWO */}
      <section className='md:px-[4vw] px-[3vw] md:pt-[50px] pt-[30px] h-[400px] bg-[#B28FD529]'>
          <h1 className='text-[40px] font-[600] leading-[47px] m-auto w-fit text-brand-darkbrown'>Web3 is Complex – But It <br /> Doesn&rsquo;t Have to be Stressful.</h1><br /><br />
     
          <div className='flex justify-center items-center gap-[40px]'>
             <div className='p-3 2xl:p-[18px] h-fit w-[399px] rounded-[15px] bg-[#f7ddfb] font-[400] text-[#321C2A] text-[15px] 2xl:text-[16px] leading-[19.2px]'>
                Let&rsquo;s face it – Web3 can feel overwhelming with all the jargon, new technologies, and fast-paced changes. It&rsquo;s easy to feel like you&rsquo;re falling behind.
             </div>

             <div className='p-3 2xl:p-[18px] h-fit w-[400px] rounded-[15px] bg-[#f7ddfb] font-[400] text-[#321C2A] text-[15px] 2xl:text-[16px] leading-[19.2px]'>
               But here&rsquo;s the thing: you don&rsquo;t need to be a tech expert to keep up. Whether you're a professional, student, or someone curious about the future, we&rsquo;re here to make learning Web3 stress-free and even… fun!
             </div>

             <div className='p-3 2xl:p-[18px] h-fit w-[400px] rounded-[15px] bg-[#f7ddfb] font-[400] text-[#321C2A] text-[15px] 2xl:text-[16px] leading-[19.2px]'>
                <span className='font-bold'>For everyone:</span> It&rsquo;s for those who consume tech, not just those who work in it. Psyber is designed to help everyday professionals like teachers, doctors, lawyers, and more.
             </div>
          </div>
      </section>



        {/* SECTION THREE */}
      <section className='md:px-[4vw] px-[3vw] md:pt-[60px] lg:pt-[70px] pt-[30px] pb-[30px] h-fit flex gap-[30px] justify-center items-center'>
          <Image src="/sectionThreeImg.jpg" alt="Logo" width={550} height={550}  />

          <div className='w-[550px] 2xl:w-[599px]'>
              <h1 className='text-[40px] font-[600] leading-[44px] text-brand-darkbrown'>Breathe Easy – Psyber Makes Web3 Learning Simple</h1><br />
              <p className='leading-[19px] font-[400] text-brand-black'>With Psyber, you don&rsquo;t need to worry about getting overwhelmed. We break down complex Web3 concepts into small, manageable tasks designed specifically for non-tech users</p><br />
              <p className='leading-[19px] font-[400] text-brand-black'><span className='font-bold'>Who is this for?</span> This is for everyone who wants to stay updated on Web3 technologies while prioritizing their mental health—teachers, lawyers, doctors, therapists, and anyone curious about the future of tech.</p><br />
              <p className='leading-[19px] font-[400] text-brand-black'><span className='font-bold'>Task-Based Learning:</span> Enjoy small, daily tasks that help you ease into Web3 at your own pace, without stress.</p><br /><br />

              <div className='m-auto'>
                <Link href="/">
                  <button className='bg-[#BA68C8] m-auto w-[212px] h-[54px] text-[20px] rounded-[42px] text-white font-semibold  px-[14px] '>
                    Start learning
                  </button>
                </Link>
              </div>
          </div>
      </section>




            {/* SECTION FOUR-A */}
      <section className='mt-[-35px] rounded-bl-[50px] md:px-[4vw] px-[3vw] pt-[80px] pb-[40px] h-fit bg-[#CDFEC269]'>
          <h1 className='m-auto w-[490px] font-[600] text-[#321C2A] leading-[45px] text-[40px] text-center mb-[60px]'>Your Web3 Journey – Simplified and Stress-Free</h1>
    
          <div className='flex justify-center flex-wrap gap-[15px] items-start border-2 border-red-500'>
              <div className='border-2 border-green-800 w-[210px] h-fit m-auto'>
                <span className='font-bold'>Web3 Pop Quiz:</span> Test your Web3 knowledge in a fun, low-pressure way
              </div>

              <div className='border-2 border-green-800 w-[240px] h-fit m-auto'>
                <span className='font-bold'>Psychological Readiness Test:</span> Find out if you’re ready to dive into Web3 – without the anxiety
              </div>

              <div className='border-2 border-green-800 w-[230px] h-fit m-auto'>
                <span className='font-bold'>Task-Based Learning:</span> Complete easy daily tasks like ‘What’s an NFT?’ or ‘How does blockchain work?’ – no tech skills required.
              </div>

              <div className='border-2 border-green-800 w-[260px] h-fit m-auto'>
                <span className='font-bold'>On-Demand Counseling:</span>  Feeling stressed? Talk to a professional whenever you need.
              </div>

              <div className='border-2 border-green-800 w-[260px] h-fit m-auto'>
                <span className='font-bold'>Earn Rewards:</span>Stay motivated by earning crypto rewards and tokens as you learn.
              </div>
          </div>
      </section>




        {/* SECTION FOUR-B */}
      <section className='md:px-[4vw] px-[3vw] md:pt-[60px] lg:pt-[80px] xl:pt-[120px] pt-[30px] flex gap-[30px] justify-center items-center' style={{
         backgroundImage: "url(/wave.png)"
        }}>
         
      </section>



              {/* SECTION FIVE  */}
      <section className='md:px-[4vw] px-[3vw] md:pt-[40px] pt-[20px]'>
         <h1 className='text-[40px] leading-[47px] w-[571px] m-auto text-center font-[600] text-brand-darkbrown mb-[40px]'>How Psyber Makes Web3 Easy for You </h1>
         <div className='flex gap-[30px] justify-center items-center border-2 border-black h-[280px] mb-[50px]'>

         </div>

         <div className='m-auto w-fit'>
          <Link href="/">
              <button className='bg-[#BA68C8] m-auto w-[145px] h-[54px] text-[18px] rounded-[42px] text-white font-[700]  px-[14px] '>
                Get started?
              </button>
            </Link>
         </div>
      </section><br />






           {/* SECTION SIX */}
      <section className='md:px-[4vw] px-[3vw] md:pt-[40px] pt-[20px] bg-gradient-to-b from-[#F4F4F3] to-white h-fit'>
         <h1 className='text-[40px] leading-[47px] w-fit m-auto text-center font-[600] text-brand-darkbrown mb-[40px]'>Join the Psyber Community – Never Feel Left Behind.</h1>
         <div className='flex flex-wrap gap-[30px] justify-center items-center h-[280px] mb-[50px]'>
            <div className='bg-brand-lightgreen text-[14px] font-[400] leading-[20px]  rounded-t-[50px] rounded-bl-[50px] p-8 sm:w-[360px] w-[98%]'>
              In the Web3 world, Twitter is where everything happens. It&rsquo;s where Web3 enthusiasts connect, where important events are shared, and where opportunities unfold. If you&rsquo;re looking to stay up-to-date, network, or learn from others in the space, Twitter is your gateway. With Psyber, we help you step into the Web3 conversation seamlessly.
            </div>

            <div className='bg-brand-lightgreen text-[14px] font-[400] leading-[20px] rounded-t-[50px] rounded-bl-[50px] p-6 sm:w-[360px] w-[98%]'>
              No more feeling left out: “With Psyber&rsquo;s integration, you&rsquo;ll get started on Twitter as a Web3 enthusiast, and we&rsquo;ll guide you every step of the way.
            </div>

            <div className='bg-brand-lightgreen text-[14px] font-[400] leading-[20px] rounded-t-[50px] rounded-bl-[50px] p-8 sm:w-[360px] w-[98%]'>
              As you learn and grow, you can share your progress directly from the app to Twitter. By completing tasks, you&rsquo;ll automatically send tweets, positioning yourself as part of the Web3 ecosystem. Not only does this showcase your learning, but it also opens doors to networking and finding opportunities.
            </div>
         </div>
      </section><br />



    



            {/* SECTION SEVEN */}
      <section className='md:px-[4vw] px-[3vw] md:pt-[40px] h-fit py-[100px]' style={{
             backgroundImage: "url(/wavybg.jpg)",
             backgroundSize: "cover",
             backgroundPosition: "center",
       }}>
         <h1 className='text-[32px] w-fit m-auto text-center font-[600] text-brand-darkbrown mt-[90px]'>Community Highlight</h1>
         <div className='flex flex-wrap gap-[20px] justify-center items-center h-[280px]'>
            <div className='h-[140px] w-[370px] p-3 bg-[#D9D9D9] rounded-[50px] flex gap-[20px] justify-between items-center'>
                <Image src="/circleTwitter.png" alt="Logo" width={90} height={90}  />
                <p className='text-[14px] leading-[18px] font-[400] text-brand-darkbrown'><span className='font-bold'>Twitter Significance:</span> Twitter is the hub for Web3 users, and by using Psyber, you'll be able to immerse yourself in conversations, trends, and events that define the space.</p>
            </div>

            <div className='h-[140px] w-[370px] p-3 bg-[#D9D9D9] rounded-[50px] flex gap-[20px] justify-between items-center'>
                 <Image src="/circleTelegram.png" alt="Logo" width={90} height={90}  />
                <p className='text-[14px] leading-[18px] font-[400] text-brand-darkbrown'><span className='font-bold'>Telegram Community:</span> Join our vibrant Telegram groups where you can ask questions, discuss ideas and connect with fellow learners.</p>
            </div>

            <div className='h-[140px] w-[370px] p-3 bg-[#D9D9D9] rounded-[50px] flex gap-[20px] justify-between items-center'>
               <Image src="/circleSolana.png" alt="Logo" width={90} height={90}  />
               <p className='text-[14px] leading-[18px] font-[400] text-brand-darkbrown'><span className='font-bold'>Social Rewards:</span> Earn tokens not just by completing tasks, but also for sharing your achievements on Twitter and engaging in the Telegram community.</p>
            </div>
         </div>


         <div className='m-auto w-fit'>
          <Link href="/">
              <button className='bg-[#BA68C8] m-auto w-fit h-[54px] text-[18px] rounded-[42px] text-white font-[700]  px-[22px] '>
                Join our community
              </button>
            </Link>
         </div>
      </section>







        {/* SECTION EIGHT */}
        <section className='md:px-[4vw] px-[3vw] md:pt-[40px] h-fit flex gap-[20px] justify-center items-center' >
           
         <div className='max-w-[692px]'>
           <h1 className='text-[40px] text-left font-[600] text-brand-darkbrown '>What&rsquo;s Next on Your Psyber Journey?</h1><br />
           <div className='max-w-xl'>
              <p className='text-[14px] font-[400] text-brand-darkbrown leading-[17px] mb-[25px]'>Excited about learning Web3? We&rsquo;re not stopping here! Stay tuned for upcoming features designed for experienced Web3 users who want to handle the stress and challenges of Web3 trading and more</p>
              <p className='text-[14px] font-[400] text-brand-darkbrown leading-[17px] mb-[40px]'>For those already in the Web3 world – you&rsquo;ll soon have access to games, stress-relief activities, and psychological assessments tailored to the unique pressures of Web3 trading.</p>
            
              <Link href="/">
                  <button className='bg-[#BA68C8] m-auto w-fit h-[54px] text-[18px] rounded-[42px] text-white font-[700]  px-[22px] '>
                      Sign up for early access
                  </button>
               </Link>
           </div>
         </div>

         <Image src="/girl.png" alt="Logo" width={390} height={390} />
      </section>





               {/* FOOTER  */}
       <footer className='border-t-[3px] border-neutral-400  py-[30px] md:px-[4vw] px-[3vw]'>
          <div className='flex justify-between gap-[30px] flex-wrap items-start'>
            <div className='w-fit'>
              <Image src="/footerLogo.jpg" alt="Logo" width={140} height={140}  />
            </div>

            <div className='w-[100px]'>
              <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px]'>Why Psyber?</p>
              <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px]'>How It works</p>
              <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px]'>Features</p>
            </div>

            <div className='w-[100px]'>
              <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600] mb-[30px] '>Rewards</p>
              <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]'>Counseling</p>
            </div>

            <div className='w-[110px]'>
              <div className='text-left w-fit flex justify-center gap-2 items-center mb-[20px]'>
                <Image src="/telegram.jpg" alt="Logo" width={28} height={28}  />
                <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]'>Psyber</p>
              </div>

              <div className='flex justify-center gap-2 items-center'>
                <Image src="/twitter.jpg" alt="Logo" width={20} height={20}  />
                <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]'>PsyberHQ</p>
              </div>
            </div>

    
            <div className='w-fit'>
              <div className='text-left w-fit flex justify-center gap-2 items-center mb-[20px]'>
                <Image src="/phone.jpg" alt="Logo" width={22} height={22}  />
                <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]'>0987654321</p>
              </div>

              <div className='flex justify-center gap-2 items-center'>
                <Image src="/envelop.jpeg" alt="Logo" width={20} height={20}  />
                <p className='md:text-[15px] text-[14px] text-brand-darkbrown font-inter font-[600]'>psyber@psyber</p>
              </div>
            </div>

            <div className='w-[320px]'>
              <p className='mb-[30px] font-[700]'>Join our mailing list for your weekly dose of wellness and Web3 innovation.</p>

              <div className='w-[318px] p-2 rounded-[40px] border-2 border-neutral-500 flex gap-[10px] justify-between items-center'>
                  <input type="email" name="" id="" placeholder='Enter your email' className='outline-none pl-2'/>
                  <button className='bg-[#BA68C8] hover:bg-[#933ba3] w-[90px] h-[40px] md:text-[18px] text-[15px] rounded-[42px] text-white font-semibold  px-[2px]'>Join</button>
              </div>
            </div>
         </div>
       </footer>

    </>
  );
}

