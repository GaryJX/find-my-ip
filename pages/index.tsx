import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Contact from '@/components/Contact/Contact'
import WorkExperience from '@/components/WorkExperience/WorkExperience'

export const Home: React.FC = () => {
  return (
    <main id="main">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills"></section>
      <section id="experience">
        <WorkExperience />
      </section>
      <section id="projects"></section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}

export default Home
