
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";

const MembershipsPage = () => {
  const memberships = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      features: ["Access to basic choir events", "Community forum access", "Monthly newsletter"],
      color: "bg-soft-blue"
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "month",
      features: [
        "All Basic features",
        "Priority event registration",
        "Access to premium workshops",
        "Recording sessions access"
      ],
      color: "bg-primary",
      popular: true
    },
    {
      name: "Pro",
      price: "$29.99",
      period: "month",
      features: [
        "All Premium features",
        "1-on-1 vocal coaching",
        "Unlimited workshop access",
        "Custom sheet music",
        "Professional recordings"
      ],
      color: "bg-soft-purple"
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="container px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Choir Memberships</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {memberships.map((tier) => (
            <Card key={tier.name} className={`relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
              {tier.popular && (
                <Badge className="absolute top-4 right-4">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <span className="text-xl font-semibold">{tier.name}</span>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">/{tier.period}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-primary shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">Subscribe</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MembershipsPage;
