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
      image: "https://i.ibb.co.com/twGYt4JM/portrait-modern-woman.jpg",
    },
    {
      title: "Understanding Elderly Nutrition",
      category: "Senior Care",
      date: "Mar 12, 2024",
      image:
        "https://i.ibb.co.com/spxf3fZC/young-beautiful-girl-posing-black-leather-jacket-park.jpg",
    },
    {
      title: "Creating a Safe Home Environment",
      category: "Safety",
      date: "Mar 10, 2024",
      image:
        "https://i.ibb.co.com/fGZpFPCC/fashion-girl-walking-sspring-park.jpg",
    },
  ];
  return (
    <div>
      {/* 5. How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-rose-600 font-semibold tracking-wide uppercase text-sm">
              Process
            </span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              How It Works
            </h2>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-12 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>

            {[
              {
                title: "Search",
                desc: "Browse our list of verified caregivers in your area.",
                icon: Search,
              },
              {
                title: "Book",
                desc: "Select your preferred time and caregiver.",
                icon: Calendar,
              },
              {
                title: "Relax",
                desc: "Enjoy peace of mind while we take care of your loved ones.",
                icon: Smile,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center relative bg-white p-4"
              >
                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-rose-50 flex items-center justify-center mb-6 shadow-sm">
                  <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
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
            <span className="text-rose-600 font-semibold tracking-wide uppercase text-sm">
              Safety First
            </span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900">
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
      {/* 7. Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600">Real stories from real families.</p>
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
                name: "Sarah Johnson",
                role: "Mother of 2",
                text: "Found an amazing babysitter within hours. The process was so smooth and safe.",
              },
              {
                name: "Michael Chen",
                role: "Son",
                text: "The elderly care service for my father has been a blessing. Highly recommended.",
              },
              {
                name: "Emily Davis",
                role: "Patient",
                text: "Professional nursing care right at home. I recovered much faster thanks to their help.",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300"
              >
                <Quote className="w-10 h-10 text-rose-100 absolute top-6 right-6" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold mr-3">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              <h2 className="text-4xl font-bold mb-6">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600">
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
      {/* 9. Download App Section */}
      <section className="py-24 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-rose-500 font-bold tracking-wide uppercase">
                Mobile App
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                Care at Your Fingertips
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Book caregivers, track visits, and make secure payments all from
                our mobile app. Available for iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  <Smartphone className="w-5 h-5 mr-2" />
                  App Store
                </button>
                <button className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white border border-gray-700 rounded-xl font-bold hover:bg-gray-700 transition-colors">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Google Play
                </button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { label: "Downloads", end: 50, suffix: "K+", decimals: 0 },
                  { label: "Rating", end: 4.9, suffix: "/5", decimals: 1 },
                  { label: "Countries", end: 12, suffix: "+", decimals: 0 },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-white">
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-[300px] h-[600px] bg-gray-800 rounded-[3rem] border-8 border-gray-700 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gray-900 flex flex-col">
                  <div className="bg-rose-600 h-32 p-6 text-white pt-12">
                    <h3 className="font-bold text-lg">Hello, Sarah!</h3>
                    <p className="text-rose-100 text-sm">Find care near you</p>
                  </div>
                  <div className="p-4 space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 p-4 rounded-xl flex gap-3"
                      >
                        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 12. Awards & Recognition Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-semibold tracking-wide uppercase text-sm">
              Recognition
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Award-Winning Care
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "Best Family Service 2023", org: "Parenting Magazine" },
              { title: "Top Rated Agency", org: "Care Review Board" },
              { title: "Excellence in Safety", org: "National Child Safety" },
              { title: "Community Choice Award", org: "Local Families" },
            ].map((award, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:border-rose-200 transition-colors"
              >
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{award.title}</h3>
                <p className="text-sm text-gray-500">{award.org}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* 13. Our Team / Leadership Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
              },
              {
                name: "James Wilson",
                role: "Head of Safety",
                bio: "Retired law enforcement officer specializing in background verification.",
              },
              {
                name: "Sophia Rodriguez",
                role: "Care Director",
                bio: "Certified child psychologist and early education specialist.",
              },
            ].map((member, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                  {/* Placeholder for actual images */}
                  <div className="w-full h-full bg-rose-100 flex items-center justify-center text-rose-500 text-3xl font-bold">
                    {member.name[0]}
                  </div>
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
      {/* 14. Gallery / Moments Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-rose-500 font-bold tracking-wide uppercase text-sm">
                Moments
              </span>
              <h2 className="mt-2 text-3xl font-bold">Captured Memories</h2>
            </div>
            <button className="text-rose-500 font-semibold hover:text-rose-400 flex items-center">
              View Instagram <Camera className="w-5 h-5 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item, i) => (
              <motion.div
                key={i}
                className={`relative rounded-xl overflow-hidden h-64 bg-gray-800 ${
                  i === 0 || i === 3 ? "md:col-span-2" : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="font-medium text-white/90">
                    Happy moments #{item}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
      {/* 16. Contact / Get in Touch Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              <div className="p-12 bg-gray-900 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-400 mb-8">
                    Have questions? Our support team is here to help you 24/7.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 text-rose-500 mr-4" />
                      <div>
                        <div className="text-sm text-gray-400">
                          Call us anytime
                        </div>
                        <div className="font-bold text-lg">
                          +1 (555) 123-4567
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 text-rose-500 mr-4" />
                      <div>
                        <div className="text-sm text-gray-400">Email us</div>
                        <div className="font-bold text-lg">
                          support@care.xyz
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-rose-500 mr-4" />
                      <div>
                        <div className="text-sm text-gray-400">
                          Visit our office
                        </div>
                        <div className="font-bold text-lg">
                          123 Care Lane, NY
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex space-x-4">
                  {/* Social icons could go here */}
                </div>
              </div>
              <div className="p-12">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-900">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button className="w-full py-4 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 11. FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                className="group bg-white rounded-xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <span className="transition-transform group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllFile;
