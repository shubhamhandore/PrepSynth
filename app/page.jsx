import { HeroSection } from "@/components/Hero"
import { features } from "@/data/features"
import { Card, CardContent } from "@/components/ui/card"
import { howItWorks } from "@/data/howItWorks"
import { testimonial } from "@/data/testimonial"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/data/faqs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="relative bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-gray-900" />
      
      <div className="relative z-10">
        <HeroSection />

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-gray-900/80">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-300">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border border-gray-700/50 bg-gray-800/30 hover:border-indigo-400/50 transition-all hover:bg-gray-800/50">
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="text-indigo-300 text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-gray-800/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {['50+ Industries', '1000+ Questions', '95% Success', '24/7 Support'].map((item, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-300">{item.split(' ')[0]}</h3>
                  <p className="text-gray-400 text-sm md:text-base text-center">{item.split(' ')[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 bg-gray-900/80">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-300">
              Simple 4-Step Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-indigo-400/30 transition-all">
                  <div className="w-14 h-14 rounded-full bg-indigo-400/10 flex items-center justify-center text-indigo-300 text-2xl mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-100 text-center mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 bg-gray-800/20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-300">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonial.map((review, index) => (
                <Card key={index} className="bg-gray-800/30 border border-gray-700/50 hover:border-indigo-400/30 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image 
                        src={review.image}
                        width={48}
                        height={48}
                        alt={review.author}
                        className="rounded-full border-2 border-indigo-300/30"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-100">{review.author}</h4>
                        <p className="text-sm text-gray-400">{review.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic text-sm leading-relaxed">"{review.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-12 md:py-24 bg-gray-900/80">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-300">
              Common Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={faq.question} className="border-b border-gray-700/50">
                    <AccordionTrigger className="py-4 text-gray-100 hover:text-indigo-300 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 pb-4 text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="container mx-auto py-24 px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-300 mb-4">
                Start Your Career Transformation
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join 10,000+ professionals who boosted their careers
              </p>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-indigo-400 to-purple-300 hover:from-indigo-500 hover:to-purple-400 text-gray-900 font-semibold px-8 py-6 text-lg transition-all transform hover:scale-105">
                  Begin Now ➔
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}