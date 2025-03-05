
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PricingSection from '@/components/PricingSection';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Talking, Done Simply</title>
        <meta name="description" content="Experience the power of conversational AI with 100 free questions. Get instant answers, creative content, and intelligent assistance." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <Hero />
          <Features />
          <PricingSection />

          {/* Testimonials Section */}
          <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-2 mb-4 text-xs font-medium tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full">
                  User Testimonials
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Users Say
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Discover how QueryQuest is helping people boost their productivity and creativity.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Testimonial 1 */}
                <div className="glass-card dark:glass-card-dark rounded-2xl p-6 shadow">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    "QueryQuest has completely transformed how I work. The AI assistant helps me draft emails, summarize documents, and answer complex questions in seconds."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                      <span className="font-semibold text-blue-700">SJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Marketing Director</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="glass-card dark:glass-card-dark rounded-2xl p-6 shadow">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    "As a developer, I'm impressed by the technical knowledge of this AI. It helps me debug code, explains complex concepts, and suggests better approaches to problems."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
                      <span className="font-semibold text-green-700">DP</span>
                    </div>
                    <div>
                      <p className="font-medium">David Park</p>
                      <p className="text-sm text-gray-500">Software Engineer</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="glass-card dark:glass-card-dark rounded-2xl p-6 shadow">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    "The free tier was enough to convince me of the value. I upgraded to Pro and now I use QueryQuest daily for content creation, research, and brainstorming ideas."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                      <span className="font-semibold text-purple-700">MS</span>
                    </div>
                    <div>
                      <p className="font-medium">Michelle Silva</p>
                      <p className="text-sm text-gray-500">Content Creator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Experience the Future of AI Assistance?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Start with 100 free questions and discover how our AI can transform your productivity.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Get Started - It's Free
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                    onClick={() => window.location.href = '#pricing'}
                  >
                    View Pricing Plans
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                  QueryQuest
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                  Experience the power of conversational AI with QueryQuest. Get instant answers, creative content, and intelligent assistance.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Home</a></li>
                  <li><a href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</a></li>
                  <li><a href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Dashboard</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} QueryQuest. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
