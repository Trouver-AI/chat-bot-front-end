import React, { useState, useEffect, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import './ChatBot.css';

const ChatBot = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [themeColor, setThemeColor] = useState('#0fffc1');
  const messagesEndRef = useRef(null);

  const responses = {
    English: [
      "I'm an AI assistant designed to help with information about Africa.",
      "Open source AI can transform how we approach challenges in agriculture, healthcare, and more.",
      "Trouver AI is building solutions specifically for African contexts."
    ],
    French: [
      "Je suis un assistant IA conçu pour aider avec des informations sur l'Afrique.",
      "L'IA open source peut transformer notre approche des défis dans l'agriculture, la santé, etc.",
      "Trouver AI construit des solutions spécifiquement pour les contextes africains."
    ],
    Swahili: [
      "Mimi ni msaidizi wa AI iliyoundwa kusaidia na habari kuhusu Afrika.",
      "AI ya chanzo wazi inaweza kubadilisha jinsi tunavyokabiliana na chango katika kilimo, afya, na zaidi.",
      "Trouver AI inajenga suluhisho maalum kwa miktadha ya Kiafrika."
    ],
    Zulu: [
      "Ngingumsizi we-AI oklanyelwe ukusiza ngolwazi mayelana ne-Afrika.",
      "I-AI evulekile ingashintsha indlela esibhekana ngayo nezinselele ezolimo, ezempilo, nokunye.",
      "I-Trouver AI yakha izixazululo ezikhethekile ezimweni zase-Afrika."
    ],
    Yoruba: [
      "Emi jẹ alabara AI ti a ṣe lati ranṣẹ pẹlu alaye nipa Afrika.",
      "AI ti oṣuwọn ṣiṣi le yi ọna ti a nṣe abẹwo awọn ijakadi ni ọgbẹ, ilera, ati diẹ sii.",
      "Trouver AI nkọ awọn ọna iwọn ti a pẹṣẹ fun awọn ipo Afrika."
    ],
    Shona: [
      "Ini ndiri AI assistant yakagadzirirwa kubatsira neruzivo nezve Africa.",
      "Open source AI inogona kushandura mabatirwo atinoita matambudziko mune zvekurima, hutano, nezvimwe.",
      "Trouver AI iri kuvaka mhinduro dzakanangana nemamiriro eAfrica."
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setMessages([{
      text: `You've selected ${language}. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const userMessage = {
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    setTimeout(() => {
      const randomResponse = responses[selectedLanguage][Math.floor(Math.random() * responses[selectedLanguage].length)];
      const botMessage = {
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const changeThemeColor = (color) => {
    setThemeColor(color);
    document.documentElement.style.setProperty('--neon-green', color);
  };

  if (!selectedLanguage) {
    return (
      <div className="language-selection">
        <div className="language-modal">
          <div className="logo">Trouver<span>AI</span></div>
          <h2>Welcome to Trouver AI Assistant</h2>
          <p>Please select your preferred language</p>
          <LanguageSelector onSelectLanguage={handleLanguageSelect} />
          <ThemeSelector onSelectColor={changeThemeColor} />
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="logo">Trouver<span>AI</span></div>
        <div className="chat-info">
          <span className="language-badge">{selectedLanguage}</span>
          <ThemeSelector onSelectColor={changeThemeColor} isSmall={true} />
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;