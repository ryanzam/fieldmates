import Vision from '@/components/Vision'
import Nav from '../components/Nav'
import Hero from '@/components/Hero'

const Index = () => {
    return (
        <div className='min-h-screen bg-background'>
            <Nav />
            <main>
                <Hero />
                <Vision />
            </main>
        </div>
    )
}

export default Index