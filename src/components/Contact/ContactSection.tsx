import TerminalForm from './TerminalForm';
import Footer from './Footer';

export default function ContactSection() {
    return (
        <section className="min-h-screen bg-void flex flex-col justify-center relative py-20 px-4">
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <a href="mailto:sayushman782@gmail.com" className="group">
                        <h2 className="text-4xl md:text-5xl font-bold font-sans group-hover:text-neon-green transition-colors">
                            Initialize Connection
                        </h2>
                    </a>
                    <p className="font-mono text-neon-blue">ssh root@portfolio:~/contact</p>
                </div>
                <TerminalForm />
            </div>
            <Footer />
        </section>
    );
}
