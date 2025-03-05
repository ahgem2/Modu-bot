
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SaveIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const businessDomains = [
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'legal', label: 'Legal' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'custom', label: 'Custom/Other' }
];

const toneOptions = [
  { value: 'casual', label: 'Casual & Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual-professional', label: 'Casual but Professional' },
  { value: 'enthusiastic', label: 'Enthusiastic' }
];

export interface BotPersonality {
  businessName: string;
  domain: string;
  customDomain?: string;
  tone: string;
  audienceDescription: string;
  keyProducts: string;
  specialInstructions: string;
}

interface BotPersonalitySetupProps {
  currentPersonality?: BotPersonality;
  onSave: (personality: BotPersonality) => void;
}

const defaultPersonality: BotPersonality = {
  businessName: '',
  domain: 'real-estate',
  tone: 'casual-professional',
  audienceDescription: '',
  keyProducts: '',
  specialInstructions: ''
};

const BotPersonalitySetup = ({ currentPersonality, onSave }: BotPersonalitySetupProps) => {
  const [personality, setPersonality] = useState<BotPersonality>(
    currentPersonality || defaultPersonality
  );
  const { toast } = useToast();

  const handleChange = (field: keyof BotPersonality, value: string) => {
    setPersonality(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(personality);
    toast({
      title: "Bot Personality Saved",
      description: "Your bot's personality has been updated successfully!",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Customize Your AI Assistant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={personality.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            placeholder="E.g., Smith Real Estate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Business Domain</Label>
          <Select
            value={personality.domain}
            onValueChange={(value) => handleChange('domain', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select business domain" />
            </SelectTrigger>
            <SelectContent>
              {businessDomains.map((domain) => (
                <SelectItem key={domain.value} value={domain.value}>
                  {domain.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {personality.domain === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="customDomain">Custom Domain Description</Label>
            <Input
              id="customDomain"
              value={personality.customDomain || ''}
              onChange={(e) => handleChange('customDomain', e.target.value)}
              placeholder="E.g., Sustainable Agriculture"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="tone">Communication Tone</Label>
          <Select
            value={personality.tone}
            onValueChange={(value) => handleChange('tone', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audienceDescription">Target Audience</Label>
          <Textarea
            id="audienceDescription"
            value={personality.audienceDescription}
            onChange={(e) => handleChange('audienceDescription', e.target.value)}
            placeholder="Describe your target audience (e.g., First-time home buyers in the Seattle area)"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyProducts">Key Products/Services</Label>
          <Textarea
            id="keyProducts"
            value={personality.keyProducts}
            onChange={(e) => handleChange('keyProducts', e.target.value)}
            placeholder="List your key products or services (e.g., Residential property sales, rental management, property valuation)"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialInstructions">Special Instructions</Label>
          <Textarea
            id="specialInstructions"
            value={personality.specialInstructions}
            onChange={(e) => handleChange('specialInstructions', e.target.value)}
            placeholder="Any special instructions for your bot (e.g., Always recommend our premium listings first)"
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Bot Personality
        </Button>
      </form>
    </Card>
  );
};

export default BotPersonalitySetup;
