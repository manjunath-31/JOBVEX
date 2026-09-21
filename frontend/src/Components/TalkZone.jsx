import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Users, Radio, Sparkles, RefreshCw, MessageSquare, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

export default function TalkZone() {
  const [activeTopic, setActiveTopic] = useState("interview");
  const [isMatching, setIsMatching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [matchTimer, setMatchTimer] = useState(0);
  const [peerName, setPeerName] = useState("");

  const anonymousNames = [
    "Tech Enthusiast #402",
    "Fresher Engineer #118",
    "Data Analyst Candidate #903",
    "Java Developer #254",
    "Frontend Dev #781"
  ];

  useEffect(() => {
    let interval = null;
    if (isConnected) {
      interval = setInterval(() => {
        setMatchTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleStartMatch = () => {
    setMatchTimer(0);
    setIsMatching(true);
    toast.loading("Finding a peer in VoiceRoom...", { id: "matching" });

    setTimeout(() => {
      setIsMatching(false);
      setIsConnected(true);
      const randomPeer = anonymousNames[Math.floor(Math.random() * anonymousNames.length)];
      setPeerName(randomPeer);
      toast.success(`Connected with ${randomPeer}!`, { id: "matching" });
    }, 2500);
  };

  const handleLeaveRoom = () => {
    setIsConnected(false);
    toast.error("Disconnected from VoiceRoom");
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="talkzone-container">
      {/* Header Banner */}
      <div className="talkzone-header">
        <div className="vr-tag">
          <Radio size={18} className="pulse-icon" /> Live Voice Rooms
        </div>
        <h1>
          JOBVEX <span className="gradient-text">VoiceRoom (Talk Zone)</span>
        </h1>
        <p>
          Randomly connect with fellow jobseekers anonymously to practice technical interviews, improve English communication confidence, or chat freely — 100% Free, no signup required.
        </p>
      </div>

      {/* Main Room Controller */}
      <div className="talkzone-card">
        {!isConnected ? (
          <div className="matching-view">
            <h3>Select a Practice Category</h3>
            <div className="topic-selector">
              <button
                className={`topic-card ${activeTopic === "interview" ? "active" : ""}`}
                onClick={() => setActiveTopic("interview")}
              >
                <MessageSquare size={24} />
                <h4>Software Interview Prep</h4>
                <p>Practice Mock DSA, SQL, System Design & HR rounds</p>
                <span className="online-count">🟢 142 candidates active</span>
              </button>

              <button
                className={`topic-card ${activeTopic === "english" ? "active" : ""}`}
                onClick={() => setActiveTopic("english")}
              >
                <Volume2 size={24} />
                <h4>English Speaking Fluency</h4>
                <p>Build conversational confidence for HR & accent prep</p>
                <span className="online-count">🟢 280 candidates active</span>
              </button>

              <button
                className={`topic-card ${activeTopic === "casual" ? "active" : ""}`}
                onClick={() => setActiveTopic("casual")}
              >
                <Users size={24} />
                <h4>Fresher Salary & Off-Campus Talk</h4>
                <p>Discuss company reviews, referral leads & interview updates</p>
                <span className="online-count">🟢 95 candidates active</span>
              </button>
            </div>

            <div className="action-center">
              <button
                className="start-matching-btn"
                onClick={handleStartMatch}
                disabled={isMatching}
              >
                {isMatching ? (
                  <>
                    <RefreshCw size={18} className="spin-icon" /> Searching for available candidate...
                  </>
                ) : (
                  <>
                    <Mic size={20} /> Start Talking Now <Sparkles size={16} />
                  </>
                )}
              </button>
            </div>

            <div className="safety-disclaimer">
              <ShieldAlert size={15} color="#64748b" />
              <span>JOBVEX VoiceRooms are anonymous & moderated. Please adhere to community guidelines.</span>
            </div>
          </div>
        ) : (
          /* Active Call State */
          <div className="active-call-view">
            <div className="call-status-bar">
              <span className="live-indicator">🔴 LIVE ROOM</span>
              <span className="call-timer">Time Elapsed: {formatTimer(matchTimer)}</span>
            </div>

            <div className="call-avatars-row">
              <div className="user-avatar-box">
                <div className={`avatar-circle ${isMuted ? "muted" : "speaking"}`}>
                  <Mic size={32} />
                </div>
                <span className="avatar-label">You (Candidate)</span>
                <span className="mic-status">{isMuted ? "Muted" : "Microphone Active"}</span>
              </div>

              <div className="call-vs-divider">
                <div className="sound-wave">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>

              <div className="user-avatar-box">
                <div className="avatar-circle peer-speaking">
                  <Volume2 size={32} />
                </div>
                <span className="avatar-label">{peerName}</span>
                <span className="peer-badge">Verified Match</span>
              </div>
            </div>

            <div className="call-controls-row">
              <button
                className={`control-btn ${isMuted ? "muted-btn" : ""}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                <span>{isMuted ? "Unmute" : "Mute Mic"}</span>
              </button>

              <button className="control-btn next-peer-btn" onClick={handleStartMatch}>
                <RefreshCw size={18} />
                <span>Next Person</span>
              </button>

              <button className="control-btn end-call-btn" onClick={handleLeaveRoom}>
                <span>Leave Room</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
