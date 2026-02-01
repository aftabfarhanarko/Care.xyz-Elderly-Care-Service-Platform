"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  CheckCircle,
  Quote,
  Calendar,
  Search,
  Smile,
  Award,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Smartphone,
  PlayCircle,
  FileText,
  Briefcase,
  Mail,
  HeartHandshake,
  Sparkles,
  Phone,
  Camera,
  Trophy,
  Globe,
} from "lucide-react";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AllFile = () => {
  const features = [
    {
      title: "Safety First",
      description:
        "Every caregiver undergoes a rigorous 7-point background check and identity verification.",
      icon: Shield,
    },
    {
      title: "Certified Professionals",
      description:
        "Our team consists of certified nurses, trained babysitters, and experienced caregivers.",
      icon: Award,
    },
    {
      title: "Flexible Booking",
      description:
        "Book for a few hours or a few weeks. We adapt to your schedule and requirements.",
      icon: Calendar,
    },
  ];

  const faqs = [
    {
      question: "How do you verify your caregivers?",
      answer:
        "We conduct comprehensive background checks, reference verifications, and in-person interviews for every caregiver.",
    },
    {
      question: "What happens if a caregiver cancels?",
      answer:
        "We have a replacement guarantee. If a caregiver cancels, we'll immediately find a qualified replacement for you.",
    },
    {
      question: "Is there a minimum booking duration?",
      answer:
        "Yes, our minimum booking duration is 4 hours to ensure fair compensation for our caregivers.",
    },
    {
      question: "Are your services insured?",
      answer:
        "Yes, all our bookings are covered by our comprehensive liability insurance policy for your peace of mind.",
    },
  ];

  const plans = [
    {
      name: "Basic",
      priceVal: 0,
      period: "/month",
      features: ["Search Caregivers", "View Profiles", "Basic Support"],
      recommended: false,
    },
    {
      name: "Premium",
      priceVal: 29,
      period: "/month",
      features: [
        "Unlimited Bookings",
        "Background Checks View",
        "Priority Support",
        "Insurance Included",
      ],
      recommended: true,
    },
    {
      name: "Family",
      priceVal: 49,
      period: "/month",
      features: [
        "Multiple Profiles",
        "Dedicated Care Manager",
        "24/7 Concierge",
        "Emergency Backup",
      ],
      recommended: false,
    },
  ];

  const blogs = [
    {
      title: "10 Tips for First-Time Parents",
      category: "Parenting",
      date: "Mar 15, 2024",
      image:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Understanding Elderly Nutrition",
      category: "Senior Care",
      date: "Mar 12, 2024",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Creating a Safe Home Environment",
      category: "Safety",
      date: "Mar 10, 2024",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600",
    },
  ];
  return (
    <div>
      {/* 6. Why Choose Us / Features */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 pb-1">
                Why Families Trust Us
              </h2>
              <p className="text-gray-400 text-lg mb-12">
                We take the safety and well-being of your family seriously.
                Here's why we are the #1 choice for care services.
              </p>
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-600 text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-rose-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center font-bold text-xl">
                    <CountUp
                      end={98}
                      suffix="%"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Satisfaction Rate</div>
                    <div className="text-gray-400 text-sm">
                      Based on{" "}
                      <CountUp
                        end={2000}
                        suffix="+"
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />{" "}
                      reviews
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-700/50 p-4 rounded-lg flex items-center"
                    >
                      <Star className="w-5 h-5 text-yellow-400 mr-3" />
                      <span className="text-sm">
                        "Absolutely amazing service!"
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 6.5 Safety & Trust Detail */}
      <section className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="font-semibold tracking-wide uppercase text-sm text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              Safety First
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 pb-1">
              Our Vetting Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
              We reject{" "}
              <CountUp
                end={95}
                suffix="%"
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />{" "}
              of applicants. Only the most qualified and trustworthy make it to
              your home.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-rose-200 -translate-y-1/2 z-0"></div>
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { title: "Identity Check", icon: Users },
                { title: "Criminal Record", icon: ShieldCheck },
                { title: "Reference Check", icon: FileText },
                { title: "Skills Assessment", icon: Award },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center border border-rose-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Rigorous verification to ensure complete peace of mind.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 6.8 Trust Banner */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  <CountUp
                    end={100}
                    suffix="%"
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />{" "}
                  Satisfaction Guarantee
                </h3>
                <p className="text-gray-400">
                  If you're not happy with your first booking, we'll refund you
                  in full.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-6 py-2 border-r border-gray-700 last:border-0">
                <div className="text-3xl font-bold text-rose-500">
                  <CountUp
                    end={50}
                    suffix="K+"
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Bookings
                </div>
              </div>
              <div className="text-center px-6 py-2 border-r border-gray-700 last:border-0">
                <div className="text-3xl font-bold text-rose-500">
                  <CountUp
                    end={0}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Safety Incidents
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 Careers Section */}
      <section className="py-24 bg-rose-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-rose-800 text-rose-200 px-4 py-1 rounded-full text-sm font-bold mb-6 inline-block">
                Join Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Do what you love,
                <br />
                get paid for it.
              </h2>
              <p className="text-rose-100 text-lg mb-8">
                Join our community of professional caregivers. Set your own
                rates, choose your schedule, and find families that appreciate
                you.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Keep 100% of your tips",
                  "Flexible Schedule",
                  "Insurance Coverage",
                  "Professional Training",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-rose-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-8 py-4 bg-white text-rose-900 rounded-full font-bold hover:bg-rose-50 transition-colors">
                Apply to be a Caregiver
              </button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  <div className="h-48 bg-rose-800/50 rounded-2xl backdrop-blur-sm p-6 border border-rose-700">
                    <Briefcase className="w-8 h-8 text-rose-300 mb-4" />
                    <div className="text-2xl font-bold">
                      <CountUp
                        end={25}
                        prefix="$"
                        suffix="/hr"
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-sm text-rose-200">
                      Average Earnings
                    </div>
                  </div>
                  <div className="h-48 bg-rose-800/50 rounded-2xl backdrop-blur-sm p-6 border border-rose-700">
                    <HeartHandshake className="w-8 h-8 text-rose-300 mb-4" />
                    <div className="text-2xl font-bold">
                      <CountUp
                        end={500}
                        suffix="+"
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-sm text-rose-200">Families helped</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-rose-800/50 rounded-2xl backdrop-blur-sm p-6 border border-rose-700">
                    <Sparkles className="w-8 h-8 text-rose-300 mb-4" />
                    <div className="text-2xl font-bold">
                      <CountUp
                        end={4.9}
                        suffix="/5"
                        decimals={1}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-sm text-rose-200">
                      Sitter Happiness
                    </div>
                  </div>
                  <div className="h-48 bg-rose-800/50 rounded-2xl backdrop-blur-sm p-6 border border-rose-700">
                    <ShieldCheck className="w-8 h-8 text-rose-300 mb-4" />
                    <div className="text-2xl font-bold">
                      <CountUp
                        end={100}
                        suffix="%"
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-sm text-rose-200">Verified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Membership Plans */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Choose the plan that fits your family's needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-2xl ${
                  plan.recommended
                    ? "bg-white shadow-xl ring-2 ring-rose-500 scale-105 z-10"
                    : "bg-white shadow-sm border border-gray-100"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    <CountUp
                      end={plan.priceVal}
                      prefix="$"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${
                    plan.recommended
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Our Team / Leadership Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Dedicated professionals committed to redefining family care
              standards.
            </p>
          </div>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Dr. Emily Carter",
                role: "Founder & CEO",
                bio: "Former pediatrician with 15+ years of experience in child health.",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
              },
              {
                name: "James Wilson",
                role: "Head of Safety",
                bio: "Retired law enforcement officer specializing in background verification.",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
              },
              {
                name: "Sophia Rodriguez",
                role: "Care Director",
                bio: "Certified child psychologist and early education specialist.",
                image:
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
              },
            ].map((member, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 15. Service Areas / Location Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                We Are Where You Are
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our network of professional caregivers covers major cities
                across the country. Wherever you call home, quality care is just
                around the corner.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "New York",
                  "Los Angeles",
                  "Chicago",
                  "Houston",
                  "Miami",
                  "Seattle",
                ].map((city, i) => (
                  <div
                    key={i}
                    className="flex items-center text-gray-700 font-medium"
                  >
                    <MapPin className="w-5 h-5 text-rose-500 mr-2" />
                    {city}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4">
                  Don't see your city?
                </p>
                <button className="text-rose-600 font-bold hover:underline flex items-center">
                  Check coverage map <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
            <motion.div
              className="relative h-[400px] bg-gray-100 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Abstract Map Representation */}
              <div className="absolute inset-0 bg-rose-50 flex items-center justify-center">
                <Globe className="w-48 h-48 text-rose-200" />
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-rose-500 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-rose-500 rounded-full animate-ping delay-75"></div>
                <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-rose-500 rounded-full animate-ping delay-150"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllFile;
