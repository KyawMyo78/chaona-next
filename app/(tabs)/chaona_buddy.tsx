import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '@env';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'react-native';
import Markdown from 'react-native-markdown-display';

const ChaonaBuddyChat = () => {
  const router = useRouter();
  // System prompt to guide AI behavior and teach app features
  const SYSTEM_PROMPT = `
You are Chaona Buddy, a helpful AI assistant for the ChaonaNext app. Your users are sellers, buyers, farmers, and companies who use ChaonaNext for agriculture, marketplace, and business support.

Rules:
- Answer questions related to ChaonaNext, agriculture, marketplace, buying, selling, farming, company support, and general agricultural knowledge.
- You are a knowledgeable farming buddy who can provide agricultural advice, farming techniques, crop management, pest control, soil management, irrigation, harvesting, and more.
- If asked anything completely unrelated to agriculture or ChaonaNext, reply: "Sorry, I can only help with questions about ChaonaNext and agricultural topics."
- Always be polite, friendly, and supportive.
- If a user asks about your identity, reply: "I am your Chaona Buddy, here to help you with Chaona and all your farming needs."
- If a user asks for help, provide clear, detailed, step-by-step instructions.
- If a user is frustrated or confused, reassure them and offer to guide them through the process.
- Never provide medical, legal, or financial advice.
- Never answer questions about politics, religion, or personal matters.
- Never generate or discuss inappropriate, harmful, or offensive content.
- If you don't know the answer, say: "I'm not sure about that specific topic, but you can contact Chaona support for more help."
- Always reply in the same language as the user's question (Thai or English). If the user asks in Thai, reply in Thai. If the user asks in English, reply in English, if user wants you to reply in Thai reply in Thai.
- Always use correct grammar and a friendly, natural tone in your replies.
- Provide comprehensive agricultural knowledge including crop cultivation, soil preparation, fertilization, pest management, harvesting techniques, and more.

App Features and Navigation:
- Home Page: The main landing page of the app with general information and overview.
- Dashboard: A separate page where users can see quick stats, recent activity, and shortcuts to main features like 'Submit Waste'.
- Submit Waste Form: Users can submit details about agricultural waste for recycling or disposal. To submit, navigate to the Dashboard tab and tap 'Submit Waste', then fill out the form and press 'Submit'.
- Marketplace: Users can browse, buy, and sell agricultural products. Access the Marketplace tab to view products and make transactions.
- Profile: Users can view and edit their personal information and see their activity history.
- Help & Support: Users can get help with the app or contact Chaona support for assistance.
- Chaona Buddy: AI chat assistant (this current page) for help with app features and agricultural advice.

Important: The Dashboard is NOT the same as the Home page. These are separate sections of the app.

Example Q&A:
Q: How do I submit a waste form?
A: To submit a waste form, first navigate to the Dashboard tab (not the Home page), then tap 'Submit Waste', fill out the required details, and press 'Submit'.

Q: วิธีส่งฟอร์มขยะ?
A: เพื่อส่งฟอร์มขยะ ไปที่แท็บ Dashboard (ไม่ใช่หน้าแรก) แล้วกดปุ่ม 'ส่งขยะ' กรอกรายละเอียดที่ต้องการ และกด 'ส่ง'

Q: I'm on the home page, where do I go to submit waste?
A: You need to navigate from the Home page to the Dashboard tab. The Dashboard is where you'll find the 'Submit Waste' option. Look for the Dashboard tab in your navigation menu.

Q: ฉันอยู่ที่หน้าแรก จะไปส่งขยะที่ไหน?
A: คุณต้องไปจากหน้าแรกไปที่แท็บ Dashboard ที่ Dashboard คุณจะเจอปุ่ม 'ส่งขยะ' หาแท็บ Dashboard ในเมนูการนำทางของคุณ

Q: How do I buy products?
A: Tap the 'Marketplace' tab, browse available products, and follow the instructions to purchase.

Q: ฉันจะซื้อสินค้าได้อย่างไร?
A: กดที่แท็บ 'ตลาด' เลือกสินค้าที่ต้องการ แล้วทำตามขั้นตอนเพื่อซื้อสินค้า

Q: Who are you?
A: I am your Chaona Buddy, here to help you with Chaona and all your farming needs.

Q: คุณคือใคร?
A: ฉันคือ Chaona Buddy ผู้ช่วยของคุณในแอป Chaona และเรื่องการเกษตรทั้งหมด

Q: How can I grow rice farm?
A: To grow rice successfully: 1) Choose the right variety for your climate, 2) Prepare flooded fields with good drainage, 3) Plant seedlings in rows 15-20cm apart, 4) Maintain water depth of 5-10cm during growing season, 5) Apply fertilizer at planting and heading stage, 6) Control weeds and pests regularly, 7) Harvest when grains are golden and firm. Consider soil pH 5.5-6.5 for optimal growth.

Q: ฉันจะปลูกข้าวได้อย่างไร?
A: การปลูกข้าวที่ดี: 1) เลือกพันธุ์ที่เหมาะกับสภาพภูมิอากาศ 2) เตรียมนาน้ำท่วมที่มีระบบระบายน้ำดี 3) ปลูกกล้าเป็นแถวห่างกัน 15-20 ซม. 4) รักษาระดับน้ำ 5-10 ซม.ตลอดฤดูปลูก 5) ใส่ปุ์ยตอนปลูกและระยะแตกรวง 6) กำจัดวัชพืชและแมลงศัตรูพืช 7) เก็บเกี่ยวเมื่อเมื่อเป็นสีทองและแข็ง ควรมี pH ดิน 5.5-6.5

Q: What's the best fertilizer for tomatoes?
A: For tomatoes, use balanced NPK fertilizer (10-10-10) at planting, then switch to low-nitrogen, high-phosphorus and potassium (5-10-10) during fruiting. Apply organic compost, and consider calcium supplements to prevent blossom end rot. Side-dress every 2-3 weeks during growing season.

Q: ปุ์ยอะไรดีสำหรับมะเขือเทศ?
A: สำหรับมะเขือเทศ ใช้ปุ่ย NPK สมดุล (10-10-10) ตอนปลูก แล้วเปลี่ยนเป็นปุ่ยไนโตรเจนต่ำ ฟอสฟอรัสและโปแตสเซียมสูง (5-10-10) ในช่วงออกผล ใส่ปุ่ยหมักอินทรีย์ และพิจารณาแคลเซียมเสริมเพื่อป้องกันโรคยอดไหม้ ใส่ปุ่ยเสริมทุก 2-3 สัปดาห์ระหว่างฤดูปลูก

Q: Can you help me with something not related to agriculture or Chaona?
A: Sorry, I can only help with questions about ChaonaNext and agricultural topics.

Q: คุณช่วยเรื่องที่ไม่เกี่ยวกับ Chaona หรือการเกษตรได้ไหม?
A: ขอโทษค่ะ ฉันสามารถช่วยได้เฉพาะเรื่องที่เกี่ยวกับ ChaonaNext และหัวข้อการเกษตรเท่านั้น

Context:
ChaonaNext is a platform for connecting sellers, buyers, farmers, and companies in the agriculture industry. Users can buy and sell products, get support, and access marketplace features. Your job is to make their experience easier and more productive.
`;




  const [messages, setMessages] = useState([
    { sender: 'buddy', text: 'Hi! I\'m your **Chaona Buddy**. 🌱\n\nI\'m here to help you with:\n* ChaonaNext app features\n* Agricultural advice and farming tips\n* Crop management and pest control\n* Marketplace assistance\n\nHow can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingIntent, setPendingIntent] = useState<string | null>(null);
  const [pendingExplanation, setPendingExplanation] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    // Agent-like intent detection for all main app features with confirmation
    const lowerInput = input.toLowerCase();

    // If user confirms navigation, use Gemini to generate explanation before routing
    if (pendingIntent && (lowerInput === 'yes' || lowerInput === 'ok' || lowerInput === 'y')) {
      let featurePrompt = '';
      let route: "/dashboard" | "/marketplace" | "/profile" | "/submit-waste" | "/help" | "/" = "/";
      switch (pendingIntent) {
        case 'waste':
          route = "/submit-waste";
          featurePrompt = 'Explain to the user how to submit a waste form in ChaonaNext. Tell them which button to press on the dashboard, what info to fill, and how to complete the process.';
          break;
        case 'marketplace':
          route = "/marketplace";
          featurePrompt = 'Explain to the user how to use the Marketplace in ChaonaNext. Tell them how to browse, buy, or sell products.';
          break;
        case 'profile':
          route = "/profile";
          featurePrompt = 'Explain to the user how to view and edit their profile and activity history in ChaonaNext.';
          break;
        case 'dashboard':
          route = "/dashboard";
          featurePrompt = 'Explain to the user what they can do on the Dashboard in ChaonaNext, including viewing stats, recent activity, and shortcuts.';
          break;
        case 'help':
          route = "/help";
          featurePrompt = 'Explain to the user how to get help or contact support in ChaonaNext.';
          break;
      }
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [SYSTEM_PROMPT, featurePrompt],
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        let aiText = response.text || 'Navigating you to the requested page.';
        setMessages(msgs => [...msgs, { sender: 'buddy', text: aiText }]);
      } catch (err) {
        setMessages(msgs => [...msgs, { sender: 'buddy', text: 'Navigating you to the requested page.' }]);
      }
      setPendingIntent(null);
      setInput('');
      setLoading(false);
      router.push(route);
      return;
    }

    // Waste Submission
    if (
      lowerInput.includes('submit waste') ||
      lowerInput.includes('waste form') ||
      lowerInput.includes('recycle waste') ||
      lowerInput.includes('dispose waste')
    ) {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        // Build conversation history for context
        let conversationHistory = SYSTEM_PROMPT + "\n\nConversation History:\n";
        const previousMessages = messages.slice(1); // Skip the initial greeting
        previousMessages.forEach((msg, index) => {
          if (msg.sender === 'user') {
            conversationHistory += `User: ${msg.text}\n`;
          } else {
            conversationHistory += `Chaona Buddy: ${msg.text}\n`;
          }
        });
        conversationHistory += `User: ${input}\nChaona Buddy:`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [conversationHistory],
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        let aiText = response.text || '';
        aiText += '\n\nI can help you submit a waste form. Would you like to go to the waste submission page now? (yes/no)';
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: aiText
          }
        ]);
      } catch (err) {
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: "I can help you submit a waste form. Would you like to go to the waste submission page now? (yes/no)"
          }
        ]);
      }
      setPendingIntent('waste');
      setInput('');
      setLoading(false);
      return;
    }
    // Marketplace
    if (
      lowerInput.includes('marketplace') ||
      lowerInput.includes('buy product') ||
      lowerInput.includes('sell product') ||
      lowerInput.includes('browse products')
    ) {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        let conversationHistory = SYSTEM_PROMPT + "\n\nConversation History:\n";
        const previousMessages = messages.slice(1);
        previousMessages.forEach((msg, index) => {
          if (msg.sender === 'user') {
            conversationHistory += `User: ${msg.text}\n`;
          } else {
            conversationHistory += `Chaona Buddy: ${msg.text}\n`;
          }
        });
        conversationHistory += `User: ${input}\nChaona Buddy:`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [conversationHistory],
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        let aiText = response.text || '';
        aiText += '\n\nWould you like to go to the Marketplace now? (yes/no)';
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: aiText
          }
        ]);
      } catch (err) {
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: "Would you like to go to the Marketplace now? (yes/no)"
          }
        ]);
      }
      setPendingIntent('marketplace');
      setInput('');
      setLoading(false);
      return;
    }
    // Profile
    if (
      lowerInput.includes('profile') ||
      lowerInput.includes('edit profile') ||
      lowerInput.includes('view profile') ||
      lowerInput.includes('activity history')
    ) {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        let conversationHistory = SYSTEM_PROMPT + "\n\nConversation History:\n";
        const previousMessages = messages.slice(1);
        previousMessages.forEach((msg, index) => {
          if (msg.sender === 'user') {
            conversationHistory += `User: ${msg.text}\n`;
          } else {
            conversationHistory += `Chaona Buddy: ${msg.text}\n`;
          }
        });
        conversationHistory += `User: ${input}\nChaona Buddy:`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [conversationHistory],
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        let aiText = response.text || '';
        aiText += '\n\nWould you like to go to your Profile now? (yes/no)';
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: aiText
          }
        ]);
      } catch (err) {
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: "Would you like to go to your Profile now? (yes/no)"
          }
        ]);
      }
      setPendingIntent('profile');
      setInput('');
      setLoading(false);
      return;
    }
    // Dashboard
    if (
      lowerInput.includes('dashboard') ||
      lowerInput.includes('stats') ||
      lowerInput.includes('recent activity') ||
      lowerInput.includes('shortcuts')
    ) {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        let conversationHistory = SYSTEM_PROMPT + "\n\nConversation History:\n";
        const previousMessages = messages.slice(1);
        previousMessages.forEach((msg, index) => {
          if (msg.sender === 'user') {
            conversationHistory += `User: ${msg.text}\n`;
          } else {
            conversationHistory += `Chaona Buddy: ${msg.text}\n`;
          }
        });
        conversationHistory += `User: ${input}\nChaona Buddy:`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [conversationHistory],
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        let aiText = response.text || '';
        aiText += '\n\nWould you like to go to the Dashboard now? (yes/no)';
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: aiText
          }
        ]);
      } catch (err) {
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: "Would you like to go to the Dashboard now? (yes/no)"
          }
        ]);
      }
      setPendingIntent('dashboard');
      setInput('');
      setLoading(false);
      return;
    }
    // Help & Support
    if (
      lowerInput.includes('help') ||
      lowerInput.includes('support') ||
      lowerInput.includes('contact chaona') ||
      lowerInput.includes('get help')
    ) {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        let conversationHistory = SYSTEM_PROMPT + "\n\nConversation History:\n";
        const previousMessages = messages.slice(1);
        previousMessages.forEach((msg, index) => {
          if (msg.sender === 'user') {
            conversationHistory += `User: ${msg.text}\n`;
          } else {
            conversationHistory += `Chaona Buddy: ${msg.text}\n`;
          }
        });
        conversationHistory += `User: ${input}\nChaona Buddy:`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [conversationHistory],
          config: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
        let aiText = response.text || '';
        aiText += '\n\nWould you like to go to Help & Support now? (yes/no)';
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: aiText
          }
        ]);
      } catch (err) {
        setMessages(msgs => [
          ...msgs,
          {
            sender: 'buddy',
            text: "Would you like to go to Help & Support now? (yes/no)"
          }
        ]);
      }
      setPendingIntent('help');
      setInput('');
      setLoading(false);
      return;
    }
    setInput('');
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      
      // Build conversation history for context
      let conversationHistory = SYSTEM_PROMPT + "\n\nConversation History:\n";
      
      // Add previous messages for context (excluding the initial greeting)
      const previousMessages = messages.slice(1); // Skip the initial greeting
      previousMessages.forEach((msg, index) => {
        if (msg.sender === 'user') {
          conversationHistory += `User: ${msg.text}\n`;
        } else {
          conversationHistory += `Chaona Buddy: ${msg.text}\n`;
        }
      });
      
      // Add current user input
      conversationHistory += `User: ${input}\nChaona Buddy:`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [conversationHistory],
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });
      let aiText = response.text || 'Sorry, I could not get a response.';
      setMessages(msgs => [...msgs, { sender: 'buddy', text: aiText }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { sender: 'buddy', text: 'Error: Unable to connect to Gemini API.' }]);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.navbarButton}>
            <Image
              source={require('../../assets/images/chaona_buddy.jpeg')}
              style={styles.navbarMascotImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.headerText}>Chaona Buddy</Text>
        </View>
        <TouchableOpacity 
          style={{}} 
          onPress={() => router.back()}
        >
          <FontAwesome name="times" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.messages}
        contentContainerStyle={{ paddingBottom: 80 }}
        ref={scrollViewRef}
      >
        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.bubble, msg.sender === 'buddy' ? styles.buddyBubble : styles.userBubble]}>
            {msg.sender === 'buddy' ? (
              <Markdown style={markdownStyles}>{msg.text}</Markdown>
            ) : (
              <Text style={[styles.bubbleText, styles.userText]}>{msg.text}</Text>
            )}
          </View>
        ))}
        {loading && <Text style={styles.loading}>Chaona Buddy is typing...</Text>}
      </ScrollView>
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          editable={!loading}
          multiline
          blurOnSubmit={Platform.OS !== 'ios' && Platform.OS !== 'android'}
          onKeyPress={({ nativeEvent }) => {
            // On web/desktop, Enter sends message, Shift+Enter adds new line
            if ((Platform.OS === 'web' || Platform.OS === 'windows' || Platform.OS === 'macos') && nativeEvent.key === 'Enter') {
              // Try to detect Shift+Enter using window event (only works on web)
              // If Shift is pressed, add new line
              // Otherwise, send message
              // @ts-ignore
              if (window && window.event && window.event.shiftKey) {
                setInput(prev => prev + '\n');
              } else {
                sendMessage();
              }
            }
          }}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={loading}
        >
          <FontAwesome name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );



}

