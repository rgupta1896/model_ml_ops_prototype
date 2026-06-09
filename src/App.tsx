import { FormEvent, useEffect, useRef, useState } from "react";
import { ResponseCard } from "./components/ResponseCard";
import { RoleChips } from "./components/RoleChips";
import { Sidebar } from "./components/Sidebar";
import { SuggestedPromptPill } from "./components/SuggestedPromptPill";
import { TypingIndicator } from "./components/TypingIndicator";
import { DailyBriefPage } from "./components/workspace/DailyBriefPage";
import { KnowledgeHubPage } from "./components/workspace/KnowledgeHubPage";
import { getResponseForInput, promptsByRole, roles } from "./data";
import type { Message, PromptDefinition, Role, WorkspaceTab } from "./types";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  if (hour < 18) {
    return "Good afternoon";
  }
  return "Good evening";
}

function formatToday() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceTab>("Agent");
  const [activeRole, setActiveRole] = useState<Role>("Sales");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingTimeoutId, setPendingTimeoutId] = useState<number | null>(null);
  const chatViewportRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = promptsByRole[activeRole];
  const hasConversation = messages.length > 0 || isTyping;
  const activeAgentLabel = `${activeRole} Agent`;
  const formattedDate = formatToday();

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

  function queueResponse(question: string, role: Role, showSources = false) {
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
          attachments: response.attachments,
          lastUpdated: response.lastUpdated,
          showSources,
        },
      ]);
      setIsTyping(false);
      setPendingTimeoutId(null);
    }, delay);

    setPendingTimeoutId(timeoutId);
  }

  function handlePromptClick(prompt: PromptDefinition) {
    queueResponse(prompt.query, prompt.role, true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    queueResponse(inputValue, activeRole, false);
  }

  return (
    <div className="flex min-h-screen bg-cream text-ink">
      <Sidebar activeItem={activeWorkspace} onSelect={setActiveWorkspace} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-[#ddd6ca] bg-[#ebe4d8] px-8 py-4 lg:px-10">
          <div className="flex items-center justify-between gap-6">
            {activeWorkspace === "Daily Brief" || activeWorkspace === "The Hub" ? (
              <div />
            ) : (
              <RoleChips
                activeRole={activeRole}
                roles={roles}
                onSelect={activeWorkspace === "Agent" ? resetConversation : setActiveRole}
              />
            )}
            <p className="hidden text-sm text-muted sm:block">{formattedDate}</p>
          </div>
        </header>

        <main className="flex flex-1 flex-col px-8 py-10 lg:px-10">
          {activeWorkspace === "The Hub" ? (
            <KnowledgeHubPage />
          ) : activeWorkspace === "Daily Brief" ? (
            <DailyBriefPage scope="For You" />
          ) : !hasConversation ? (
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center pt-[10vh] sm:pt-[12vh]">
              <h1 className="text-center font-serif text-[2.6rem] font-normal leading-tight tracking-[-0.03em] text-ink md:text-[3.2rem]">
                {getGreeting()}, Raghav
              </h1>
              <p className="mt-5 max-w-2xl text-center text-[15px] leading-7 text-muted">
                Ops Agent connects internal sources into role-aware context. Select a role to see the questions that matter for that team, or ask directly.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 w-full">
                <div className="rounded-[28px] border border-[#ddd8cf] bg-white p-4 shadow-[0_8px_30px_rgba(34,31,29,0.06)]">
                  <label>
                    <span className="sr-only">Ask {activeAgentLabel} a question</span>
                    <textarea
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      rows={3}
                      placeholder="Ask about product updates, client workflows, onboarding, or field feedback…"
                      className="min-h-[88px] w-full resize-none rounded-[18px] border border-transparent bg-transparent px-3 py-2 text-[15px] leading-7 text-ink outline-none placeholder:text-faint"
                    />
                  </label>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e8e4dc] text-lg text-faint"
                      aria-label="Add attachment"
                    >
                      +
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-faint">{activeAgentLabel}</span>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-faint"
                        aria-label="Voice input"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path strokeLinecap="round" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
                          <path strokeLinecap="round" d="M8 11.5a4 4 0 0 0 8 0M12 15.5V19" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-lg text-mist transition hover:bg-navyLight disabled:cursor-not-allowed disabled:bg-[#c8c3bc]"
                        disabled={!inputValue.trim() || isTyping}
                        aria-label="Send message"
                      >
                        ↑
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-6 flex min-h-28 w-full flex-wrap content-start justify-center gap-3">
                {suggestedPrompts.map((prompt) => (
                  <SuggestedPromptPill
                    key={prompt.text}
                    prompt={prompt}
                    onClick={handlePromptClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
              <div
                ref={chatViewportRef}
                className="flex-1 space-y-8 overflow-y-auto pb-8"
              >
                {messages.map((message) =>
                  message.type === "user" ? (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[85%] rounded-[22px] rounded-br-md bg-[#e8e4dc] px-5 py-3.5 text-[15px] leading-7 text-ink">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-start">
                      <ResponseCard
                        content={message.content}
                        attachments={message.attachments}
                        lastUpdated={message.lastUpdated}
                        showSources={message.showSources}
                      />
                    </div>
                  ),
                )}

                {isTyping ? <TypingIndicator agentLabel={activeAgentLabel} /> : null}
              </div>

              <form onSubmit={handleSubmit} className="sticky bottom-0 border-t border-[#e5dfd4] bg-cream/95 pb-2 pt-4 backdrop-blur-sm">
                <div className="rounded-[24px] border border-[#ddd8cf] bg-white p-3 shadow-[0_4px_20px_rgba(34,31,29,0.05)]">
                  <div className="flex items-end gap-3">
                    <label className="flex-1">
                      <span className="sr-only">Ask {activeAgentLabel} a question</span>
                      <textarea
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        rows={2}
                        placeholder="Ask a follow-up…"
                        className="min-h-[56px] w-full resize-none rounded-[16px] border border-transparent bg-transparent px-3 py-2 text-[15px] leading-6 text-ink outline-none placeholder:text-faint"
                      />
                    </label>
                    <button
                      type="submit"
                      className="mb-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy text-lg text-mist transition hover:bg-navyLight disabled:cursor-not-allowed disabled:bg-[#c8c3bc]"
                      disabled={!inputValue.trim() || isTyping}
                      aria-label="Send message"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
