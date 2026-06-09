import { FormEvent, useEffect, useRef, useState } from "react";
import { PromptCard } from "./components/PromptCard";
import { ResponseCard } from "./components/ResponseCard";
import { RoleChips } from "./components/RoleChips";
import { Sidebar } from "./components/Sidebar";
import { TypingIndicator } from "./components/TypingIndicator";
import { getResponseForInput, promptsByRole, roles } from "./data";
import type { Message, PromptDefinition, Role } from "./types";

const headerItems = ["Agent", "Knowledge Hub", "Updates", "Saved Briefs"];

function App() {
  const [activeRole, setActiveRole] = useState<Role>("Sales");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingTimeoutId, setPendingTimeoutId] = useState<number | null>(null);
  const chatViewportRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = promptsByRole[activeRole];

  useEffect(() => {
    return () => {
      if (pendingTimeoutId) {
        window.clearTimeout(pendingTimeoutId);
      }
    };
  }, [pendingTimeoutId]);

  useEffect(() => {
    chatViewportRef.current?.scrollTo({
      top: chatViewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function resetConversation(nextRole: Role) {
    if (pendingTimeoutId) {
      window.clearTimeout(pendingTimeoutId);
      setPendingTimeoutId(null);
    }

    setActiveRole(nextRole);
    setMessages([]);
    setIsTyping(false);
    setInputValue("");
  }

  function queueResponse(question: string, role: Role) {
    if (pendingTimeoutId) {
      window.clearTimeout(pendingTimeoutId);
      setPendingTimeoutId(null);
    }

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    const response = getResponseForInput(trimmedQuestion);

    setActiveRole(role);
    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        type: "user",
        content: trimmedQuestion,
      },
    ]);
    setIsTyping(true);
    setInputValue("");

    const delay = 700 + Math.floor(Math.random() * 501);
    const timeoutId = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          content: response.answer,
          sources: response.sources,
          lastUpdated: response.lastUpdated,
        },
      ]);
      setIsTyping(false);
      setPendingTimeoutId(null);
    }, delay);

    setPendingTimeoutId(timeoutId);
  }

  function handlePromptClick(prompt: PromptDefinition) {
    queueResponse(prompt.text, prompt.role);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    queueResponse(inputValue, activeRole);
  }

  return (
    <div className="min-h-screen bg-[rgb(245,245,244)] text-ink">
      <div className="h-7 bg-black" />

      <header className="border-b border-sand bg-[rgba(245,245,244,0.84)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between px-8 py-4 lg:px-10">
          <div className="font-sans text-[1.9rem] font-medium leading-none tracking-[-0.03em] text-ink">
            Model ML
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-8 text-[15px] text-muted">
              {headerItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="transition hover:text-ink"
                >
                  {item}
                </button>
              ))}
            </nav>
            <button
              type="button"
              className="rounded-full bg-accentStrong px-6 py-3 text-sm font-medium text-mist"
            >
              Internal preview
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1680px] px-8 py-12 lg:px-10 lg:py-16">
        <div className="border-t border-sand pt-10">
          <div className="grid gap-10 xl:grid-cols-[180px_minmax(0,1fr)]">
            <div className="xl:pt-6">
              <Sidebar activeItem="Agent" />
            </div>

            <main className="grid gap-10 xl:grid-cols-[minmax(370px,470px)_minmax(0,1fr)] xl:items-start">
              <section className="xl:sticky xl:top-10">
                <div className="max-w-[470px]">
                  <h2 className="font-serif text-[3rem] font-normal leading-[1.04] tracking-[-0.025em] text-ink md:text-[3.7rem] xl:text-[4rem]">
                    Good morning Raghav, what can I help you with?
                  </h2>
                  <div className="mt-8">
                    <RoleChips
                      activeRole={activeRole}
                      roles={roles}
                      onSelect={resetConversation}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-[34px] border border-[#d8dde6] bg-[linear-gradient(180deg,rgba(219,226,238,0.88)_0%,rgba(231,236,243,0.92)_100%)] p-4 shadow-[0_28px_60px_rgba(34,31,29,0.08)] lg:p-6">
                <div className="overflow-hidden rounded-[28px] border border-white/45 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_30%),linear-gradient(180deg,rgba(244,248,252,0.86)_0%,rgba(235,240,246,0.84)_100%)] p-5 backdrop-blur-sm lg:p-6">
                  <div className="rounded-[26px] border border-white/55 bg-[rgba(255,255,255,0.34)] p-4 backdrop-blur-md lg:p-5">
                    <div
                      ref={chatViewportRef}
                      className="min-h-[280px] space-y-5 overflow-y-auto lg:min-h-[320px]"
                    >
                      {messages.length === 0 && !isTyping ? (
                        <div className="flex min-h-[220px] items-center justify-center px-6 text-center">
                          <p className="max-w-md text-base leading-7 text-faint">
                            Select a prompt or ask a question to start.
                          </p>
                        </div>
                      ) : null}

                      {messages.map((message) =>
                        message.type === "user" ? (
                          <div key={message.id} className="flex justify-end">
                            <div className="max-w-2xl rounded-[18px] rounded-br-[8px] border border-white/45 bg-[rgba(255,255,255,0.48)] px-5 py-3.5 text-sm leading-7 text-ink">
                              {message.content}
                            </div>
                          </div>
                        ) : (
                          <div key={message.id} className="max-w-[760px]">
                            <ResponseCard
                              content={message.content}
                              sources={message.sources}
                              lastUpdated={message.lastUpdated}
                            />
                          </div>
                        ),
                      )}

                      {isTyping ? (
                        <div className="max-w-[420px]">
                          <TypingIndicator />
                        </div>
                      ) : null}
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6">
                      <div className="rounded-[30px] border border-[rgba(34,31,29,0.08)] bg-[rgba(255,255,255,0.56)] p-3 shadow-panel backdrop-blur-[18px]">
                        <div className="flex items-end gap-3">
                          <div className="mb-2 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/70 bg-white/38 text-lg text-faint">
                            +
                          </div>
                          <label className="flex-1">
                            <span className="sr-only">Ask Ops Agent a question</span>
                            <textarea
                              value={inputValue}
                              onChange={(event) => setInputValue(event.target.value)}
                              rows={3}
                              placeholder="Ask about product updates, client workflows, onboarding, or field feedback…"
                              className="min-h-[96px] w-full resize-none rounded-[22px] border border-transparent bg-transparent px-4 py-3 text-[14px] leading-6 text-ink outline-none transition placeholder:text-faint focus:border-white/65 focus:bg-white/18"
                            />
                          </label>
                          <button
                            type="submit"
                            className="mb-1 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-accentStrong text-lg text-mist transition hover:bg-[#1c1918] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentStrong/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#c8c3bc]"
                            disabled={!inputValue.trim() || isTyping}
                            aria-label="Send message"
                          >
                            ↑
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <section className="mt-6 border-t border-white/50 pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[11px] font-medium uppercase tracking-[0.3em] text-faint">
                        Suggested prompts
                      </h3>
                      <p className="text-sm text-muted">Personalized for {activeRole}</p>
                    </div>
                    <div className="grid gap-4 xl:grid-cols-3">
                      {suggestedPrompts.map((prompt) => (
                        <PromptCard
                          key={prompt.text}
                          prompt={prompt}
                          onClick={handlePromptClick}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
