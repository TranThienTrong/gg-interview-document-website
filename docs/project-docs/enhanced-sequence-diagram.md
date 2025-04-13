---
sidebar_position: 4
---

# Enhanced System Sequence Diagrams

## Complete User Flow with LLMs and Media Integration

```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web Application (Port 3500)
    participant GeminiWS as Gemini WebSocket
    participant GeminiAI as Gemini AI Models
    participant ProblemService as Problem Service (Port 3000)
    participant AIAgent as AI Agent Service (Port 8000)
    participant OLLM as OpenAI/Anthropic LLM
    
    %% Initial setup and problem selection
    User->>WebApp: Access interview platform
    WebApp->>User: Display UI with problem selection
    User->>WebApp: Select problem
    WebApp->>ProblemService: Request problem details
    ProblemService-->>WebApp: Return problem data
    
    %% Solution fetching flow
    WebApp->>AIAgent: Request solution generation
    AIAgent->>OLLM: Pass problem to LLM with structured prompt
    Note over OLLM: Generate multiple solution approaches
    OLLM-->>AIAgent: Return structured solutions
    AIAgent-->>WebApp: Return formatted solutions
    Note over WebApp: Store solutions locally
    
    %% Real-time interview setup
    User->>WebApp: Start interview session
    WebApp->>User: Request screen/camera access
    User-->>WebApp: Grant media permissions
    
    %% WebSocket connection
    WebApp->>GeminiWS: Establish WebSocket connection
    GeminiWS->>GeminiAI: Send initial setup prompt
    Note over GeminiAI: Configure as coding interviewer
    
    %% Problem context sharing
    WebApp->>GeminiWS: Send problem context
    GeminiWS->>GeminiAI: Pass problem details
    GeminiAI-->>GeminiWS: Send greeting and initial guidance
    GeminiWS-->>WebApp: Return text response
    WebApp-->>User: Display interviewer message
    
    %% Screen sharing loop
    loop Every second
        WebApp->>WebApp: Capture screen/camera frame
        WebApp->>GeminiWS: Send base64 encoded image
        GeminiWS->>GeminiAI: Pass image data
    end
    
    %% Audio communication loop
    loop Real-time audio
        User->>WebApp: Speak (audio input)
        WebApp->>WebApp: Process audio with AudioWorklet
        WebApp->>GeminiWS: Send PCM audio chunks
        GeminiWS->>GeminiAI: Pass audio data
        
        opt Transcription (periodic)
            WebApp->>GeminiAI: Send audio for transcription
            GeminiAI-->>WebApp: Return transcribed text
            WebApp-->>User: Display transcription
        end
        
        GeminiAI-->>GeminiWS: Generate response (text)
        GeminiWS-->>WebApp: Return text response
        WebApp-->>User: Display response
        
        GeminiAI-->>GeminiWS: Generate audio response
        GeminiWS-->>WebApp: Return audio data
        WebApp-->>User: Play audio response
    end
    
    %% Solution discussion
    User->>WebApp: Request solution hint
    Note over WebApp: Access stored solutions
    WebApp->>GeminiWS: Send "solution available" context
    GeminiWS->>GeminiAI: Update with solution awareness
    GeminiAI-->>GeminiWS: Generate hint based on solutions
    GeminiWS-->>WebApp: Return hint text
    WebApp-->>User: Display hint
    
    %% Session end
    User->>WebApp: End interview session
    WebApp->>GeminiWS: Close WebSocket connection
    WebApp->>WebApp: Release media resources
```

## Problem and Solution Flow Details

```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web Application (Port 3500)
    participant ProblemService as Problem Service (Port 3000)
    participant AIAgent as AI Agent Service (Port 8000)
    participant OLLM as OpenAI/Anthropic LLM
    
    %% Problem selection
    User->>WebApp: Select problem
    WebApp->>ProblemService: GET /api/problems/:id
    ProblemService-->>WebApp: Return problem object
    WebApp-->>User: Display problem
    
    %% Solution generation (background)
    WebApp->>AIAgent: POST /api/leetcode-solutions
    Note over AIAgent: Create LeetCode Agent
    AIAgent->>OLLM: Send problem with structured prompt
    
    Note over OLLM: Process with language-specific guidance:<br/>1. Analyze problem<br/>2. Develop multiple approaches<br/>3. Generate structured output
    
    OLLM-->>AIAgent: Return function-calling JSON response
    Note over AIAgent: Parse and format solutions
    AIAgent-->>WebApp: Return solution object
    
    Note over WebApp: Store solutions locally<br/>Solutions structure:<br/>- Introduction<br/>- Multiple approaches<br/>- Time/space complexity<br/>- Code implementations<br/>- Edge cases
    
    %% Solution access (when requested)
    User->>WebApp: Ask for hint
    WebApp->>WebApp: Access stored solutions
    WebApp->>GeminiWS: "Solutions loaded" context message
    WebApp-->>User: Display hint based on stored solution
```

