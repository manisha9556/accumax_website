import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Stats from '@/components/Stats/Stats';
import Features from '@/components/Features/Features';
import VideoSection from '@/components/VideoSection/VideoSection';
import Testimonials from '@/components/Testimonials/Testimonials';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <VideoSection />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
