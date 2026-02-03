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
  Heart,
  Stethoscope,
  Sun,
  Activity,
  Home,
  Utensils,
  Leaf,
  GraduationCap,
  Palette,
  Sprout,
  Brain,
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
  const differenceFeatures = [
    {
      title: "Amazing Atmosphere",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy nibh euismod tincidunt.",
      icon: Sun,
    },
    {
      title: "Latest Medical Care",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy nibh euismod tincidunt.",
      icon: Stethoscope,
    },
    {
      title: "Courteous & Caring Staff",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy nibh euismod tincidunt.",
      icon: Users,
    },
    {
      title: "Yoga For Relaxation",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy nibh euismod tincidunt.",
      icon: Leaf,
    },
    {
      title: "Assisted Living Support",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy nibh euismod tincidunt.",
      icon: HeartHandshake,
    },
    {
      title: "Hospice Care",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam, sed diam nonummy nibh euismod tincidunt.",
      icon: Home,
    },
  ];
  const faqs = [
    {
      question: "How do I book a caregiver?",
      answer:
        "Go to Services, choose a caregiver or service, and tap Book Now. You’ll confirm details before finalizing.",
    },
    {
      question: "Can I leave a review after booking?",
      answer:
        "Yes. After a booking is completed, you can share feedback to help others choose confidently.",
    },
    {
      question: "Is the platform mobile friendly?",
      answer:
        "Yes. The entire experience is optimized for mobile, tablet, and desktop screen sizes.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "We support common online payment methods. Exact options depend on your region and availability.",
    },
    {
      question: "How are caregivers vetted?",
      answer:
        "Caregivers are verified for identity and experience. Ratings and reviews help maintain quality.",
    },
  ];
  const [activeFaq, setActiveFaq] = React.useState(null);

  return (
    <div className="overflow-hidden">
      {/* 1. We make a Difference Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-rose-50/50 blur-3xl"></div>
          <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-50/50 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-rose-600 font-bold tracking-widest uppercase text-sm mb-3"
            >
              Welcome to Care.xyz
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              We make a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                Difference
              </span>{" "}
              in your lives
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              It is difficult to pinpoint the exact age when an adult becomes a
              geriatric patient. It is a gradual process that enforces the need
              for some kind of support by family or medical staff without which,
              the patient may be worse off.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {differenceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex gap-5 group"
              >
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center group-hover:from-rose-100 group-hover:to-purple-100 transition-colors duration-300">
                    <feature.icon
                      className="w-8 h-8 text-rose-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Expert Care Section */}
      <section className="py-24  relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden h-64 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
                      alt="Nurse smiling"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">Care that will</h4>
                    <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mt-1">
                      LAST FOREVER
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="rounded-3xl overflow-hidden h-80 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=600"
                      alt="Elderly care"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -z-10 top-1/2 -left-12 -translate-y-1/2 grid grid-cols-3 gap-2 opacity-30">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-rose-400"
                  ></div>
                ))}
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-rose-600 font-bold tracking-widest uppercase text-sm mb-2 block">
                Value for Life
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
                Expert Care{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                  of the Elderly
                </span>
              </h2>

              <ul className="space-y-5 mb-10">
                {[
                  "Competent Staff",
                  "Quality Medical Care",
                  "Relaxation Techniques",
                  "Amazing Ambiance",
                  "Excellent Cuisine",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-700 font-medium"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mr-4 shrink-0">
                      <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-rose-600 bg-rose-50 border-2 border-rose-100 rounded-xl hover:bg-rose-100 hover:border-rose-200 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Cards Section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "GENUINE CARE WINS!",
                desc: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
                image:
                  "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&q=80&w=600",
                icon: Heart,
              },
              {
                title: "A CAREER IN NURSING?",
                desc: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
                image:
                  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
                icon: Stethoscope,
              },
              {
                title: "REASSURING STAFF",
                desc: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
                image:
                  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600",
                icon: Smile,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                </div>
                <div className="p-8 relative">
                  {/* Icon Badge */}
                  <div className="absolute -top-8 left-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border-2 border-rose-50">
                    <card.icon className="w-8 h-8 text-rose-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3 tracking-wide uppercase">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  <button className="w-full py-3 bg-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 group-hover:bg-rose-700 transition-colors">
                    <card.icon className="w-4 h-4" />
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Caring is a way of life Section */}
      <section className="py-24  relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              {/* Outer glow / depth */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-rose-200/40 via-purple-200/40 to-transparent blur-2xl"></div>

              <div className="relative z-10 max-w-lg">
                {/* Main Card */}
                <div className="relative rounded-[2rem] overflow-hidden border border-white/60 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  {/* Image */}
                  <img
                    src="https://i.ibb.co.com/SwwxTTPQ/career-img.png"
                    alt="Happy elderly couple"
                    className="w-full h-[520px] object-cover"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                  {/* Quote Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-rose-100">
                    <Quote className="w-8 h-8 text-rose-600 mb-3 opacity-70" />
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                      “Age is a work of art, so take care of it!”
                    </h4>
                  </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-purple-300/40 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-rose-300/40 rounded-full blur-2xl -z-10"></div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-gray-500 tracking-[0.2em] uppercase text-sm mb-2 block">
                Ageing Gracefully
              </span>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Caring is a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                  way of life...
                </span>
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Ageing is a process of self discovery... we merely help you!
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Morbi tempor sit amet enim sit amet dictum. Curabitur vehicula
                quam elit, in congue turpis vehicula non. In tempor lorem magna,
                sit amet scelerisque nisi vehicula a. Ut quis aliquam neque.
                Pellentesque bibendum pretium felis, et placerat tortor.
              </p>

              <div className="h-px bg-gradient-to-r from-rose-200 to-transparent mb-8"></div>

              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Youth is a gift of nature...",
                  "But Age is a work of art!",
                  "I am not old - I have been young",
                  "Wisdom comes with winters",
                  "Wear your years with pride",
                  "Every year is a victory",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Choose The Best Section (New) */}
      <section className="py-24  relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text & Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-rose-600" />
                  </div>
                  <span className="text-rose-600 font-bold tracking-wide uppercase text-sm">
                    Better Guidance
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  Choose The Best & Make The Child{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                    Smart
                  </span>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Ante metus dictum at tempor commodo ullamcorper a. Neque
                  ornare aenean euismod elementum nisi quis. Ac turpis egestas
                  sed tempus urna et pharetra.
                </p>

                <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Creative Works
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Column: 4-Grid Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {/* Card 1: Interactive Class (Teal) */}
              <div className="bg-[#0f4c5c] p-6 rounded-tl-[4rem] rounded-tr-3xl rounded-bl-3xl rounded-br-3xl flex flex-col items-center text-center text-white aspect-square justify-center relative group overflow-hidden">
                <div className="relative z-10">
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white/20 mx-auto bg-white/10">
                    <img
                      src="https://i.ibb.co.com/1tMxqSwX/image.png"
                      alt="Class"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Interactive Class</h3>
                </div>
                <div className="absolute top-4 right-4 opacity-20">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>

              {/* Card 2: Our Facilities (Pink) */}
              <div className="bg-[#e91e63] p-6 rounded-tr-[4rem] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl flex flex-col items-center text-center text-white aspect-square justify-center relative group overflow-hidden">
                <div className="relative z-10">
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white/20 mx-auto bg-white/10">
                    <img
                      src="https://i.ibb.co.com/SwmXL8Jq/image.png"
                      alt="Facilities"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Our Facilities</h3>
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                  <Palette className="w-8 h-8" />
                </div>
              </div>

              {/* Card 3: Playing Garden (Pink) */}
              <div className="bg-[#e91e63] p-6 rounded-bl-[4rem] rounded-tr-3xl rounded-tl-3xl rounded-br-3xl flex flex-col items-center text-center text-white aspect-square justify-center relative group overflow-hidden">
                <div className="relative z-10">
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white/20 mx-auto bg-white/10">
                    <img
                      src="https://i.ibb.co.com/nsWpSy0w/image.png"
                      alt="Garden"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Playing Garden</h3>
                </div>
                <div className="absolute top-4 left-4 opacity-20">
                  <Sprout className="w-8 h-8" />
                </div>
              </div>

              {/* Card 4: Brain Activities (Teal) */}
              <div className="bg-[#0f4c5c] p-6 rounded-br-[4rem] rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl flex flex-col items-center text-center text-white aspect-square justify-center relative group overflow-hidden">
                <div className="relative z-10">
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white/20 mx-auto bg-white/10">
                    <img
                      src="https://i.ibb.co.com/23HWQr4H/image.png"
                      alt="Brain"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Brain Activities</h3>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20">
                  <Brain className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24  relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] bg-purple-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-rose-600 font-bold tracking-widest uppercase text-sm mb-3"
            >
              FAQs
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900"
            >
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                Questions
              </span>
            </motion.h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, i) => {
              const open = activeFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left p-6"
                  >
                    <span className="text-gray-900 font-bold text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-6 -mt-2 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllFile;