## LeetCode GraphQL Integration Flow

```mermaid
sequenceDiagram
    participant ProblemService as Problem Service (Port 3000)
    participant LeetCodeAPI as LeetCode GraphQL API
    participant Cache as Problem Cache
    
    %% Initial problem sync process
    Note over ProblemService: On service startup
    ProblemService->>LeetCodeAPI: POST GraphQL query to fetch problems
    Note over LeetCodeAPI: Endpoint: https://leetcode.com/graphql
    
    %% GraphQL query details
    Note over ProblemService,LeetCodeAPI: Query:<br/>{ problemsetQuestionList {<br/>  questions {<br/>    questionId<br/>    title<br/>    difficulty<br/>    topicTags { name }<br/>    content<br/>  }<br/>}}
    
    LeetCodeAPI-->>ProblemService: Return problems list JSON
    ProblemService->>Cache: Store problem metadata and content
    
    %% Detailed problem fetch
    loop For each problem
        ProblemService->>LeetCodeAPI: POST GraphQL query for problem details
        Note over ProblemService,LeetCodeAPI: Query:<br/>{ question(titleSlug: "$slug") {<br/>  questionId<br/>  title<br/>  content<br/>  difficulty<br/>  exampleTestcases<br/>  codeSnippets { langSlug, code }<br/>}}
        
        LeetCodeAPI-->>ProblemService: Return detailed problem data
        ProblemService->>Cache: Update problem with full details
    end
    
    %% Problem API endpoint
    Note over ProblemService: Expose REST API:<br/>/api/problems<br/>/api/problems/:id
    
    %% Periodic refresh process
    Note over ProblemService: Daily scheduled job
    ProblemService->>LeetCodeAPI: POST GraphQL query for updates
    LeetCodeAPI-->>ProblemService: Return updated problems
    ProblemService->>Cache: Update changed problems
```

## Real-time WebSocket and Media Communication

```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web Application
    participant AudioAPI as Web Audio API
    participant MediaAPI as MediaDevices API
    participant GeminiWS as Gemini WebSocket
    participant GeminiAI as Gemini AI
    
    User->>WebApp: Start interview session
    WebApp->>MediaAPI: getUserMedia() or getDisplayMedia()
    MediaAPI-->>WebApp: Return media stream
    
    WebApp->>GeminiWS: new WebSocket(GEMINI_WS_URL)
    GeminiWS->>GeminiAI: Initial setup message
    Note over GeminiAI: Configure as coding interviewer
    
    %% Setup audio processing
    WebApp->>AudioAPI: new AudioContext()
    WebApp->>AudioAPI: createAudioWorkletNode()
    Note over AudioAPI: Audio processor worklet<br/>- Capture audio<br/>- Calculate audio levels<br/>- Buffer PCM data
    
    par Audio Channel
        loop Audio Processing
            User->>WebApp: Speak (audio input)
            WebApp->>AudioAPI: Process audio input
            AudioAPI->>WebApp: Return PCM data chunks
            WebApp->>WebApp: Convert to Base64
            WebApp->>GeminiWS: Send audio data
            GeminiWS->>GeminiAI: Process audio input
            
            GeminiAI-->>GeminiWS: Generate audio response
            GeminiWS-->>WebApp: Return Base64 audio
            WebApp->>AudioAPI: Decode and queue audio
            AudioAPI-->>User: Play audio response
        end
    and Video Channel
        loop Every 1000ms
            WebApp->>MediaAPI: Capture video frame
            MediaAPI->>WebApp: Return frame
            WebApp->>WebApp: Convert to Base64
            WebApp->>GeminiWS: Send image data
            GeminiWS->>GeminiAI: Process visual input
        end
    and Transcription Channel
        loop Rate-limited (every 2s)
            WebApp->>GeminiAI: Send audio for transcription
            Note over GeminiAI: Using gemini-1.5-pro model
            GeminiAI-->>WebApp: Return transcribed text
            WebApp-->>User: Display transcription
        end
    end
    
    User->>WebApp: End session
    WebApp->>GeminiWS: Close connection
    WebApp->>AudioAPI: Close AudioContext
    WebApp->>MediaAPI: Stop all tracks
```