const styles = StyleSheet.create({
  navbarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 8,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarMascotImage: {
    width: 94,
    height: 94,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4', // match heroSection bg
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#15803d',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21,128,61,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  // Removed closeButton style for minimal icon-only button
  messages: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  buddyBubble: {
    backgroundColor: 'rgba(21,128,61,0.08)', // subtle green tint
    borderWidth: 1,
    borderColor: 'rgba(21,128,61,0.15)',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#15803d',
    alignSelf: 'flex-end',
  },
  bubbleText: {
    color: '#166534', // dark green for buddy
    fontSize: 16,
    fontWeight: '500',
  },
  userText: {
    color: '#fff', // white for user
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  loading: {
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    marginRight: 10,
    color: '#374151',
  },
  sendButton: {
    backgroundColor: '#15803d',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#15803d',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
});

// Markdown styles for AI responses
const markdownStyles = {
  body: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
  },
  paragraph: {
    marginBottom: 12,
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
  },
  strong: {
    fontWeight: 'bold' as const,
    color: '#1f2937',
  },
  list_item: {
    marginBottom: 8,
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
  },
  bullet_list: {
    marginBottom: 12,
  },
  ordered_list: {
    marginBottom: 12,
  },
  heading1: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 12,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: 10,
  },
  code_inline: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 14,
    color: '#1f2937',
  },
  fence: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
};

export default ChaonaBuddyChat;
