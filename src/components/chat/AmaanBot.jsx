import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { personalData } from '../../data/personal';
import { educationData } from '../../data/education';
import { experienceData } from '../../data/experience';
import { patentData } from '../../data/patent';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';

// Custom lightweight markdown formatter for bold and link syntax
const formatMessageText = (text) => {
  if (!text) return '';
  let formatted = text;
  
  // Format bold text (**text**)
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Format links ([label](url))
  formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-cyan-400 underline hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Split lines and render with line breaks
  return formatted.split('\n').map((line, idx) => (
    <span key={idx} dangerouslySetInnerHTML={{ __html: line }} className="block min-h-[1em] leading-relaxed" />
  ));
};

export default function AmaanBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! I am **Amaan Bot**, an AI representation of Amaan Ansari. Ask me anything about my education, patent, internship, projects, skills, or how to contact me. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Local Rule-Based Keyword Matcher (100% Offline / No API Key Fallback)
  const getLocalResponse = (query) => {
    const q = query.toLowerCase().trim();

    if (q.includes('patent') || q.includes('cooling') || q.includes('peltier') || q.includes('invent') || q.includes('cooling system')) {
      return `I am a co-inventor of a published Indian Patent titled **"${patentData.title}"** (Application No: **${patentData.appNo}**, Published: **${patentData.pubDate}**). In a team of three, we designed an enhanced thermoelectric cooling system using Peltier modules, a custom optimized coolant, and an intelligent control architecture to maximize thermal efficiency.`;
    }

    if (q.includes('experience') || q.includes('intern') || q.includes('arctictern') || q.includes('work') || q.includes('job') || q.includes('role')) {
      const exp = experienceData[0];
      return `I worked as a **${exp.role}** (${exp.title}) at **${exp.company}** (Jan 2026 – May 2026). My responsibilities included managing dataset workflows and validating/annotating over **20,000 image frames** for machine learning models.`;
    }

    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa') || q.includes('marks') || q.includes('study') || q.includes('vtu') || q.includes('vdit') || q.includes('school')) {
      const vdit = educationData[0];
      const prism = educationData[1];
      return `I completed my **${vdit.degree}** from **${vdit.institution}** (Haliyal) with a CGPA of **${vdit.metricValue}** (2022 – 2026). Previously, I completed my PUC at **${prism.institution}** (Dharwad) scoring **${prism.metricValue}**.`;
    }

    if (q.includes('project') || q.includes('non-conductive') || q.includes('liquid') || q.includes('esp8266') || q.includes('device') || q.includes('thermal conductivity')) {
      const proj1 = projectsData[0];
      const proj2 = projectsData[1];
      return `I have developed several key hardware and IoT prototypes:\n\n1. **${proj1.title}**: An ESP8266-based IoT cooling prototype that uses Peltier modules and custom non-conductive liquid. It was selected for presentation at the COMEDKARE Innovation Hub.\n2. **${proj2.title}**: A cost-effective testing setup built to measure the thermal conductivity of materials using waterproof sensors.`;
    }

    if (q.includes('skill') || q.includes('python') || q.includes('c++') || q.includes('c ') || q.includes('embedded') || q.includes('hardware') || q.includes('iot')) {
      return `My skills cover several domains:\n\n- **Programming**: Python, C, C++, Embedded C (8051)\n- **AI & Data**: Computer Vision, ML Fundamentals, Data Annotation & Validation, Prompt Engineering\n- **Embedded & IoT**: ESP8266, Arduino, hardware testing\n- **Tools**: VS Code, Git, Arduino IDE, Keil µVision, MATLAB, Multisim\n\nYou can see details of these in the **Skills** section of my portfolio!`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('location') || q.includes('address')) {
      return `You can reach out to me directly:\n\n- **Email**: ${personalData.email}\n- **Phone**: +${personalData.phone}\n- **LinkedIn**: [linkedin.com/in/amaanansari31](https://www.linkedin.com/in/amaanansari31/)\n- **GitHub**: [github.com/amaanansari3108](https://github.com/amaanansari3108/)\n\nI am located in Haliyal, Karnataka, India.`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return `You can download my full resume by clicking the **"DOWNLOAD RESUME"** button in the Hero section, or directly through this link: [Download Resume PDF](/Amaan_Ansari_Resume.pdf).`;
    }

    if (q.includes('who are you') || q.includes('tell me about yourself') || q.includes('introduce') || q.includes('about you') || q.includes('name') || q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `I am **Amaan Ansari**, an Electronics & Communication Engineering graduate specializing in Computer Vision, IoT, and AI Data Operations. I co-invented a published Peltier-based cooling system patent and labeled 20,000+ frames as an AI data analyst intern. I created this chatbot to answer questions about my engineering career!`;
    }

    // Default friendly response
    return `That's a great question! Since I don't have a pre-coded answer for that specific query in my local offline database, I'd love to answer you directly. You can drop me an email at **${personalData.email}** or send a message in the **Get In Touch** form at the bottom of the page, and I'll get back to you!`;
  };

  // Asynchronous Email Dispatch (FormSubmit.co)
  const sendEmailNotification = async (question, answer) => {
    try {
      await fetch("https://formsubmit.co/ajax/amaanansari3108@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "New Question Asked on Amaan Bot!",
          Question: question,
          Response: answer,
          Timestamp: new Date().toLocaleString()
        })
      });
    } catch (err) {
      console.warn("Failed to send email notification to FormSubmit:", err);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userQuery = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInputValue('');
    setIsLoading(true);

    let botReply = '';

    // Check for Gemini API key configuration
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Compile system instructions containing portfolio data
        const systemPrompt = `You are Aman Bot, the AI representation of Amaan Ansari. You speak in the first person as Amaan ("I", "my", "me").
Be professional, enthusiastic, direct, and concise. Do NOT speak as an AI assistant. Never say "Based on the provided text" or "As an AI".
If asked about topics not directly related to you, answer them in your voice (as Amaan, e.g., "I'd write a Python script like..." or "As an engineering graduate, I think...").

Here is your profile data:
- Name: ${personalData.name}
- Role: ${personalData.role}
- About: ${personalData.about}
- Contact: Email: ${personalData.email}, Phone: ${personalData.phone}, Location: ${personalData.location}
- Patent: Title: "${patentData.title}", Status: "${patentData.status}", App No: "${patentData.appNo}", Date: "${patentData.pubDate}". Details: ${patentData.details.join(' ')}
- Internship: Role: "${experienceData[0].role}" at ${experienceData[0].company} (${experienceData[0].duration}). Details: ${experienceData[0].highlights.join(' ')}
- Education: ${educationData.map(edu => `${edu.degree} from ${edu.institution} (${edu.duration}), CGPA/Metric: ${edu.metricValue}`).join('; ')}
- Projects: ${projectsData.map(proj => `Title: ${proj.title}, Tech: ${proj.tech.join(', ')}, Details: ${proj.highlights.join(' ')}`).join('; ')}
- Skills: ${skillsData.map(cat => `${cat.category}: ${cat.skills.map(s => s.name).join(', ')}`).join('; ')}
`;

        // Make direct HTTP REST request to Gemini 1.5 Flash
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Here is the user query: "${userQuery}". Answer directly in first person as Amaan.`
                  }
                ]
              }
            ],
            systemInstruction: {
              parts: [
                {
                  text: systemPrompt
                }
              ]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 350
            }
          })
        });

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const resData = await response.json();
        botReply = resData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } catch (err) {
        console.warn("Gemini API call failed, falling back to local database engine:", err);
        botReply = getLocalResponse(userQuery);
      }
    } else {
      // Offline/No-Key Fallback Engine (Immediate response)
      // Artificially delay slightly for a realistic chat feel
      await new Promise(resolve => setTimeout(resolve, 600));
      botReply = getLocalResponse(userQuery);
    }

    // Add bot response to history
    setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    setIsLoading(false);

    // Asynchronously send conversation notification to email
    sendEmailNotification(userQuery, botReply);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400/20 shadow-lg hover:shadow-cyan-500/30 transition-all cursor-pointer flex items-center justify-center btn-primary"
        style={{ width: '50px', height: '50px' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>

      {/* Chat Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-20 right-6 z-50 w-[360px] sm:w-[400px] h-[500px] sm:h-[580px] max-h-[80vh] max-w-[92vw] glass-card flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{ 
              boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full border border-white/20 bg-gray-900 overflow-hidden flex-shrink-0">
                  <img
                    src={personalData.avatar}
                    alt="Amaan Ansari"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-black animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Amaan Bot
                    <Sparkles size={12} className="text-cyan-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">AI REPRESENTATION</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message History Container */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-br-none font-medium'
                        : 'bg-white/[0.04] border border-white/5 text-gray-300 rounded-bl-none'
                    }`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-bl-none px-4 py-3.5 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] focus:bg-white/[0.06] border border-white/10 focus:border-cyan-500/50 text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors flex items-center justify-center cursor-pointer btn-primary"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
