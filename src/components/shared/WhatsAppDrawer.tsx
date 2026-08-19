import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Send,
  Mic,
  Check,
  CheckCheck,
  Image as ImageIcon,
  MapPin,
  Calendar,
  FileText,
  Sparkles } from
'lucide-react';
interface Lead {
  id: string;
  name: string;
  phone: string;
  stage: string;
  model: string;
  priceRange?: string;
  dealer: {
    name: string;
    code: string;
    city?: string;
  };
}
interface WhatsAppDrawerProps {
  lead: Lead;
  onClose: () => void;
}
type Msg = {
  id: string;
  from: 'lead' | 'agent' | 'system';
  text?: string;
  type?: 'text' | 'image' | 'doc' | 'location' | 'template';
  meta?: {
    title?: string;
    subtitle?: string;
    thumb?: string;
  };
  time: string;
  status?: 'sent' | 'delivered' | 'read';
};
function buildConversation(lead: Lead): Msg[] {
  const model = lead.model;
  const dealerCity = lead.dealer.city || 'your city';
  const dealerName = lead.dealer.name;
  const base: Msg[] = [
  {
    id: 'm0',
    from: 'system',
    text: `Lead initiated from Meta Click-to-WhatsApp ad — ${model} campaign`,
    time: 'Yesterday'
  },
  {
    id: 'm1',
    from: 'lead',
    text: `Hi, I saw your ad for ${model}. Can you share more details?`,
    time: '10:14 AM'
  },
  {
    id: 'm2',
    from: 'agent',
    text: `Hi ${lead.name.split(' ')[0]}! 👋 Welcome to ${dealerName}. I'm Spotlight AI — here to help you with your ${model} enquiry.`,
    time: '10:14 AM',
    status: 'read'
  },
  {
    id: 'm3',
    from: 'agent',
    type: 'doc',
    meta: {
      title: `${model} — Brochure 2026.pdf`,
      subtitle: '2.4 MB · PDF'
    },
    time: '10:14 AM',
    status: 'read'
  },
  {
    id: 'm4',
    from: 'agent',
    text: `Here's the full brochure. ${lead.priceRange ? `Store price in ${dealerCity} ranges between ${lead.priceRange}.` : `Would you like a custom quote with No Cost EMI?`}`,
    time: '10:14 AM',
    status: 'read'
  }];

  // Stage-specific tail
  if (lead.stage === 'Store Demo' || lead.stage === 'Demo Scheduled') {
    base.push(
      {
        id: 'm5',
        from: 'lead',
        text: `Yes, I'd like to book a live demo this weekend.`,
        time: '10:18 AM'
      },
      {
        id: 'm6',
        from: 'agent',
        text: `Great! Here are the available demo slots at ${dealerName}:`,
        time: '10:18 AM',
        status: 'read'
      },
      {
        id: 'm7',
        from: 'agent',
        type: 'template',
        meta: {
          title: 'Book a Store Demo',
          subtitle: `Sat 11:00 AM · Sun 10:30 AM · Sun 4:00 PM`
        },
        time: '10:18 AM',
        status: 'read'
      },
      {
        id: 'm8',
        from: 'lead',
        text: `Saturday 11 AM works. Please confirm.`,
        time: '10:21 AM'
      },
      {
        id: 'm9',
        from: 'agent',
        text: `Confirmed ✅ Store demo for ${model} on Saturday 11:00 AM. We'll send a reminder 1 hour before. Store address:`,
        time: '10:21 AM',
        status: 'read'
      },
      {
        id: 'm10',
        from: 'agent',
        type: 'location',
        meta: {
          title: dealerName,
          subtitle: `${dealerCity} · Open until 8 PM`
        },
        time: '10:21 AM',
        status: 'read'
      }
    );
  } else if (lead.stage === 'Quotation' || lead.stage === 'Price Enquiry') {
    base.push(
      {
        id: 'm5',
        from: 'lead',
        text: `What would be the best price with No Cost EMI? I'm looking at around ${lead.priceRange || '₹80,000 – ₹1,20,000'}.`,
        time: '10:22 AM'
      },
      {
        id: 'm6',
        from: 'agent',
        text: `Sharing your personalised quote with EMI options 👇`,
        time: '10:22 AM',
        status: 'read'
      },
      {
        id: 'm7',
        from: 'agent',
        type: 'doc',
        meta: {
          title: `${model} — Quote for ${lead.name}.pdf`,
          subtitle: 'Price + No Cost EMI calc · 1.1 MB'
        },
        time: '10:22 AM',
        status: 'read'
      },
      {
        id: 'm8',
        from: 'lead',
        text: `Looks good. Can someone call me to finalise?`,
        time: '10:25 AM'
      },
      {
        id: 'm9',
        from: 'agent',
        text: `Absolutely — our store advisor Priya will call you within 30 minutes. Thanks for your interest in ${model}! 🛍️`,
        time: '10:25 AM',
        status: 'delivered'
      }
    );
  } else if (lead.stage === 'Invoice') {
    base.push(
      {
        id: 'm5',
        from: 'lead',
        text: `I'm ready to book. What's the next step?`,
        time: '10:30 AM'
      },
      {
        id: 'm6',
        from: 'agent',
        text: `Wonderful! 🎉 To proceed, I'll need a token amount of ₹5,000 (fully refundable). I can send a secure payment link.`,
        time: '10:30 AM',
        status: 'read'
      },
      {
        id: 'm7',
        from: 'agent',
        type: 'template',
        meta: {
          title: 'Secure Payment Link',
          subtitle: '₹5,000 · Token amount · Refundable'
        },
        time: '10:30 AM',
        status: 'read'
      },
      {
        id: 'm8',
        from: 'lead',
        text: `Paid. Please share the invoice and delivery timeline.`,
        time: '10:42 AM'
      },
      {
        id: 'm9',
        from: 'agent',
        text: `Payment received ✅ Sharing booking invoice now. Expected delivery: 2–4 days.`,
        time: '10:42 AM',
        status: 'delivered'
      }
    );
  } else {
    base.push(
      {
        id: 'm5',
        from: 'lead',
        text: `Can I visit the store this weekend?`,
        time: '10:30 AM'
      },
      {
        id: 'm6',
        from: 'agent',
        text: `Of course! ${dealerName} is open Sat & Sun, 10 AM – 8 PM. Want me to schedule a sales advisor for you?`,
        time: '10:30 AM',
        status: 'read'
      },
      {
        id: 'm7',
        from: 'lead',
        text: `Yes please, Saturday afternoon.`,
        time: '10:35 AM'
      },
      {
        id: 'm8',
        from: 'agent',
        text: `Done. Priya from our team will be ready for you at 3 PM Saturday. See you soon! 👋`,
        time: '10:35 AM',
        status: 'delivered'
      }
    );
  }
  return base;
}
export function WhatsAppDrawer({ lead, onClose }: WhatsAppDrawerProps) {
  const initial = buildConversation(lead);
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = {
      id: `u${Date.now()}`,
      from: 'agent',
      text,
      time: new Date().toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      status: 'sent'
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    // Simulate lead response
    setTimeout(() => setIsTyping(true), 600);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
      ...prev,
      {
        id: `l${Date.now()}`,
        from: 'lead',
        text: `Thanks, I'll review and get back to you shortly.`,
        time: new Date().toLocaleTimeString('en-IN', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      }]
      );
    }, 2200);
  };
  const quickReplies = [
  {
    label: 'Send brochure',
    icon: FileText
  },
  {
    label: 'Book a demo',
    icon: Calendar
  },
  {
    label: 'Share location',
    icon: MapPin
  },
  {
    label: 'Send EMI calc',
    icon: Sparkles
  }];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-200"
        onClick={onClose} />
      

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] bg-[#0b141a] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-b border-black/20">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 -ml-1">
            
            <X size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-semibold text-sm">
            {lead.name.
            split(' ').
            map((n) => n[0]).
            join('').
            toUpperCase().
            slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-white text-[15px] truncate">
              {lead.name}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              online · {lead.phone}
            </div>
          </div>
          <button className="text-white/70 hover:text-white p-2">
            <Video size={18} />
          </button>
          <button className="text-white/70 hover:text-white p-2">
            <Phone size={18} />
          </button>
          <button className="text-white/70 hover:text-white p-2">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Context strip */}
        <div className="px-4 py-2 bg-[#1f2c33] border-b border-black/30 flex items-center gap-2">
          <Sparkles size={12} className="text-blue-400" />
          <span className="text-[11px] text-white/70">
            Interested in{' '}
            <span className="text-white font-medium">{lead.model}</span>
            {lead.priceRange && <> · Budget {lead.priceRange}</>}
            {' · '}
            <span className="text-white/50">{lead.dealer.name}</span>
          </span>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
          style={{
            backgroundColor: '#0b141a',
            backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E\")"
          }}>
          
          {messages.map((m) => {
            if (m.from === 'system') {
              return (
                <div key={m.id} className="flex justify-center my-2">
                  <div className="bg-[#182229] text-[11px] text-white/60 px-3 py-1 rounded-md">
                    {m.text}
                  </div>
                </div>);

            }
            const isAgent = m.from === 'agent';
            return (
              <div
                key={m.id}
                className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
                
                <div
                  className={`max-w-[78%] rounded-lg px-2.5 pt-1.5 pb-1 shadow-sm ${isAgent ? 'bg-[#005c4b]' : 'bg-[#202c33]'}`}>
                  
                  {m.type === 'doc' &&
                  <div className="bg-black/20 rounded-md p-2 flex items-center gap-2 mb-1 min-w-[220px]">
                      <div className="w-9 h-10 rounded bg-red-500/20 flex items-center justify-center">
                        <FileText size={18} className="text-red-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] text-white truncate">
                          {m.meta?.title}
                        </div>
                        <div className="text-[11px] text-white/50">
                          {m.meta?.subtitle}
                        </div>
                      </div>
                    </div>
                  }
                  {m.type === 'template' &&
                  <div className="bg-black/20 rounded-md p-2.5 mb-1 min-w-[220px]">
                      <div className="text-[13px] text-white font-medium mb-0.5">
                        {m.meta?.title}
                      </div>
                      <div className="text-[11px] text-white/60">
                        {m.meta?.subtitle}
                      </div>
                    </div>
                  }
                  {m.type === 'location' &&
                  <div className="bg-black/20 rounded-md overflow-hidden mb-1 min-w-[220px]">
                      <div className="h-20 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30 flex items-center justify-center">
                        <MapPin size={28} className="text-emerald-400" />
                      </div>
                      <div className="p-2">
                        <div className="text-[13px] text-white font-medium">
                          {m.meta?.title}
                        </div>
                        <div className="text-[11px] text-white/60">
                          {m.meta?.subtitle}
                        </div>
                      </div>
                    </div>
                  }
                  {m.text &&
                  <div className="text-[14px] text-white leading-snug whitespace-pre-wrap break-words">
                      {m.text}
                    </div>
                  }
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="text-[10px] text-white/50">{m.time}</span>
                    {isAgent && m.status &&
                    <span className="text-white/60">
                        {m.status === 'read' ?
                      <CheckCheck size={13} className="text-sky-400" /> :
                      m.status === 'delivered' ?
                      <CheckCheck size={13} /> :

                      <Check size={13} />
                      }
                      </span>
                    }
                  </div>
                </div>
              </div>);

          })}

          {isTyping &&
          <div className="flex justify-start">
              <div className="bg-[#202c33] rounded-lg px-3 py-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
                <span
                className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                style={{
                  animationDelay: '0.15s'
                }} />
              
                <span
                className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce"
                style={{
                  animationDelay: '0.3s'
                }} />
              
              </div>
            </div>
          }
        </div>

        {/* Quick replies */}
        <div className="px-3 py-2 bg-[#0b141a] border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-hide">
          {quickReplies.map((qr) => {
            const Icon = qr.icon;
            return (
              <button
                key={qr.label}
                onClick={() => sendMessage(qr.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#202c33] hover:bg-[#2a3942] text-white/80 text-xs whitespace-nowrap transition-colors">
                
                <Icon size={12} className="text-emerald-400" />
                {qr.label}
              </button>);

          })}
        </div>

        {/* Composer */}
        <div className="bg-[#202c33] px-3 py-2.5 flex items-center gap-2">
          <button className="text-white/60 hover:text-white p-1.5">
            <Smile size={22} />
          </button>
          <button className="text-white/60 hover:text-white p-1.5">
            <Paperclip size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage(input);
            }}
            placeholder="Type a message"
            className="flex-1 bg-[#2a3942] text-white text-sm rounded-lg px-3 py-2 outline-none placeholder:text-white/40" />
          
          {input.trim() ?
          <button
            onClick={() => sendMessage(input)}
            className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors">
            
              <Send size={16} />
            </button> :

          <button className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors">
              <Mic size={18} />
            </button>
          }
        </div>
      </div>
    </>);

}