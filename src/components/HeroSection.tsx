import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Award } from 'lucide-react';
import heroImage from '@/assets/hero-electrical.jpg';

interface HeroSectionProps {
  onExploreProducts: () => void;
}

export const HeroSection = ({ onExploreProducts }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Electrical Equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/90 to-technical-blue/80" />
      </div>
      
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Professional
            <span className="block text-electric-orange">Electrical Equipment</span>
          </h1>
          
          <p className="text-lg lg:text-xl mb-8 text-white/90 leading-relaxed">
            Complete range of MCBs, MCCBs, meters, and electrical components for your industrial and commercial projects. Quality assured, competitive pricing.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Button 
              variant="electric" 
              size="lg" 
              onClick={onExploreProducts}
              className="text-lg px-8"
            >
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:border-electric-orange">
              Contact Us
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Zap className="h-6 w-6 text-electric-orange" />
              </div>
              <div>
                <h3 className="font-semibold">High Quality</h3>
                <p className="text-sm text-white/80">Premium electrical components</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Shield className="h-6 w-6 text-electric-orange" />
              </div>
              <div>
                <h3 className="font-semibold">Certified Safe</h3>
                <p className="text-sm text-white/80">IS & IEC standards compliant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Award className="h-6 w-6 text-electric-orange" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted Brand</h3>
                <p className="text-sm text-white/80">10+ years in electrical trade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};